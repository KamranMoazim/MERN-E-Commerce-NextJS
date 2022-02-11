const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

// other Routes
const testingRoutes = require("./Routes/testingRoutes");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware
app.use("/api", testingRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

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