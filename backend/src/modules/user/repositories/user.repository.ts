import { pool } from "../../../config/database";
import { AppError } from "../../../shared/errors/AppError";
import { CreateUserInput, UpdateUserInput, User } from "../types/user.types";

export class UserRepository {
  async create(user: CreateUserInput) :Promise<User>{
    const sql = `INSERT INTO users(
       username,email,password_hash,avatar_url,bio)
        values($1,$2,$3, $4,$5 )
        RETURNING *;
       `;
        const values = [user.username,user.email,user.password_hash,user.avatar_url??null,user.bio??null]
       
       const result = await pool.query (sql,values)
        if (!result.rows[0]) {
          throw new AppError("Failed to create user", 500);
        }
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
  
  async updateProfile(
  id: string,
  data: UpdateUserInput,
): Promise<User> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (data.username !== undefined) {
    updates.push(`username = $${values.length + 1}`);
    values.push(data.username);
  }

  if (data.bio !== undefined) {
    updates.push(`bio = $${values.length + 1}`);
    values.push(data.bio);
  }

  if (data.avatarUrl !== undefined) {
    updates.push(`avatar_url = $${values.length + 1}`);
    values.push(data.avatarUrl);
  }

  if (updates.length === 0) {
    throw new AppError("No fields provided for update", 400);
  }

  values.push(id);

  const sql = `
    UPDATE users
    SET
      ${updates.join(", ")},
      updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *;
  `;

  const result = await pool.query<User>(sql, values);

  if (!result.rows[0]) {
    throw new AppError("User not found", 404);
  }

  return result.rows[0];
}
  
}
// findBYEmail(){}
  // findById(){}
  // update(){}
  // delete(){}