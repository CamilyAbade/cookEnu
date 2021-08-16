import { Recipe } from "../entities/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDabatabase extends BaseDatabase{

    public async createRecipe(recipe: Recipe): Promise<void>{
        try{
            await BaseDatabase.connection('recipes')
            .insert({
                id_recipe: recipe.getIdRecipe(),
                title: recipe.getTitle(),
                description: recipe.getDescription(),
                id_user: recipe.getIdUser()
            });
        }

        catch(error){
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getRecipebyId(id_recipe: string): Promise<Recipe>{
        try{
            const recipe = await BaseDatabase.connection('recipes')
            .select('id_recipe','title','description')
            .where({id_recipe})

            return recipe[0] && Recipe.toUserModel(recipe[0])  
        }
        catch(error){
          throw new Error(error.sqlMessage || error.message)
        }
    }


   

}