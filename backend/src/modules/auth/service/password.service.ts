 import bcrypt from "bcrypt"
 const saltRounds = 10;
 export class PasswordService{
    async hash(Password:string): Promise<string>{
        return await bcrypt.hash(Password,saltRounds)
       
    }
    async compare(plainPassword:string,hash:string):Promise<boolean>{
         return await bcrypt.compare(plainPassword,hash)

    }
 }