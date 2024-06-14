import { db } from "../db.js";
import jwt from "jsonwebtoken"
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from "jwt-decode";
import 'dotenv/config'
import axios from "axios";


export const handleSQLError = (error) => {
    console.error("Database query error:", error);
    return res.status(500).json({ message: "Internal server error" });
}

export const refreshAccessToken = async (googleId, res) => {
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
            console.error("No refresh token found for user");
            return null;
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
        console.log("DEBUG payload.sub", payload.sub);

        const secretKey = process.env.SECRET_KEY;
        const newToken = jwt.sign({ sub: payload.sub }, secretKey, { expiresIn: "1m" });

        res.cookie("access_token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        });

        console.log("New access token created.");
        return newToken;

    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};

// Authentication middleware function
export const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    const userInfo = jwtDecode(req.cookies.access_token)
    console.log("DEBUG userInfo:", userInfo.sub);

    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, async (err) => {
        if (err && err.name === 'TokenExpiredError') {
            // Token is expired, refresh it
            console.log("Token expired, refreshing...");
            const refreshedToken = await refreshAccessToken(userInfo.sub, res);
            if (!refreshedToken) {
                return res.status(403).json("Token is not valid and refresh failed!");
            }
            req.userInfo = jwt.decode(refreshedToken);
            next();
        } else if (err) {
            return res.status(403).json("Token is not valid!");
        } else {
            const googleId = userInfo.sub;
            const userSql = "SELECT id FROM user WHERE google_id = ?";
            db.query(userSql, [googleId], (userErr, userData) => {
                if (userErr) {
                    return handleSQLError(userErr, res);
                }

                if (userData.length === 0) {
                    return res.status(404).json("User not found.");
                }

                req.userInfo = { ...userInfo, user_id: userData[0].id };
                next();
            });
        }
    });
};

async function verify(client_id, jwtToken) {

    const client = new OAuth2Client(client_id);

    // Call the verifyIdToken to
    // verify and decode it
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: client_id,
    });

    // Get the JSON with all the user info
    const payload = ticket.getPayload();

    // This is a JSON object that contains
    // all the user info
    return payload;
}



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

    const id = user_sub
    const sql = "SELECT * FROM user WHERE google_id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, data) => {
            if (err) {
                console.error("Error checking if user exists:", err);
                resolve(false);
            } else {
                resolve(data.length > 0); // Resolve with true if user exists, false otherwise
            }
        });
    });
}

export const login = async (req, res) => {
    const { code } = req.body;

    console.log("DEBUG1", code);

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

        console.log("DEBUG2", response);

        const { access_token, refresh_token, id_token } = response.data;

        const payload = jwt.decode(id_token);
        const userGoogleId = payload.sub;

        let user = await checkIfGoogleUserExist(userGoogleId);
        if (!user) {
            register(userGoogleId, payload.name, refresh_token);
            user = await checkIfGoogleUserExist(userGoogleId);
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

// export const login = async (req, res) => {
//     console.log("verifying...");
//     try {
//         // Verify the JWT token
//         const response = await verify(req.body.clientId, req.body.credential);
//         const user_google_id = response.sub;

//         // Check if the Google user exists
//         const userExists = await checkIfGoogleUserExist(user_google_id);
//         console.log("UserExists?", userExists);

//         if (!userExists) {
//             register(user_google_id, response.name)
//         }

//         // Set the token or relevant user information as the cookie value
//         const secretKey = process.env.SECRET_KEY;
//         const token = jwt.sign({ sub: user_google_id }, secretKey, { expiresIn: "1h" });
//         const isDevelopment = process.env.NODE_ENV === 'development';

//         console.log("Creating cookie.");
//         res.cookie("access_token", token, {

//         }).status(200).json({ message: "User logged in successfully" });
//         // httpOnly: false, // Ensure the cookie is only accessible via HTTP requests
//         // secure: !isDevelopment, // Set to true in production to only send the cookie over HTTPS
//         // sameSite: isDevelopment ? 'strict' : 'none' // Set sameSite to none for cross-origin requests in production

//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ error: "An error occurred during login" });
//         return;
//     }
// }

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}