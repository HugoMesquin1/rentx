import "reflect-metadata"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import {UsersRepositoryInMemory} from "../../../accounts/repositories/in-memory/UsersRepositoryInMemory"
import {CreateUserUseCase} from "../CreateUser/CreateUserUseCase"
import {ICreateUserDTO} from "../../../../../src/modules/accounts/dtos/ICreateUserDTO"
import {AppError} from "@shared/errors/AppError"
import {UsersTokensRepositoryInMemory} from "../../../accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/Dateprovider/implementations/DayJsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider

describe ("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory() 
    dateProvider = new DayjsDateProvider()
    
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory,dateProvider )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it ("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    }
    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(result).toHaveProperty("token")
  })

  it ("should not be able to authenticate an nonexistent user", async () =>{
    await expect (authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })

  it("should not be able to authenticate with incorrect password", async () =>{
    const user: ICreateUserDTO = {
      driver_license: "999",
      email: "user@user.com",
      password: "12345",
      name: "User Test "
    }

    await createUserUseCase.execute(user)
    
    await expect( authenticateUserUseCase.execute({
        email: user.email,
        password: "Wrong password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})