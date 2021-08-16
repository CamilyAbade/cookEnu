import { Request, Response } from "express";
import { RecipeDabatabase } from "../data/RecipeDatabase";
import { Recipe } from "../entities/Recipe";
import { Athenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export async function postRecipe(res: any, req: any ){
    try{
        const token = req.req.headers.authorization
        
        if(!token){
            res.res.status(422).send("Você precisa estar logado!")
        }

        const authenticator = new Athenticator();
        const tokenData = authenticator.getTokenData(token as string);
        const idUser = tokenData.id

        const {title, description} = req.req.body
        if(!title || !description){
            res.status(422).send(`Insira corretamente nas informações`)
        }
        
        const idGenerator = new IdGenerator();
        const idRecipe =  idGenerator.generate();

        const recipe = new Recipe(idRecipe, title, description, idUser);

        const newRecipe = new RecipeDabatabase();
        await newRecipe.createRecipe(recipe);

        res.res.status(200).send('Deu boa!')

    }
    catch(error){
        res.res.status(400).send(error.message)
    }
}