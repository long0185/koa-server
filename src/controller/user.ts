import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from "../entity/User"
import { plainToClass } from "class-transformer"
import { NotFoundException, ForbiddenException } from "../exceptions"
export default class UserController {
    public static async listenUser(ctx: Context) {
        const userRepository = getManager().getRepository(User);
        const user = await userRepository.find()
        ctx.status = 200;
        ctx.body = user;
    }
    public static async showUserDetail(ctx: Context) {
        const userRepository = getManager().getRepository(User)
        const user = await userRepository.findOne(+ctx.params.id)
        if(user){
            ctx.status = 200;
            ctx.body = user;
        }else{
            throw new ForbiddenException()
        }
    }
    public static async updateUser(ctx: Context) {
        const userId = +ctx.params.id;
        if (userId !== +ctx.state.user.id) {
            throw new ForbiddenException();
          }
        const userRepository = getManager().getRepository(User);
        await userRepository.update(userId, JSON.parse(ctx.request.body))
        const updatedUser = await userRepository.findOne(userId);
        ctx.body = updatedUser
    }
    public static async deleteUser(ctx: Context) {
        const userId = +ctx.params.id;
        if (userId !== +ctx.state.user.id) {
            throw new ForbiddenException();
          }
        const userRepository = getManager().getRepository(User);
        await userRepository.delete(userId);
        ctx.status = 204;
    }
}