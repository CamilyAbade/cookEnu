import { Request, Response } from "express";
import { UserDabatabase } from "../data/UserDatabase";
import { User, USER_ROLE } from "../entities/User";
import { Athenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export async  function signup (req: Request, res: Response){
    try{
        const {name, email, password, role} = req.body
        if(!name || !email || !password || !role){
            res.status(422).send(`Insira corretamente nas informações`)
        }
        const userDatabase = new UserDabatabase();
        const user = await userDatabase.findUserByEmail(email);
        if(user){
            res.status(409).send(`Email já cadastrado!`)
        }

        const idGenerator = new IdGenerator();
        const id =  idGenerator.generate();
        
        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password)

        //criar novo usuario

        const newUser = new User(id, name, email, hashPassword, role)
        await userDatabase.createUser(newUser);

        // gera o token

        const authenticator =  new Athenticator();
        const token  = authenticator.generate({
            id,
            role
        })

        res.status(200).send({message: 'Usuário criado com sucesso!', token})
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}