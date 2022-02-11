const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// other Routes
const testingRoutes = require("./Routes/testingRoutes");

// app
const app = express();


// routes middleware
app.use("/api", testingRoutes);

// database connect
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.log("Could not connect to MongoDB.", err))

// port
const port = process.env.PORT || 8000;

// server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});