import { User } from "../entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDabatabase extends BaseDatabase{

    public async createUser(user: User): Promise<void>{
        try{
            await BaseDatabase.connection('user')
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            });
        }

        catch(error){
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findUserByEmail(email: string): Promise<User>{
        try{
            const user = await BaseDatabase.connection('user')
            .select('*')
            .where({email})

            return user[0] && User.toUserModel(user[0])  
        }
        catch(error){
          throw new Error(error.sqlMessage || error.message)
        }
    }
    
    public async getUserbyId(id: string): Promise<User>{
        try{
            const user = await BaseDatabase.connection('user')
            .select('id','name','email')
            .where({id})

            return user[0] && User.toUserModel(user[0])  
        }
        catch(error){
          throw new Error(error.sqlMessage || error.message)
        }
    }

}