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
    return failure('INVALID_STUDENT', 'Select a valid student before registering.');
  }

  const course = courses.find((item) => item.id === input.courseId);
  if (course === undefined) {
    return failure('INVALID_COURSE', 'Select a valid course before registering.');
  }

  const duplicate = enrollments.some(
    (enrollment) => enrollment.studentId === input.studentId && enrollment.courseId === input.courseId,
  );
  if (duplicate) {
    return failure('DUPLICATE_ENROLLMENT', 'This student is already registered for the selected course.');
  }

  if (course.status === 'CLOSED') {
    return failure('COURSE_CLOSED', 'Closed courses cannot accept registrations.');
  }

  if (course.status === 'FULL' || course.enrolledCount >= course.maxStudents) {
    return failure('COURSE_FULL', 'This course is full.');
  }

  return success(input);
};

export const removeEnrollmentsByStudent = (studentId: string, enrollments: Enrollment[]): Enrollment[] =>
  enrollments.filter((enrollment) => enrollment.studentId !== studentId);

export const removeEnrollmentsByCourse = (courseId: string, enrollments: Enrollment[]): Enrollment[] =>
  enrollments.filter((enrollment) => enrollment.courseId !== courseId);
