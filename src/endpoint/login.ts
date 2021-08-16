import { Request, Response } from "express";
import { UserDabatabase } from "../data/UserDatabase";
import { User } from "../entities/User";
import { Athenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export async  function login (req: Request, res: Response){
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.status(422).send(`Insira corretamente as informações`)
        }
        const userDatabase = new UserDabatabase();
        const user = await userDatabase.findUserByEmail(email);
        if(!user){
            res.status(409).send(`Email inválido!`)
        }

        const hashManager = new HashManager();
        const passwordCorrect = hashManager.compare(password, user.getPassword())

        if(!passwordCorrect){
            res.status(401).send('Email ou senha incorretos')
        }

        // gera o token
        const authenticator =  new Athenticator();
        const token  = authenticator.generate({id: user.getId(), role: user.getRole()})

        res.status(200).send({message: 'Usuário logado com sucesso!', token})
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}