import * as jwt from "jsonwebtoken"
import { User, USER_ROLE } from "../entities/User";

export interface AuthenticatorData{
    id: string,
    role: USER_ROLE
}

export class Athenticator {
    public generate(input: AuthenticatorData): string{
        const token =  jwt.sign(input, process.env.DB_JWT_KEY as string, {
            expiresIn: process.env.DB_EXPIRES
        })
        return token;
    }

    public getTokenData(token: string): AuthenticatorData{
        const data = jwt.verify(token, process.env.DB_JWT_KEY as string)
        return data as AuthenticatorData 
    }
}