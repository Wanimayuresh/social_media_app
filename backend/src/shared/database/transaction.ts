import { PoolClient } from "pg";

import { pool } from "../../config/database";

 export async function withTransaction<T>(callback:(client:PoolClient)=>Promise<T>):Promise<T>{
    const databaseConnection = await pool.connect(); 
    try {
        await databaseConnection.query("BEGIN")
        const result = await callback(databaseConnection)
        await databaseConnection.query("COMMIT")
        return result
    } catch (error) {
         await databaseConnection.query('ROLLBACK');
  throw error;
    }finally{
         databaseConnection.release();
    }
 }
