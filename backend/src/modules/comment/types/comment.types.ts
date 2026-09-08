type CommentStatus = "ACTIVE" | "REMOVED";

export interface Comment {
  id: string;

  user_id: string;

  problem_id: string | null;

  solution_id: string | null;

  parent_comment_id: string | null;

  content: string;

  status: CommentStatus;

  created_at: string;

  updated_at: string;
}

export interface CreateCommentInput {
  content: string;
  parent_comment_id?: string;
}
export interface UpdateCommentInput {
  content?: string;
  
}