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
      { label: 'Học viên', value: stats.totalStudents.toString(), helper: 'Hồ sơ học viên đang quản lý' },
      { label: 'Khóa học', value: stats.totalCourses.toString(), helper: 'Danh mục khóa học đang theo dõi' },
      { label: 'Khóa đang mở', value: stats.totalOpenCourses.toString(), helper: 'Đang nhận ghi danh' },
      { label: 'Lượt ghi danh', value: stats.totalEnrollments.toString(), helper: 'Số đăng ký hiện tại' },
      { label: 'Tỷ lệ lấp đầy', value: `${stats.fillRate}%`, helper: 'Số chỗ đã dùng trên tổng sức chứa' },
    ],
    [stats],
  );
