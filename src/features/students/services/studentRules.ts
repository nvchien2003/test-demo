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
    return failure('DUPLICATE_EMAIL', 'A student with this email already exists.');
  }

  return success(normalizedEmail);
};
