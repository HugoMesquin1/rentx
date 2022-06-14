import {ICategoriesRepository} from "../../repositories/ICategoriesRepository"
import {Category} from "../../entities/Category"

class ListCategoriesUseCase{
  constructor(private categoriesRepository: ICategoriesRepository) {}
 
   async execute(): Promise<Category[]> {
   const categories = await this.categoriesRepository.list()

    return categories

  }

}

export { ListCategoriesUseCase } 