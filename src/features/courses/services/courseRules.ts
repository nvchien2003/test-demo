import type { Course, Enrollment, Result } from '../../../shared/types/domain';
import { failure, success } from '../../../shared/utils/result';

export const getEnrolledCount = (courseId: string, enrollments: Enrollment[]): number =>
  enrollments.filter((enrollment) => enrollment.courseId === courseId).length;

export const normalizeCourse = (course: Course): Course => {
  if (course.status === 'CLOSED') {
    return course;
  }

  return {
    ...course,
    status: course.enrolledCount >= course.maxStudents ? 'FULL' : 'OPEN',
  };
};

export const reconcileCourses = (courses: Course[], enrollments: Enrollment[]): Course[] =>
  courses.map((course) =>
    normalizeCourse({
      ...course,
      enrolledCount: getEnrolledCount(course.id, enrollments),
    }),
  );

export const validateCourseCapacity = (course: Course): Result<Course> => {
  if (course.maxStudents < 1) {
    return failure('INVALID_CAPACITY', 'Course capacity must be at least 1.');
  }

  if (course.maxStudents < course.enrolledCount) {
    return failure('INVALID_CAPACITY', 'Capacity cannot be lower than current enrollments.');
  }

  return success(course);
};

export const getAvailableSlots = (course: Course): number =>
  Math.max(course.maxStudents - course.enrolledCount, 0);
