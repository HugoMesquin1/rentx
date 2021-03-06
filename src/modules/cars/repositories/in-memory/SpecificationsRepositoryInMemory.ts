import { Specification } from "../../../cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";



class SpecificationsRepositoryInMemory implements ISpecificationRepository{
specification: Specification[] = []

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, { description, name })
    this.specification.push(specification)

    return specification
  }
  async findByName(name: string): Promise<Specification> {
    return this.specification.find(
    (specification) => specification.name === name)
  }
  
  async findByIDs(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specification.filter(specification => ids.includes(specification.id))
  

    return allSpecifications
  }
}


export {SpecificationsRepositoryInMemory}