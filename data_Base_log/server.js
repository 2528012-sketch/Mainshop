const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:");
        console.log(error);
    });


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Shopkeeper's Day Login Backend is running!"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});