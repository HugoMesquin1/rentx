import {ListCarsUseCase} from "./ListCarsUseCase"
import {CarsRepositoryInMemory} from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
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
  


    const cars = await listCarsUseCase.execute({})
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



    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
      
    })


    expect (cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description",
      daily_rate: 110,
      license_plate: "def-123",
      fine_amount:  40,
      brand: "Car_brand",
      category_id: "category_id",
    })

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand"
    })
    
  })
})