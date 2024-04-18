import { db } from "../db.js";
import jwt from "jsonwebtoken"
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from "jwt-decode";
import 'dotenv/config'

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
        const token = jwt.sign({ sub: user_google_id }, secretKey);
        const isDevelopment = process.env.NODE_ENV === 'development';

        console.log("Creating cookie.");
        res.cookie("access_token", token, {
            httpOnly: !isDevelopment,
        }).status(200).json({ message: "User logged in successfully" });


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