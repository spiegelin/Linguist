import "dotenv/config"
import express from "express";
import bodyParser from "body-parser";
import test from "./db.js";

// Server startup
const app = express();
const port = process.env.APP_PORT || 3000;

// Middlewares (server plug-ins)
//app.use(cors());
app.use(bodyParser.json());

// Test endpoint
app.post("/api/test", (req, res) => {
    res.json({
        greeting: "Hello World!"
    });
});

// Send message
app.post("/api/sendMessage", async (req, res) => {
    try {
        // Get message from the request
        const message = req.body.message;
        const conversation_id = req.body.conversation_id;
        const user_id = req.body.user_id;
        console.log("Message received: ", message);

        // Query for the DB
        let result = await test(message, conversation_id, user_id);

        // Send response to the user
        if (result == true) {
            res.json({
                message: "Message sent successfully!"
            });
        } else {
            res.json({
                message: "Error sending message!"
            });
        }
        
    } catch (err) {
        console.error("Error sending message: ", err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
