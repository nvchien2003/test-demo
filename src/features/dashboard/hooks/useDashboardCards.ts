import { useMemo } from 'react';
import type { DashboardStats } from '../types';

export interface DashboardCard {
  label: string;
  value: string;
  helper: string;
}

export const useDashboardCards = (stats: DashboardStats): DashboardCard[] =>
  useMemo(
    () => [
      { label: 'Students', value: stats.totalStudents.toString(), helper: 'Active student records' },
      { label: 'Courses', value: stats.totalCourses.toString(), helper: 'Tracked course catalog' },
      { label: 'Open courses', value: stats.totalOpenCourses.toString(), helper: 'Accepting enrollment' },
      { label: 'Enrollments', value: stats.totalEnrollments.toString(), helper: 'Current registrations' },
      { label: 'Fill rate', value: `${stats.fillRate}%`, helper: 'Used seats across capacity' },
    ],
    [stats],
  );
