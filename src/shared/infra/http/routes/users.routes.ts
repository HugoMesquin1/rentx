import { Router } from "express"
import uploadConfig from "../../../../config/upload"
import { CreateUserController } from "../../../../modules/accounts/useCases/CreateUser/CreateUserController"
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"
import multer from "multer"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ProfileUserUserController } from "modules/cars/useCases/ProfileUserUseCase/ProfileUserController"


const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserUserController()

const uploadAvatar = multer(uploadConfig)

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar") , updateUserAvatarController.handle)

usersRoutes.get("/", ensureAuthenticated, profileUserController.handle)
export {usersRoutes}