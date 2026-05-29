import { COURSE_STATUS_LABELS, type CourseStatus } from '../constants/courseStatus';

const statusClasses: Record<CourseStatus, string> = {
  OPEN: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-700 ring-slate-300',
  FULL: 'bg-amber-50 text-amber-800 ring-amber-200',
};

export const StatusBadge = ({ status }: { status: CourseStatus }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[status]}`}>
    {COURSE_STATUS_LABELS[status]}
  </span>
);
