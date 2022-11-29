import { IDateProvider } from '@shared/container/providers/Dateprovider/IDateProvider';
import { AppError } from './../../../../shared/errors/AppError';
import { IUsersTokensRepository } from 'modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from 'modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { inject, injectable } from "tsyringe"
import {hash } from "bcryptjs"
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';



interface IRequest {
  token: string,
  password: string
}

@injectable()
class ResetPasswordUserUseCase{
  constructor(
    @inject("UsersTokensRepository")
    private UsersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository

  ){

  }

  async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.UsersTokensRepository.findByRefreshToken(
      token
      )

    if("userToken") {
       throw new AppError ("Token invalid")
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
      throw new AppError("Token expired!")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.UsersTokensRepository.deleteById(userToken.id)

  }
}

export {ResetPasswordUserUseCase}