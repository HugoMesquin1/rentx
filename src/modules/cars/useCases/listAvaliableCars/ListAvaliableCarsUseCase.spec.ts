import "reflect-metadata"
import {ListAvailableCarsUseCase} from "./ListAvailableCarsUseCase"
import {CarsRepositoryInMemory} from "../../repositories/in-memory/CarsRepositoryInMemory"
let listAvaliableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvaliableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("Should be able to list all avaliable cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro test",
      description: "Car description",
      daily_rate: 140.001,
      license_plate: "teste-teste",
      fine_amount: 102,
      brand: "Car brand",
      category_id: "CategoryID"

    })
  


    const cars = await listAvaliableCarsUseCase.execute({})
    expect (cars).toEqual([car])
  })

  it("Should be able to list all avaliable cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro test2",
      description: "Car description2",
      daily_rate: 140.001,
      license_plate: "teste-teste",
      fine_amount: 102,
      brand: "Car brand_test",
      category_id: "CategoryID"

    })



    const cars = await listAvaliableCarsUseCase.execute({
      brand: "Car_brand_test",
      
    })


    expect (cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description",
      daily_rate: 110,
      license_plate: "def-123",
      fine_amount:  40,
      brand: "Car_brand",
      category_id: "category_id",
    })

    const cars = await listAvaliableCarsUseCase.execute({
      brand: "Car_brand"
    })
    expect (cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description",
      daily_rate: 110,
      license_plate: "def-1234",
      fine_amount:  40,
      brand: "Car_brand",
      category_id: "category_id",
    })

    const cars = await listAvaliableCarsUseCase.execute({
      name: "Car3"
    })
    expect (cars).toEqual([car])
  })
  
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description",
      daily_rate: 110,
      license_plate: "def-1234",
      fine_amount:  40,
      brand: "Car_brand",
      category_id: "12345",
    })

    const cars = await listAvaliableCarsUseCase.execute({
      category_id: "123456"
    })
    expect (cars).toEqual([car])
  })

})