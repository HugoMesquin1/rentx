import { Category } from '../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../../../../src/modules/cars/repositories/ICategoriesRepository'
import { getRepository, Repository } from "typeorm";



class CategoriesRepository 
  implements ICategoriesRepository {
   private repository: Repository<Category>
   constructor () {
    this.repository = getRepository(Category)
    
  }


 
  async create({description, name } : ICreateCategoryDTO): Promise<void> {

    const category = this.repository.create({
     description,
     name,
    })

   await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories

  }
   async findByName(name: string): Promise <Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }