import { Request, Response } from "express";
import { UserDabatabase } from "../data/UserDatabase";
import { Athenticator } from "../services/Authenticator";

export async function getProfile(res: any, req: any ){
    try{
        const token = req.req.headers.authorization
        const idUser = req.req.params.id
        
        if(!token){
            res.res.status(422).send("Você precisa estar logado!")
        }

        const userDatabase = new UserDabatabase();
        let user = await userDatabase.getUserbyId(idUser);
        res.res.status(200).send(user)
    }
    catch(error){
        res.res.status(400).send(error.message)
    }
}