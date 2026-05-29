import { create } from 'zustand';
import { fakeCourses, fakeEnrollments, fakeStudents } from '../../shared/data/fakeDatabase';
import type { Course, Enrollment, Result, Student } from '../../shared/types/domain';
import type {
  CourseFormValues,
  EnrollmentFormValues,
  StudentFormValues,
} from '../../shared/validations/domainSchemas';
import { createId } from '../../shared/utils/id';
import { todayIso } from '../../shared/utils/date';
import { failure, success } from '../../shared/utils/result';
import { getDashboardStats } from '../../features/dashboard/services/dashboardService';
import { normalizeCourse, reconcileCourses, validateCourseCapacity } from '../../features/courses/services/courseRules';
import {
  removeEnrollmentsByCourse,
  removeEnrollmentsByStudent,
  validateEnrollmentInput,
} from '../../features/enrollments/services/enrollmentRules';
import * as studentService from '../../features/students/services/student.service';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface AppState {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (toastId: string) => void;
  createStudent: (values: StudentFormValues) => Promise<Result<Student>>;
  updateStudent: (studentId: string, values: StudentFormValues) => Promise<Result<Student>>;
  deleteStudent: (studentId: string) => Promise<Result<string>>;
  createCourse: (values: CourseFormValues) => Result<Course>;
  updateCourse: (courseId: string, values: CourseFormValues) => Result<Course>;
  deleteCourse: (courseId: string) => Result<string>;
  createEnrollment: (values: EnrollmentFormValues) => Result<Enrollment>;
  cancelEnrollment: (enrollmentId: string) => Result<string>;
}

const initialEnrollments = fakeEnrollments;
const initialCourses = reconcileCourses(fakeCourses, initialEnrollments);

export const useAppStore = create<AppState>((set, get) => ({
  students: fakeStudents,
  courses: initialCourses,
  enrollments: initialEnrollments,
  toasts: [],
  addToast: (message, type = 'success') => {
    const toast: ToastMessage = { id: createId('toast'), message, type };
    set((state) => ({ toasts: [...state.toasts, toast] }));
    window.setTimeout(() => get().dismissToast(toast.id), 3500);
  },
  dismissToast: (toastId) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== toastId) })),
  createStudent: async (values) => {
    const result = await studentService.createStudent(values);
    if (!result.ok) {
      return result;
    }

    set((current) => ({ students: [...current.students, result.value] }));
    return result;
  },
  updateStudent: async (studentId, values) => {
    const result = await studentService.updateStudent(studentId, values);
    if (!result.ok) {
      return result;
    }

    set((current) => ({
      students: current.students.map((student) => (student.id === studentId ? result.value : student)),
    }));
    return result;
  },
  deleteStudent: async (studentId) => {
    const state = get();
    const result = await studentService.deleteStudent(studentId);
    if (!result.ok) {
      return result;
    }

    const enrollments = removeEnrollmentsByStudent(studentId, state.enrollments);
    const courses = reconcileCourses(state.courses, enrollments);
    set((current) => ({
      students: current.students.filter((student) => student.id !== studentId),
      enrollments,
      courses,
    }));
    return result;
  },
  createCourse: (values) => {
    const course: Course = normalizeCourse({
      id: createId('crs'),
      name: values.name,
      description: values.description,
      maxStudents: values.maxStudents,
      enrolledCount: 0,
      status: values.status,
    });

    const capacityResult = validateCourseCapacity(course);
    if (!capacityResult.ok) {
      return capacityResult;
    }

    set((state) => ({ courses: [...state.courses, course] }));
    return success(course);
  },
  updateCourse: (courseId, values) => {
    const state = get();
    const existingCourse = state.courses.find((course) => course.id === courseId);
    if (existingCourse === undefined) {
      return failure('INVALID_COURSE', 'Course was not found.');
    }

    const candidate = normalizeCourse({
      ...existingCourse,
      name: values.name,
      description: values.description,
      maxStudents: values.maxStudents,
      status: values.status,
    });
    const capacityResult = validateCourseCapacity(candidate);
    if (!capacityResult.ok) {
      return capacityResult;
    }

    set((current) => ({
      courses: current.courses.map((course) => (course.id === courseId ? candidate : course)),
    }));
    return success(candidate);
  },
  deleteCourse: (courseId) => {
    const state = get();
    const exists = state.courses.some((course) => course.id === courseId);
    if (!exists) {
      return failure('INVALID_COURSE', 'Course was not found.');
    }

    const enrollments = removeEnrollmentsByCourse(courseId, state.enrollments);
    set((current) => ({
      courses: current.courses.filter((course) => course.id !== courseId),
      enrollments,
    }));
    return success(courseId);
  },
  createEnrollment: (values) => {
    const state = get();
    const validation = validateEnrollmentInput(values, state.students, state.courses, state.enrollments);
    if (!validation.ok) {
      return validation;
    }

    const enrollment: Enrollment = {
      id: createId('enr'),
      studentId: values.studentId,
      courseId: values.courseId,
      enrolledAt: todayIso(),
    };

    const enrollments = [...state.enrollments, enrollment];
    const courses = reconcileCourses(state.courses, enrollments);
    set({ enrollments, courses });
    return success(enrollment);
  },
  cancelEnrollment: (enrollmentId) => {
    const state = get();
    const exists = state.enrollments.some((enrollment) => enrollment.id === enrollmentId);
    if (!exists) {
      return failure('INVALID_COURSE', 'Registration was not found.');
    }

    const enrollments = state.enrollments.filter((enrollment) => enrollment.id !== enrollmentId);
    const courses = reconcileCourses(state.courses, enrollments);
    set({ enrollments, courses });
    return success(enrollmentId);
  },
}));

export const selectDashboardStats = (state: AppState) =>
  getDashboardStats(state.students, state.courses, state.enrollments);
