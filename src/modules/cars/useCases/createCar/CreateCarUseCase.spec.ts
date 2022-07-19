import { AppError } from "@shared/errors/AppError"
import "reflect-metadata"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase 
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () =>{
    await createCarUseCase.execute({
      name: "Name car",
      brand: "Brand",
      description: "Description",
      daily_rate: 100,
      license_plate: "abc-123",
      fine_amount: 60,
      category_id: "category"
    })
  })

  it ("should be not able to create a car with exist license_plate", () =>{
    expect (async () => {
      await createCarUseCase.execute({
        name: "Car1",
        brand: "Brand",
        description: "Description",
        daily_rate: 100,
        license_plate: "abc-123",
        fine_amount: 60,
        category_id: "category"
      
      
    })

    await createCarUseCase.execute({
      name: "Car2",
      brand: "Brand",
      description: "Description",
      daily_rate: 100,
      license_plate: "abc-123",
      fine_amount: 60,
      category_id: "category"
    })
   }).rejects.toBeInstanceOf(AppError)
 })
 
 it("should not be able to create a car with avaliable true by default", async () => {
  const car = await createCarUseCase.execute({
    name: "Car Avaliable",
      brand: "Brand",
      description: "Description",
      daily_rate: 100,
      license_plate: "abcd-123",
      fine_amount: 60,
      category_id: "category"
  })

  expect(car.available).toBe(true)
 })


})
