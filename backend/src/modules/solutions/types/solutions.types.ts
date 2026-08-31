type SolutionStatus = "ACTIVE" | "REMOVED" | "ACCEPTED";
export interface Solution {
  id: string;
  problem_id: string;
  user_id: string;
  content: string;
  status: SolutionStatus;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSolutionInput {
  content: string;
}
export interface UpdateSolutionInput {
  content?: string;
}
