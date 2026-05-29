export const COURSE_STATUSES = ['OPEN', 'CLOSED', 'FULL'] as const;

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  FULL: 'Full',
};

export type CourseStatus = (typeof COURSE_STATUSES)[number];
