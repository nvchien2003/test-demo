import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/StateView';
import { formatDate } from '../../../shared/utils/date';
import type { EnrollmentRow } from '../hooks/useEnrollmentRows';

interface EnrollmentListProps {
  rows: EnrollmentRow[];
  onCancel: (enrollmentId: string) => void;
}

export const EnrollmentList = ({ rows, onCancel }: EnrollmentListProps) => {
  if (rows.length === 0) {
    return <EmptyState title="No registrations" message="Register a student to a course to replace spreadsheet tracking." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="border-b border-line px-3 py-3">Student</th>
            <th className="border-b border-line px-3 py-3">Course</th>
            <th className="border-b border-line px-3 py-3">Registered</th>
            <th className="border-b border-line px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.enrollment.id}>
              <td className="border-b border-line px-3 py-3">
                <div className="font-medium text-ink">{row.studentName}</div>
                <div className="text-slate-500">{row.studentEmail}</div>
              </td>
              <td className="border-b border-line px-3 py-3 text-slate-700">{row.courseName}</td>
              <td className="border-b border-line px-3 py-3 text-slate-700">{formatDate(row.enrollment.enrolledAt)}</td>
              <td className="border-b border-line px-3 py-3 text-right">
                <Button type="button" variant="ghost" onClick={() => onCancel(row.enrollment.id)}>
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
