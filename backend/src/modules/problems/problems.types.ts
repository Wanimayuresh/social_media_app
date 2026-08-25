export type ProblemStatus = "OPEN" | "SOLVED";

export interface Problem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: ProblemStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProblemInput {
  title: string;
  description: string;
}

export interface UpdateProblemInput {
  title?: string;
  description?: string;
}

export interface ProblemResponse {
  id: string;
  title: string;
  description: string;
  status: ProblemStatus;
  createdAt: Date;
  updatedAt: Date;
}