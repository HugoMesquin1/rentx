import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError"

import {UsersRepository} from "../../src/modules/accounts/repositories/implementations/UsersRepository"

interface IPayload {
  sub: string
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  const authHeader = request.headers.authorization


  if(!authHeader) {
    throw new AppError("Token is required")
  }
  
  const [, token] = authHeader.split(" ")

  try {
   const { sub: user_id } = verify(token, "8b456d56cbb8'1'ba3f0986c37e9308f1f") as IPayload
    
   const usersRepository = new UsersRepository()
   
   const user = await usersRepository.findById(user_id)

   if(!user) {
    throw new AppError("User does exists", 401)
   }

   request.user = {
    id: user_id,
   }
   

   next()
  } catch {
   throw new AppError("Invalid token", 401)
  }


}