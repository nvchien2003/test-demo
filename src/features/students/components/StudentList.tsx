import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/StateView';
import { formatDate } from '../../../shared/utils/date';
import type { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const StudentList = ({ students, onEdit, onDelete }: StudentListProps) => {
  if (students.length === 0) {
    return <EmptyState title="No students found" message="Create a student or adjust the search filters." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="border-b border-line px-3 py-3">Student</th>
            <th className="border-b border-line px-3 py-3">Phone</th>
            <th className="border-b border-line px-3 py-3">Address</th>
            <th className="border-b border-line px-3 py-3">DOB</th>
            <th className="border-b border-line px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-line">
              <td className="border-b border-line px-3 py-3">
                <div className="font-medium text-ink">{student.fullName}</div>
                <div className="text-slate-500">{student.email}</div>
              </td>
              <td className="border-b border-line px-3 py-3 text-slate-700">{student.phone}</td>
              <td className="border-b border-line px-3 py-3 text-slate-700">{student.address}</td>
              <td className="border-b border-line px-3 py-3 text-slate-700">{formatDate(student.dob)}</td>
              <td className="border-b border-line px-3 py-3">
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => onDelete(student)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
