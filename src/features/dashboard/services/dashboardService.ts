import type { Course, DashboardStats, Enrollment, Student } from '../../../shared/types/domain';

export const getDashboardStats = (
  students: Student[],
  courses: Course[],
  enrollments: Enrollment[],
): DashboardStats => {
  const totalCapacity = courses.reduce((total, course) => total + course.maxStudents, 0);
  const fillRate = totalCapacity === 0 ? 0 : Math.round((enrollments.length / totalCapacity) * 100);

  return {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalOpenCourses: courses.filter((course) => course.status === 'OPEN').length,
    totalEnrollments: enrollments.length,
    fillRate,
  };
};
