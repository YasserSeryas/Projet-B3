
import mongoose from "mongoose";

const { Schema } = mongoose;

const commandeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    products : [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        },
            
    }],
    amount : { type : Number, required : true },
    address : { type : String, required : true },
    status : { type : String, default : "pending" },
    

}, {
    timestamps: true,
});

commandeSchema.static({
    findByUserId(userId) {
        return this.find({ user: userId });
    },
    verifyUserId(userId, produitId) {
        return this.findOne({ user: userId, _id: produitId });
    },
});

const Commande = mongoose.model("Commande", commandeSchema);

export default Commande;