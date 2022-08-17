import { IUsersTokensRepository } from 'modules/accounts/repositories/IUsersTokensRepository';
import { container } from "tsyringe"



import { ICategoriesRepository } from "modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationsRepository } from "modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { ISpecificationRepository } from "modules/cars/repositories/ISpecificationsRepository"
import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "modules/accounts/infra/typeorm/repositories/UsersRepository"
import { ICarsRepository } from "modules/cars/repositories/ICarsRepository"
import {CarsRepository} from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepository } from "modules/cars/repositories/ICarsImagesRepository"
import { CarsImagesRepository } from "modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { RentalsRepository } from "modules/rentals/infra/typeorm/repositories/RentalsRepository"
import {IRentalsRepository} from "../../modules/rentals/repositories/IRentalsRepository"
import { UsersTokensRepository } from "modules/accounts/infra/typeorm/repositories/UsersTokensRepository"






container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository", 
  CarsRepository
  )

  container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository", 
    CarsImagesRepository
    )

    container.registerSingleton<IRentalsRepository>(
      "RentalsRepository", 
      RentalsRepository
    )

    container.registerSingleton<IUsersTokensRepository>(
      "UsersTokensRepository",  
      UsersTokensRepository
    )