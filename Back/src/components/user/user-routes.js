import Router from "@koa/router";
import * as UserControllers from "#components/user/user-controllers.js";
import {
    isAuthentificatedAndResolveUser
} from "#middlewares/jwt-handler.js";
const users = new Router();

users.post("/register", UserControllers.register);
users.post("/login", UserControllers.login);
users.post("/validate", isAuthentificatedAndResolveUser, UserControllers.validateEmail);
users.put("/:id", isAuthentificatedAndResolveUser, UserControllers.update);
users.get("/me", isAuthentificatedAndResolveUser, (ctx) => {
    ctx.ok({
        name: ctx.state.user.nom,
        email: ctx.state.user.email,
        role: ctx.state.user.role,
        id: ctx.state.user.id,
        isVerified: ctx.state.user.settings.is_email_validated
    });
});
users.get("/get/:id", UserControllers.index);

export default users;