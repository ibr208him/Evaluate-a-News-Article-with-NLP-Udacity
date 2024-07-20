const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { analyze } = require("./analyze");
const app = express();

// Config the express server
dotenv.config();
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Variables for port and API key
const port = 8080;
const apiKey = process.env.API_KEY;

// Get Route
app.get("/", (req, res) => {
  res.sendFile("dist/index.html", { root: __dirname });
});

// POST Route
app.post("/analyze", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await analyze(url, apiKey);

    if (result.status === 200) {
      res.json(result.customeData); // Send successful response
    } else {
      res.status(result.status).json({ error: result.error }); // Send error response
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: "Unexpected server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});