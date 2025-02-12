export default interface StandardError extends Error {
  status: number;
}

export interface ErrorData {
  details?: unknown;
  message?: string;
}
