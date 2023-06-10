import ProduitModel from "#components/produit/produit-model.js";



import Joi from "joi";
// Get all products
export async function index(ctx) {
    const newP = ctx.query.newP;
    const category = ctx.query.category

    try {
        let products;
        // Get all products by date of creation
        if (newP) {
            products = await ProduitModel.find().sort({ createdAt: -1 });
            
        }
        // Get all products by category
        else if (category) {
            products = await ProduitModel.find({ category: { $in: [category] } });
            
        } else {
            products = await ProduitModel.find({});
      
            
        }
        ctx.ok(products);
        
    } catch (e) {
        ctx.badRequest({ message: e.message });

       
    }   
}
// Get a specific product

export async function id(ctx) {
    try {
        if (!ctx.params.id) throw new Error("No id supplied");
        const produit = await ProduitModel.findOne({_id: ctx.params.id});
        if (!produit) {
            return ctx.notFound();
        }
        ctx.ok(produit);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

// Create a new product

export async function create(ctx) {
    try {
        const produitValidationSchema = Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.string().required(),
            image: Joi.string(),
            quantity: Joi.number().required(),
            category: Joi.array(),
            size: Joi.string(),
            color: Joi.string(),
        });
        const { error, value } = produitValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const newProduit = await ProduitModel.create({
            ...value,
            
        });
        ctx.ok(newProduit);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}
// Update a  product
export async function update(ctx) {
    try {
        const produitValidationSchema = Joi.object({
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
        const { error, value } = produitValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const updatedProduit = await ProduitModel.findOneAndUpdate({ _id: ctx.params.id, user: ctx.state.user.id },
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
        await ProduitModel.deleteOne({
            _id: ctx.params.id,
            user: ctx.state.user.id,
        });
        ctx.ok("Ressource deleted");
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}