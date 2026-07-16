export const MESSAGES = {
  SERVER_HEALTHY: "Server is healthy",
  INTERNAL_SERVER_ERROR: "Internal server error",
  routeNotFound: (method: string, path: string): string => `Route not found: ${method} ${path}`,
} as const;
