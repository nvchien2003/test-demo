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
    return <EmptyState title="Không tìm thấy học viên" message="Hãy tạo học viên mới hoặc điều chỉnh bộ lọc tìm kiếm." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="border-b border-line px-3 py-3">Học viên</th>
            <th className="border-b border-line px-3 py-3">Số điện thoại</th>
            <th className="border-b border-line px-3 py-3">Địa chỉ</th>
            <th className="border-b border-line px-3 py-3">Ngày sinh</th>
            <th className="border-b border-line px-3 py-3 text-right">Thao tác</th>
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
                    Sửa
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => onDelete(student)}>
                    Xóa
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
