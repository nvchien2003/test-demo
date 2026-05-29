import type { CourseStatus } from '../constants/courseStatus';

export type EntityId = string;

export interface Student {
  id: EntityId;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  createdAt: string;
}

export interface Course {
  id: EntityId;
  name: string;
  description: string;
  maxStudents: number;
  enrolledCount: number;
  status: CourseStatus;
}

export interface Enrollment {
  id: EntityId;
  studentId: EntityId;
  courseId: EntityId;
  enrolledAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalOpenCourses: number;
  totalEnrollments: number;
  fillRate: number;
}

export type AppErrorCode =
  | 'DUPLICATE_EMAIL'
  | 'DUPLICATE_ENROLLMENT'
  | 'INVALID_STUDENT'
  | 'INVALID_COURSE'
  | 'COURSE_CLOSED'
  | 'COURSE_FULL'
  | 'INVALID_CAPACITY';

export interface AppError {
  code: AppErrorCode;
  message: string;
}

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };
