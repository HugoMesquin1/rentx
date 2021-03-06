import "reflect-metadata"

import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import{AppError} from "../../../../shared/errors/AppError"
import {DayjsDateProvider} from "../../../../shared/container/Dateprovider/implementations/DayJsDateProvider"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider

describe ("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider)
  })

  it(" should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
    })
   
    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it(" should be able to create a new rental if there is another open to the same use", async () => {
    
    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
      
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

 
  it(" should be able to create a new rental if there is another open to the same car", async () => {
    
    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
      
       await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it(" should not be able to create a new rental with invalid return time", async () => {
    
    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })
      
    }).rejects.toBeInstanceOf(AppError)
  })
})