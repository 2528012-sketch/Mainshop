const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
const path = require("path");

app.use(express.static(__dirname));


// Check if backend is working
app.get("/", (req, res) => {
    res.json({
        message: "Low Connectivity Sync Backend is running!"
    });
});


// Receive offline data
app.post("/api/sync", (req, res) => {

    const data = req.body;

    console.log("Received data:");
    console.log(data);

    res.json({
        success: true,
        message: "Data synchronized successfully!",
        data: data
    });

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});