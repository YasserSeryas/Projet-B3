import Router from "@koa/router";
import * as cartControllers from "#components/cart/cart-controllers.js";

import {
    isAuthentificatedAndResolveUser,
    isAuthentificated,isAuthentificatedAndResolveRoleUser 
} from "#middlewares/jwt-handler.js";

const cart = new Router();


cart.get("/:userId", cartControllers.id);
cart.get("/",isAuthentificatedAndResolveUser,isAuthentificatedAndResolveRoleUser, cartControllers.index);
cart.post("/", isAuthentificatedAndResolveUser , cartControllers.create);
cart.put("/:id", isAuthentificatedAndResolveUser, cartControllers.update);
cart.del("/:id", isAuthentificatedAndResolveUser, cartControllers.destroy);

export default cart;