

import { Rental } from "modules/rentals/infra/typeorm/entities/Rental"
import { AppError } from "@shared/errors/AppError"
import {IRentalsRepository} from "../../repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/Dateprovider/IDateProvider"
import { injectable, inject } from "tsyringe"
import { ICarsRepository } from "modules/cars/repositories/ICarsRepository"



interface IRequest{
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase { 

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject ("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  
  async execute({
    user_id, 
    car_id, 
    expected_return_date}: IRequest): Promise<Rental>{
      const minimumHour = 24

      
      const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

      if(carUnvailable){
        throw new AppError("Car is unavailable")
      }
      
      
      const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

       if(rentalOpenToUser){
        throw new AppError("There's a rental in progress for user")
       }
      
      
       

       const dateNow = this.dateProvider.dateNow()

       const compare = this.dateProvider.compareInHours(
        dateNow,
        expected_return_date
        )

       if(compare < minimumHour) {
        throw new AppError("Invalid return time!")
       }
      
       const rental = await this.rentalsRepository.create({
        user_id,
        car_id,
        expected_return_date
      })

      await this.carsRepository.updateAvailable(car_id, false)

      return rental


    }
}

export { CreateRentalUseCase }