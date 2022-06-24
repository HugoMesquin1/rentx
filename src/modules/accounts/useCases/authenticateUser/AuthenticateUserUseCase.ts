import { compare } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import {sign} from "jsonwebtoken"



interface IRequest{
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}
  
  async execute({email, password}: IRequest): Promise<IResponse>{
   // check if user exist
     const user = await this.usersRepository.findByEmail(email)
    
     if(!user) {
       throw new Error("Email or password incorrect")
     }

     const passwordMatch = await compare(password, user.password)
     // password does not match
     if(!passwordMatch) {
       throw new Error("Email or password incorrect")
   }
  
   const token = sign({}, "8b456d56cbb81ba3f0986c37e9308f1f", {
     subject : user.id,
     expiresIn: "1d"
   })

   return {
    user,
    token,
   }
 }
}

export {AuthenticateUserUseCase}
