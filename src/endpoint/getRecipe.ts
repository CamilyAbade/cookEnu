import { Request, Response } from "express";
import { RecipeDabatabase } from "../data/RecipeDatabase";

export async function getRecipe(res: any, req: any ){
    try{
        const token = req.req.headers.authorization
        const idRecipe = req.req.params.id
        
        if(!token){
            res.res.status(422).send("Você precisa estar logado!")
        }

        const recipeDatabase = new RecipeDabatabase();
        let recipe = await recipeDatabase.getRecipebyId(idRecipe);
        res.res.status(200).send(recipe)
    }
    catch(error){
        res.res.status(400).send(error.message)
    }
}