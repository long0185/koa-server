import Koa from 'koa'
import { logger } from './logger'
import {unprotectedRouter,protectedRouter} from "./route"
import "reflect-metadata";
import { createConnection } from "typeorm"
import bodyParser from 'koa-body'
import jwt from "koa-jwt";
import {JWT_SECRET} from "./constants"

createConnection().then(() => {
   const app = new Koa()
   app.use(logger())
   app.use(bodyParser())
   app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
   app.use(jwt({secret:JWT_SECRET}).unless({method:"Get"}))
   app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())
   app.use(async (ctx,next)=>{
      try{
         await next()
      }catch(e){
         ctx.status = e.status ||500
         ctx.body = {message:e.message}
      }
   })
   app.listen(9527)
}).then(() => console.log('mysql is connected')).catch(err => console.log('error' + err))
