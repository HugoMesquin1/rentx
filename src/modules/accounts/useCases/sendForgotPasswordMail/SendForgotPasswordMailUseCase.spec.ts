import { AppError } from './../../../../shared/errors/AppError';
import "reflect-metadata"

import { DayjsDateProvider } from '@shared/container/Dateprovider/implementations/DayJsDateProvider';
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { UsersRepositoryInMemory } from "modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from 'modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { MailProviderInMemory } from '@shared/container/MailProvider/in-memory/MailProviderInMemory';
 

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory, 
      dateProvider,
      mailProvider 
      )
    })

      


  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "SendMail")

    await usersRepositoryInMemory.create({
      driver_license:"331312",
      email: "random@random.com",
      name: "john curry",
      password: "123456"
    })

    await sendForgotPasswordMailUseCase.execute("random@random.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it ("Should not be able to send email if user doest not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("kaka@gmail.com")
    ).rejects.toEqual(new AppError("user does not exist."))
  })

  it ("Should be able to create an users token"), async () => {
   const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create")
    
   usersRepositoryInMemory.create({
    driver_license:"341234",
    email: "randoa@randoma.com",
    name: "johnas currys",
    password: "123456"
  })

  await sendForgotPasswordMailUseCase.execute("randoa@randoma.com")

  expect (generateTokenMail).toBeCalled()
  }
})