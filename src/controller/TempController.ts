import { getManager, getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { Context } from 'koa'
import { Temperature } from '../entity/Temperature'
export class TempController {
    public static async upload(ctx: Context) {
        const tempRepository = getManager().getRepository(Temperature)
        const newTemp = plainToClass(Temperature, ctx.request.body)
        newTemp.IsUpload = ctx.request.body.IsUpload == 'true' ? true : false
        const msg = await tempRepository.save(newTemp)
        ctx.status = 200;
        ctx.body = msg;
    }
}
