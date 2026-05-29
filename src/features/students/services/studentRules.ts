import type { Result, Student } from '../../../shared/types/domain';
import { failure, success } from '../../../shared/utils/result';

export const validateUniqueStudentEmail = (
  email: string,
  students: Student[],
  editingStudentId?: string,
): Result<string> => {
  const normalizedEmail = email.trim().toLowerCase();
  const duplicate = students.some(
    (student) => student.email.toLowerCase() === normalizedEmail && student.id !== editingStudentId,
  );

  if (duplicate) {
    return failure('DUPLICATE_EMAIL', 'Email này đã được dùng cho một học viên khác.');
  }

  return success(normalizedEmail);
};
