const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    description: {
        type: String,
        required: true,
        max: 2000,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: ObjectId, 
        ref: "Category", 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    photoPath: {
        type: String,
        required: true,
    },
    shipping: {
        type: Boolean,
        required: false,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);
