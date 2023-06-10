import CartModel from "#components/cart/cart-model.js";



import Joi from "joi";
// Get all carts
export async function index(ctx) {
    try {
        const carts = await CartModel.find({});
        ctx.ok(carts);
  
    } catch (e) {
        ctx.badRequest({ message: e.message });

       
    }     
}
// Get User cart

export async function id(ctx) {
    try {
        if (!ctx.params.userId) throw new Error("No id supplied");
        const cart = await CartModel.find({userId: ctx.params.userId});
        if (!cart) {
            return ctx.notFound();
        }
        ctx.ok(cart);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

// adding a  product to cart

export async function create(ctx) {
    try {
        const cartValidationSchema = Joi.object({
            products: Joi.array().required(),
            quantity: Joi.number(),
        });
        const { error, value } = cartValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const newCart = await CartModel.create({
            ...value,
            userId: ctx.state.user._id,
            
        });
        ctx.ok(newCart);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}
// Update cart
export async function update(ctx) {
    try {
        const cartValidationSchema = Joi.object({
            products: Joi.array().required(),
            quantity: Joi.number(),
        });
        if (!ctx.params.id) throw new Error("No id supplied");
        const { error, value } = cartValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const updatedCart = await CartModel.findOneAndUpdate(
            ctx.params.id,
            {
              $set: value,
            },
            { new: true }
        );
        ctx.ok("cart Updated : "+ updatedCart);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function destroy(ctx) {
    try {
        if (!ctx.params.id) throw new Error("No id supplied");
        await CartModel.deleteOne({
            _id: ctx.params.id,
            user: ctx.state.user._id,
        });
        ctx.ok("Ressource deleted");
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}