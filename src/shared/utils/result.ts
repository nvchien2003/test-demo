import type { AppError, AppErrorCode, Result } from '../types/domain';

export const success = <T>(value: T): Result<T> => ({ ok: true, value });

export const failure = <T>(code: AppErrorCode, message: string): Result<T> => ({
  ok: false,
  error: { code, message },
});

export const getResultMessage = <T>(result: Result<T>): string =>
  result.ok ? 'Đã lưu thành công.' : result.error.message;

export const toError = (code: AppErrorCode, message: string): AppError => ({ code, message });
