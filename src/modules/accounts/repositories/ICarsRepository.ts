import { ICreateCarDTO } from "modules/cars/dtos/ICreateCarDTO"
import {Car} from "../../cars/infra/typeorm/entities/Car"



interface ICarsRepository {
  findByLicensePlate(license_plate: string)

  create (data: ICreateCarDTO): Promise<Car>
}

export { ICarsRepository } 