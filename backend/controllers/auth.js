import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import 'dotenv/config';
import axios from "axios";

export const handleSQLError = (error, res) => {
    console.error("Database query error:", error);
    return res.status(500).json({ message: "Internal server error" });
};

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

const fetchUserId = async (googleId) => {
    const userSql = "SELECT id FROM user WHERE google_id = ?";
    return new Promise((resolve, reject) => {
        db.query(userSql, [googleId], (userErr, userData) => {
            if (userErr) {
                reject(userErr);
            } else if (userData.length === 0) {
                resolve(null);
            } else {
                resolve(userData[0].id);
            }
        });
    });
};

const updateRefreshToken = (googleId, newRefreshToken) => {
    const sql = "UPDATE user SET refresh_token = ? WHERE google_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [newRefreshToken, googleId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const refreshAccessToken = async (googleId, res) => {
    if (isRefreshing) {
        return new Promise((resolve) => {
            addRefreshSubscriber((newToken) => {
                resolve(newToken);
            });
        });
    }

    isRefreshing = true;

    try {
        const sql = "SELECT refresh_token FROM user WHERE google_id = ?";
        const result = await new Promise((resolve, reject) => {
            db.query(sql, [googleId], (err, data) => {
                if (err) {
                    console.error("Error fetching refresh token:", err);
                    resolve(null);
                } else {
                    resolve(data.length > 0 ? data[0] : null);
                }
            });
        });

        if (!result || !result.refresh_token) {
            console.error("No refresh token found for user. Creating a new one...");

            const tokenUrl = 'https://oauth2.googleapis.com/token';
            const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
            const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

            const response = await axios.post(tokenUrl, {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: null, // This should trigger the creation of a new refresh token
                grant_type: 'authorization_code', // Use authorization_code grant type to get new refresh token
            });

            const { access_token, id_token, refresh_token } = response.data;

            // Update the user with the new refresh token
            await updateRefreshToken(googleId, refresh_token);

            const payload = jwt.decode(id_token);
            const secretKey = process.env.SECRET_KEY;
            const newToken = jwt.sign({ sub: payload.sub }, secretKey, { expiresIn: "1m" });

            res.cookie("access_token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
            });

            onRefreshed(newToken);
            isRefreshing = false;

            return newToken;
        }

        const refreshToken = result.refresh_token;

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

        const response = await axios.post(tokenUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        });

        const { access_token, id_token } = response.data;

        const payload = jwt.decode(id_token);
        const secretKey = process.env.SECRET_KEY;
        const newToken = jwt.sign({ sub: payload.sub }, secretKey, { expiresIn: "1m" });

        res.cookie("access_token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        });

        onRefreshed(newToken);
        isRefreshing = false;

        return newToken;

    } catch (error) {
        console.error("Error refreshing access token:", error);
        isRefreshing = false;
        return null;
    }
};

// Authentication middleware function
export const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    const userInfo = jwtDecode(token);
    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, async (err) => {
        if (err && err.name === 'TokenExpiredError') {
            console.log("Token expired, refreshing...");
            const refreshedToken = await refreshAccessToken(userInfo.sub, res);
            if (!refreshedToken) {
                return res.status(403).json("Token is not valid and refresh failed!");
            }
            console.log("Token Refreshed!");
            const newUserInfo = jwt.decode(refreshedToken);
            try {
                const userId = await fetchUserId(newUserInfo.sub);
                if (!userId) {
                    return res.status(404).json("User not found.");
                }
                req.userInfo = { ...newUserInfo, user_id: userId };
                next();
            } catch (fetchUserIdErr) {
                return handleSQLError(fetchUserIdErr, res);
            }
        } else if (err) {
            return res.status(403).json("Token is not valid!");
        } else {
            const googleId = userInfo.sub;
            fetchUserId(googleId)
                .then((userId) => {
                    if (!userId) {
                        return res.status(404).json("User not found.");
                    }
                    req.userInfo = { ...userInfo, user_id: userId };
                    next();
                })
                .catch((fetchUserIdErr) => handleSQLError(fetchUserIdErr, res));
        }
    });
};

const register = (google_id, name, refresh_token) => {
    const sql = "INSERT INTO user (google_id, name, refresh_token) VALUES (?, ?, ?)";
    const values = [google_id, name, refresh_token];

    db.query(sql, values, (err) => {
        if (err) {
            console.log("Error creating user:", err);
            return;
        }
        console.log("User created successfully.");
    });
};

const checkIfGoogleUserExist = async (user_sub) => {
    const id = user_sub;
    const sql = "SELECT * FROM user WHERE google_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, data) => {
            if (err) {
                console.error("Error checking if user exists:", err);
                resolve(false);
            } else {
                resolve(data.length > 0);
            }
        });
    });
};

export const login = async (req, res) => {
    const { code } = req.body;

    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.CLIENT_ORIGIN;

    try {
        const response = await axios.post(tokenUrl, {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        });

        const { access_token, refresh_token, id_token } = response.data;
        const payload = jwt.decode(id_token);
        const userGoogleId = payload.sub;

        let user = await checkIfGoogleUserExist(userGoogleId);
        if (!user) {
            register(userGoogleId, payload.name, refresh_token);
            user = await checkIfGoogleUserExist(userGoogleId);
        } else {
            // Update refresh token if it's not present or if we want to ensure it's always updated
            await updateRefreshToken(userGoogleId, refresh_token);
        }

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ sub: userGoogleId }, secretKey, { expiresIn: "1m" });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        }).status(200).json({ message: "User logged in successfully", user });

    } catch (error) {
        console.error("Error during token exchange:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
};
