import mongoose from "mongoose";

const { Schema } = mongoose;

const produitSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: Array,
    },
    size : {
        type : String,
        
    },
    color : {
        type : String,
       
    },
        
}, {
    timestamps: true,
});

produitSchema.static({
    findByUserId(userId) {
        return this.find({ user: userId });
    },
    verifyUserId(userId, produitId) {
        return this.findOne({ user: userId, _id: produitId });
    },
});

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;