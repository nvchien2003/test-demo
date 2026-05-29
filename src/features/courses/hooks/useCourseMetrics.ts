import { useMemo } from 'react';
import { getAvailableSlots } from '../services/courseRules';
import type { Course } from '../types';

export interface CourseMetric {
  courseId: string;
  availableSlots: number;
  fillPercent: number;
}

export const useCourseMetrics = (courses: Course[]): CourseMetric[] =>
  useMemo(
    () =>
      courses.map((course) => ({
        courseId: course.id,
        availableSlots: getAvailableSlots(course),
        fillPercent: course.maxStudents === 0 ? 0 : Math.round((course.enrolledCount / course.maxStudents) * 100),
      })),
    [courses],
  );
