import { PoolClient } from "pg";
import { pool } from "../../../config/database";
import { AppError } from "../../../shared/errors/AppError";
import { CreateProblemInput, Problem, UpdateProblemInput } from "../problems.types";

export class ProblemRepository {
  async create(data: CreateProblemInput, user_id: string): Promise<Problem> {
    const sql = `INSERT INTO problems(
        title,description,user_id)
        values ($1,$2,$3)
         RETURNING *
        `;
    const values = [data.title, data.description, user_id];
    const result = await pool.query(sql, values);
    if (!result.rows[0]) {
      throw new AppError("Failed to create problem", 500);
    }
    return result.rows[0];
  }

  //Find All Problems list of owner
  async findAllProblems(): Promise<Problem[]> {
    const sql = `SELECT * from problems ORDER BY created_at DESC`;
    const result = await pool.query(sql);
    return result.rows;
  }

  //find specific problem by problem id
  async findById(id: string):Promise<Problem | null> {
    const sql = `SELECT * from problems where id = $1 `;
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async update(data: UpdateProblemInput, id: string): Promise<Problem> {
    const updates = [];
    const values = [];
    if (data.title !== undefined) {
      updates.push(`title =$${values.length + 1}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push(`description =$${values.length + 1}`);
      values.push(data.description);
    }
    if (updates.length === 0) {
  throw new AppError("No fields provided for update", 400);
}
    values.push(id);
    const sql = `UPDATE problems SET ${updates.join(", ")}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`;

    const result = await pool.query(sql, values);

    if (!result.rows[0]) {
      throw new AppError("Problem not found", 404);
    }

    return result.rows[0];
  }

  async delete(id: string) {
    const sql = `DELETE FROM problems WHERE id = $1 RETURNING *`;
    const values = [id];
   const result= await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async markSolved(
  problemId: string,
  client: PoolClient
): Promise<Problem | null> {
  
  const sql = ` UPDATE problems SET STATUS = 'SOLVED',
                updated_at = NOW() WHERE id = $1
                  RETURNING *`;
  const values = [problemId]

  const result = await client.query(sql,values);
  return result.rows[0]|| null;
}
}
