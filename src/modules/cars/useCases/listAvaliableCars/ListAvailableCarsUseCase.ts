import { ICarsRepository } from "modules/cars/repositories/ICarsRepository";
import { injectable, inject } from "tsyringe";
import {Car} from "../../infra/typeorm/entities/Car"

interface IRequest{
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase{
  constructor(
     @inject("CarsRepository") private carsRepository: ICarsRepository
  ){}
  async execute({category_id, brand, name}: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvaliable(category_id, brand, name)
    return cars

  }
}



export {ListAvailableCarsUseCase}