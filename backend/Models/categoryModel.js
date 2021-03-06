const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        max: 32,
        index: true,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("Category", categorySchema);