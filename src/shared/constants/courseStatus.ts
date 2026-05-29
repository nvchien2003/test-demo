export const COURSE_STATUSES = ['OPEN', 'CLOSED', 'FULL'] as const;

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  OPEN: 'Đang mở',
  CLOSED: 'Đã đóng',
  FULL: 'Đã đầy',
};

export type CourseStatus = (typeof COURSE_STATUSES)[number];
