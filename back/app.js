import "dotenv/config"
import express from "express";
import bodyParser from "body-parser";

// Server startup
const app = express();
const port = 8000;

// Middlewares (server plug-ins)
//app.use(cors());
app.use(bodyParser.json());

// Test endpoint
app.post("/api/test", (req, res) => {
    res.json({
        greeting: "Hello World!"
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
