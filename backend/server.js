const express = require("express");
const mongoose = require("mongoose");
const Event = require("./models/Event");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:");
        console.log(error);
    });

// Home route
app.get("/", (req, res) => {
    res.send("BGTI Updates Backend is Running!");
});
app.get("/test-event", (req, res) => {
    res.send("Event API is ready!");
});
app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        });
    }
});
// Create Event
app.post("/api/events", async (req, res) => {
    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({
            message: "Error creating event",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});