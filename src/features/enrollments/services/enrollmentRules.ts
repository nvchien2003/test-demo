import type { Course, Enrollment, Result, Student } from '../../../shared/types/domain';
import { failure, success } from '../../../shared/utils/result';

interface EnrollmentInput {
  studentId: string;
  courseId: string;
}

export const validateEnrollmentInput = (
  input: EnrollmentInput,
  students: Student[],
  courses: Course[],
  enrollments: Enrollment[],
): Result<EnrollmentInput> => {
  const studentExists = students.some((student) => student.id === input.studentId);
  if (!studentExists) {
    return failure('INVALID_STUDENT', 'Vui lòng chọn học viên hợp lệ trước khi ghi danh.');
  }

  const course = courses.find((item) => item.id === input.courseId);
  if (course === undefined) {
    return failure('INVALID_COURSE', 'Vui lòng chọn khóa học hợp lệ trước khi ghi danh.');
  }

  const duplicate = enrollments.some(
    (enrollment) => enrollment.studentId === input.studentId && enrollment.courseId === input.courseId,
  );
  if (duplicate) {
    return failure('DUPLICATE_ENROLLMENT', 'Học viên này đã được ghi danh vào khóa học đã chọn.');
  }

  if (course.status === 'CLOSED') {
    return failure('COURSE_CLOSED', 'Khóa học đã đóng không thể nhận ghi danh.');
  }

  if (course.status === 'FULL' || course.enrolledCount >= course.maxStudents) {
    return failure('COURSE_FULL', 'Khóa học này đã đủ số lượng học viên.');
  }

  return success(input);
};

export const removeEnrollmentsByStudent = (studentId: string, enrollments: Enrollment[]): Enrollment[] =>
  enrollments.filter((enrollment) => enrollment.studentId !== studentId);

export const removeEnrollmentsByCourse = (courseId: string, enrollments: Enrollment[]): Enrollment[] =>
  enrollments.filter((enrollment) => enrollment.courseId !== courseId);
