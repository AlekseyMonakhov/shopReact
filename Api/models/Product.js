const mongoose = require("mongoose");


const ProductVariant = new mongoose.Schema(
    {
        size: {type: String, required: true},
        color: {type: String, required: true},
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
        colors: {type:Array, required: true},
        sizes: {type:Array, required: true},
        price: {type: Number, required: true},
        
    },
    {timestamps: true}
);


module.exports = mongoose.model("Product", ProductSchema);