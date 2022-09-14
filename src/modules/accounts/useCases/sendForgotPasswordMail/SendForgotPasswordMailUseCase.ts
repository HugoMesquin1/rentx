import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from 'modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from "tsyringe"


@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ){}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError("User doesn't exist")
    }

    
  }
}

export { SendForgotPasswordMailUseCase }