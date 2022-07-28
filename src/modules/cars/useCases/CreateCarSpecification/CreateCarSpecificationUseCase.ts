import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/errors/AppError"
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository"
import { Car }  from "../../../cars/infra/typeorm/entities/Car"


interface IRequest{
  car_id: string
  specifications_id: string[]
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ){}

  async execute ({car_id, specifications_id}): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if(!carExists){
      throw new AppError("Car does not exists.")
    }

    const specifications = await this.specificationsRepository.findByIDs(
      specifications_id
    )

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)

    return carExists

    
 
  }
}





export {CreateCarSpecificationUseCase}