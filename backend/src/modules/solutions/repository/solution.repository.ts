import { PoolClient } from "pg";
import { pool } from "../../../config/database";
import { AppError } from "../../../shared/errors/AppError";
import { CreateSolutionInput, Solution, UpdateSolutionInput } from "../types/solutions.types";

export class SolutionRepository {
  async create(data: CreateSolutionInput, problemId: string, userId: string): Promise<Solution> {
    const sql = `INSERT INTO solutions(
        problem_id,user_id,content)
        values($1,$2,$3)
        RETURNING *
        `;
    const values = [problemId, userId, data.content];

    const result = await pool.query(sql, values);
    if (!result.rows[0]) {
      throw new AppError("Failed to create solution", 500);
    }
    return result.rows[0];
  }

  async findById(id: string): Promise<Solution | null> {
    const sql = `SELECT * FROM solutions where id= $1`;
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async findByProblemId(problemId: string): Promise<Solution[]> {
    const sql = `SELECT * FROM solutions where problem_id =$1 ORDER BY created_at DESC`;
    const values = [problemId];
    const result = await pool.query(sql, values);
    return result.rows;
  }

  async update(data: UpdateSolutionInput, id: string): Promise<Solution | null> {
    const sql = `UPDATE solutions SET content=$1,updated_at = NOW() WHERE id =$2 RETURNING *`;
    const values = [data.content, id];
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }
  async remove(id: string): Promise<Solution | null> {
    const sql = `UPDATE solutions SET status = 'REMOVED', updated_at = NOW() WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async accept(solutionId: string, client: PoolClient): Promise<Solution | null>{
    const sql = ` UPDATE solutions SET status = 'ACCEPTED',
                  accepted_at = NOW(),
                    updated_at = NOW()
                    WHERE id = $1
                    AND status = 'ACTIVE'
                    RETURNING *;

    `;
    const values =[solutionId];
    const result = await client.query(sql,values);
    return result.rows[0]||null
  }
  
}
