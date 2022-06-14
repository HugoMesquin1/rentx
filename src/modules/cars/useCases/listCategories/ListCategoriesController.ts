import { Request, Response } from "Express"
import { ListCategoriesUseCase} from "./ListCategoriesUseCase"

class ListCategoriesController {
  constructor(private ListCategoriesUseCase: ListCategoriesUseCase) {}
  
   async handle(request: Request, response: Response): Promise<Response> {
     const all = this.ListCategoriesUseCase.execute()

    return response.json(all)
  }

}

export {ListCategoriesController}