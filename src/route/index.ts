import Router from '@koa/router'
import AuthController from "../controller/auth"
import UserController from "../controller/user"
import {TempController} from "../controller/TempController"
const unprotectedRouter = new Router();
unprotectedRouter.post("/auth/login",AuthController.login)
unprotectedRouter.post("/auth/register",AuthController.register)
unprotectedRouter.post("/upload/temp",TempController.upload)
const protectedRouter = new Router();
protectedRouter.get("/users",UserController.listenUser);
protectedRouter.get("/users/:id",UserController.showUserDetail)
protectedRouter.put("/users/:id",UserController.updateUser)
protectedRouter.delete("/users/:id",UserController.deleteUser)
export {
    unprotectedRouter,
    protectedRouter
}