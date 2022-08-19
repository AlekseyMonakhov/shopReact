const mongoose = require("mongoose");


const ProductVariant = new mongoose.Schema(
    {
        size: {type: String},
        color: {type: String},
        inStock: {type:Boolean, default: true},
    },
);

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true,},
        categories: {type: Array},
        img: {type: String, required: true},
        variant: [{type:ProductVariant, required: true}],
        price: {type: Number, required: true},
        
    },
    {timestamps: true}
);


module.exports = mongoose.model("Product", ProductSchema);