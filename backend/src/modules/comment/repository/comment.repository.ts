import { pool } from "../../../config/database";
import { AppError } from "../../../shared/errors/AppError";
import { Comment, CreateCommentInput, UpdateCommentInput } from "../types/comment.types";

export class CommentRepository {
  async create(
    data: CreateCommentInput,
    userId: string,
    problemId: string | null,
    solutionId: string | null,
  ): Promise<Comment> {
    const sql = `INSERT INTO comments(
      content,
      parent_comment_id,
      user_id,
      problem_id,
      solution_id
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

    const values = [data.content, data.parent_comment_id ?? null, userId, problemId, solutionId];

    const result = await pool.query(sql, values);

    return result.rows[0];
  }

  async findById(id: string): Promise<Comment | null> {
    const sql = `SELECT * from comments WHERE id = $1`;
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0] || null;
  }

  async findTopLevelByProblemId(problemId: string): Promise<Comment[]> {
    const sql = `SELECT * from comments WHERE problem_id = $1 AND parent_comment_id IS NULL AND status = 'ACTIVE' ORDER BY created_at DESC`;
    const values = [problemId];
    const result = await pool.query(sql, values);
    return result.rows;
  }

  async findTopLevelBySolutionId(solutionId: string): Promise<Comment[]> {
    const sql = `SELECT * from comments WHERE solution_id = $1 AND parent_comment_id IS NULL AND status = 'ACTIVE' ORDER BY created_at DESC`;
    const values = [solutionId];
    const result = await pool.query(sql, values);
    return result.rows;
  }

  async findRepliesByParentId(parentCommentId: string): Promise<Comment[]> {
    const sql = `SELECT * from comments WHERE parent_comment_id= $1 AND status ='ACTIVE' ORDER BY created_at ASC`;
    const values = [parentCommentId];
    const result = await pool.query(sql, values);
    return result.rows;
  }

  async update(data: UpdateCommentInput, commentId: string): Promise<Comment | null> {
    const updates = [];
    const values = [];
    if (data.content !== undefined) {
      updates.push(`content =$${values.length + 1}`);
      values.push(data.content);
    }
    if (updates.length === 0) {
      throw new AppError("No fields provided for update", 400);
    }
    values.push(commentId);
    const sql = `UPDATE comments SET ${updates.join(", ")}, updated_at= NOW() WHERE id =$${values.length} RETURNING *`;
    const result = await pool.query(sql, values);

    if (!result.rows[0]) {
     return null
    }

    return result.rows[0];
  }

  async remove(commentId: string): Promise<Comment | null>{
    const sql = `UPDATE comments SET status = 'REMOVED',updated_at = NOW() WHERE id = $1 RETURNING *`;
    const values = [commentId];
    const result = await pool.query(sql,values);
      if (!result.rows[0]) {
     return null
    }
    return result.rows[0];
  }
}
