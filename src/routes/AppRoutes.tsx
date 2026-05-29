import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../features/dashboard';
import { StudentsPage } from '../features/students';
import { CoursesPage } from '../features/courses';
import { EnrollmentsPage } from '../features/enrollments';
import { AppLayout } from '../app/layout/AppLayout';
import { ROUTE_PATHS } from './paths';

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path={ROUTE_PATHS.dashboard} element={<DashboardPage />} />
      <Route path={ROUTE_PATHS.students} element={<StudentsPage />} />
      <Route path={ROUTE_PATHS.courses} element={<CoursesPage />} />
      <Route path={ROUTE_PATHS.enrollments} element={<EnrollmentsPage />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.dashboard} replace />} />
    </Route>
  </Routes>
);
