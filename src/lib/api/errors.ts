export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const parseApiError = (error: unknown) => {
  if (typeof error === 'string') return new ApiError(error);
  if (error instanceof ApiError) return error;
  if (typeof error === 'object' && error && 'response' in error) {
    const err = error as { response?: { status?: number; data?: { message?: string } } };
    return new ApiError(err.response?.data?.message ?? 'Unexpected error', err.response?.status);
  }
  return new ApiError('Unexpected error');
};
