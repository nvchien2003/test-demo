import { useMemo } from 'react';
import type { Course } from '../../courses/types';
import type { Student } from '../../students/types';
import type { Enrollment } from '../types';

export interface EnrollmentRow {
  enrollment: Enrollment;
  studentName: string;
  studentEmail: string;
  courseName: string;
}

export const useEnrollmentRows = (
  enrollments: Enrollment[],
  students: Student[],
  courses: Course[],
): EnrollmentRow[] =>
  useMemo(
    () =>
      enrollments.map((enrollment) => {
        const student = students.find((item) => item.id === enrollment.studentId);
        const course = courses.find((item) => item.id === enrollment.courseId);

        return {
          enrollment,
          studentName: student?.fullName ?? 'Unknown student',
          studentEmail: student?.email ?? 'Missing record',
          courseName: course?.name ?? 'Unknown course',
        };
      }),
    [courses, enrollments, students],
  );
