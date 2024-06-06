import { db } from "../db.js";
import jwt from "jsonwebtoken"
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from "jwt-decode";
import 'dotenv/config'

// Authentication middleware function
export const authenticate = (req, res, next) => {
    // Authentication
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        // Query the database to find the user ID associated with the Google ID
        const googleId = userInfo.sub;
        const userSql = "SELECT id FROM user WHERE google_id = ?";
        db.query(userSql, [googleId], (userErr, userData) => {
            if (userErr) {
                return res.status(500).json(userErr);
            }

            if (userData.length === 0) {
                return res.status(404).json("User not found.");
            }

            // Attach user ID to request object
            req.userInfo = { ...userInfo, user_id: userData[0].id };
            next();
        });
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



const register = (google_id, name) => {
    const sql = "INSERT INTO user (google_id, name) VALUES (?)"
    const values = [
        google_id,
        name,
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.log("Error creating user");
            console.log(err);
            return;
        }
        console.log("User created successfully.");
        return;
    })
}

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
    console.log("verifying...");
    try {
        // Verify the JWT token
        const response = await verify(req.body.clientId, req.body.credential);
        console.log("User:", response);

        const user_google_id = response.sub;

        // Check if the Google user exists
        const userExists = await checkIfGoogleUserExist(user_google_id);
        console.log("UserExists?", userExists);

        if (!userExists) {
            register(user_google_id, response.name)
        }

        // Set the token or relevant user information as the cookie value
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ sub: user_google_id }, secretKey, { expiresIn: "1h" });
        const isDevelopment = process.env.NODE_ENV === 'development';

        console.log("Creating cookie.");
        res.cookie("access_token", token, {

        }).status(200).json({ message: "User logged in successfully" });
        // httpOnly: false, // Ensure the cookie is only accessible via HTTP requests
        // secure: !isDevelopment, // Set to true in production to only send the cookie over HTTPS
        // sameSite: isDevelopment ? 'strict' : 'none' // Set sameSite to none for cross-origin requests in production

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred during login" });
        return;
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}