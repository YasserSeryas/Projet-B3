import CommandeModel from "#components/commande/commande-model.js";
import UserModel from "#components/user/user-model.js";

import Joi from "joi";

export async function index(ctx) {
    try {
        const orders = await CommandeModel.find({});
        ctx.ok(orders);
  
    } catch (e) {
        ctx.badRequest({ message: e.message });

       
    }     
}
// Get User Order

export async function id(ctx) {
    try {
        if (!ctx.params.userId) throw new Error("No id supplied");
        const cart = await CommandeModel.find({userId: ctx.params.userId});
        if (!cart) {
            return ctx.notFound();
        }
        ctx.ok(cart);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

// Create a new order

export async function create(ctx) {
    
    try {

        const orderValidationSchema = Joi.object({
            
            products: Joi.array().required(),
            amount: Joi.number().required(),
            address: Joi.string().required(),
            status: Joi.string()
        });
    
        const { error, value } = orderValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const newOrder = await CommandeModel.create({
            ...value,
            userId :ctx.state.user._id,
            
        });
        ctx.ok(newOrder);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}
// Update order
export async function update(ctx) {
    try {
        const cartValidationSchema = Joi.object({
            title: Joi.string(),
            price: Joi.number(),
            description: Joi.string(),
            image: Joi.string(),
            quantity: Joi.number(),
            category: Joi.array(),
            size: Joi.string(),
            color: Joi.string(),
        });
        if (!ctx.params.id) throw new Error("No id supplied");
        const { error, value } = cartValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const updatedProduit = await CommandeModel.findOneAndUpdate({ _id: ctx.params.id, user: ctx.state.user.id },
            value, { runValidators: true, new: true }
        );
        ctx.ok("Product Updated : "+ updatedProduit);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function destroy(ctx) {
    try {
        if (!ctx.params.id) throw new Error("No id supplied");
        await CommandeModel.deleteOne({
            _id: ctx.params.id,
            user: ctx.state.user.id,
        });
        ctx.ok("Ressource deleted");
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}
// Statistics 
export async function monthlyStats(ctx) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const stats = await CommandeModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales : "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        ctx.ok(stats);
    }
    catch (e) {
        ctx.badRequest({ message: e.message });
    }

    
}
