import auth from "@config/auth"
import { IDateProvider } from "@shared/container/providers/Dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import {verify, sign} from "jsonwebtoken"


import { IUsersTokensRepository } from '../../../../../src/modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from "tsyringe"


interface Ipayload {
  sub: string
  email: string
}

interface ITokenResponse{
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
   const {email, sub} = verify(token, auth.secret_refresh_token) as Ipayload
   
   const user_id = sub
   
   const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(
    user_id, 
    token
    )
   
   if(!userTokens) {
    throw new AppError("Refresh Token doesn't exists")
   }

   await this.usersTokensRepository.deleteById(userTokens.id)

  
  const refresh_token = sign ({ email }, auth.secret_refresh_token,{
    subject: sub,
    expiresIn: auth.expires_in_refresh_token,
  })

  const expires_date = this.dateProvider.addDays(
    auth.expires_refresh_token_day
  )
  await this.usersTokensRepository.create({
    user_id,
    refresh_token,
    expires_date,
    
  })

  const newToken = sign({}, auth.secret_token,{
    subject: user_id,
    expiresIn: auth.expires_in_token,
  })

  return {
    refresh_token,
    token: newToken
  }
   
  }
}
   


  




export { RefreshTokenUseCase }