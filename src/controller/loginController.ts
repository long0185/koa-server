import { getRepository } from 'typeorm';
import { User } from "../entity/User";
import { Context } from 'koa'
type LoginUser = {
    loginId: string,
    loginPwd: string
}
export class loginController {
    private loginRepository = getRepository(User);
    async one(ctx: Context) {
        return this.loginRepository.findOne()
    }
}