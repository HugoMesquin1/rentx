import { container } from "tsyringe"
import { Request, response, Response } from "express"

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"



class AuthenticateUserController {

  async handle(request: Request, Response: Response ): Promise<Response>{
    const {password, email} = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUserUseCase.execute({password, email})

    return Response.json(token)
  }
}

export { AuthenticateUserController } 