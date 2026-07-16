import { pool } from "../../../config/database";
import { CreateUserInput, User } from "../types/user.types";

export class UserRepository {
  async create(user: CreateUserInput) :Promise<User>{
    const sql = `INSERT INTO users(
       username,email,password_hash,avatar_url,bio)
        values($1,$2,$3, $4,$5 )
        RETURNING *;
       `;
        const values = [user.username,user.email,user.password_hash,user.avatar_url??null,user.bio??null]
       
       const result = await pool.query (sql,values)
        return result.rows[0]     
  }

  async findByEmail(email:string):Promise<User |null>{
    const sql = `SELECT * from users where email = $1`
    const values = [email]
    const result  = await pool.query(sql,values)
    return result.rows[0] || null
  }

  async findById(id:string):Promise<User|null>{
    const sql = `Select * from users where id =$1`
    const values =[id]
    const result = await pool.query(sql,values)
    return result.rows[0] || null
  }

  async updatePassword(newPassword:string,userId:string){
    const sql =`UPDATE users SET password_hash= $1,updated_at = NOW()
    WHERE id=$2`
    const values = [newPassword,userId]
    await pool.query(sql,values)
  }
  
}
// findBYEmail(){}
  // findById(){}
  // update(){}
  // delete(){}