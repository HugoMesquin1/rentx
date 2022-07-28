import { Router } from "express"

import { UploadCarImageController } from "modules/cars/useCases/uploadCarImages/UploadCarImagesController"
import { CreateCarController } from "modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "modules/cars/useCases/listAvaliableCars/ListAvailableCarsController"

import multer from "multer"
import uploadConfig from "../../../../config/upload"

import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const upload = multer(uploadConfig.upload("./tmp/cars"))


const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()


carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle )
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id",ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post("/images/:id",ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)


export { carsRoutes }