import { pool } from "../../../config/database";
import { CreateRefreshToken, RefreshToken } from "../types/refresh-token.types";

export class RefreshTokenRepository{
    async create(data:CreateRefreshToken):Promise<RefreshToken>{
        const sql = `INSERT into refresh_tokens( user_id ,refresh_token_hash,expires_at) values($1,$2,$3) RETURNING *`
        const values = [data.userId,data.refreshTokenHash,data.expiresAt]
        const result = await pool.query(sql,values)
        return result.rows[0]
    }
    async findByHash(hash:string) :Promise<RefreshToken|null>{
        const sql = `Select * from refresh_tokens where refresh_token_hash = $1 `
        const values = [hash]
        const result =await pool.query(sql,values)
        return result.rows[0] || null
    }

    async delete (id:string):Promise<void>{// Id is session_id for delete
        const sql = `DELETE FROM refresh_tokens WHERE id = $1 `
        const values =[id];
         await pool.query(sql,values)
    }

    async deleteByUserId(userId:string):Promise<void>{
        const sql = `Delete From refresh_tokens WHERE user_id =$1`;
        const values =[userId]
         await pool.query(sql,values)
    }
}