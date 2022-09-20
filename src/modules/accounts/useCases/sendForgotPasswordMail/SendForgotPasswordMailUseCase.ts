import { AppError } from '@shared/errors/AppError';
import {v4 as uuidV4} from "uuid"
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from 'modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from "tsyringe"
import { IDateProvider } from '@shared/container/Dateprovider/IDateProvider';
import { IMailProvider } from '@shared/container/MailProvider/IMailProvider';


@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ){}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError("User doesn't exist")
    }

    const token = uuidV4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    await this.mailProvider.SendMail(
      email, 
      "Recuperação de senha",
     `O link para o reset é ${token}`
     )

    
  }
}

export { SendForgotPasswordMailUseCase }