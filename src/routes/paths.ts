export const ROUTE_PATHS = {
  dashboard: '/',
  students: '/students',
  courses: '/courses',
  enrollments: '/enrollments',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
