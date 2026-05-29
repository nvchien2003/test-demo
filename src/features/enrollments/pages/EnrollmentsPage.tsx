import { useState } from 'react';
import { ConfirmModal, Panel } from '../../../shared/components/Modal';
import { useAppStore } from '../store';
import { EnrollmentForm } from '../components/EnrollmentForm';
import { EnrollmentList } from '../components/EnrollmentList';
import { useEnrollmentRows } from '../hooks/useEnrollmentRows';
import type { EnrollmentFormValues } from '../validations';

export const EnrollmentsPage = () => {
  const students = useAppStore((state) => state.students);
  const courses = useAppStore((state) => state.courses);
  const enrollments = useAppStore((state) => state.enrollments);
  const createEnrollment = useAppStore((state) => state.createEnrollment);
  const cancelEnrollment = useAppStore((state) => state.cancelEnrollment);
  const addToast = useAppStore((state) => state.addToast);
  const [enrollmentToCancel, setEnrollmentToCancel] = useState<string | undefined>(undefined);
  const rows = useEnrollmentRows(enrollments, students, courses);

  const handleSubmit = (values: EnrollmentFormValues) => {
    const result = createEnrollment(values);
    addToast(result.ok ? 'Đã ghi danh học viên.' : result.error.message, result.ok ? 'success' : 'error');
  };

  const confirmCancel = () => {
    if (enrollmentToCancel === undefined) {
      return;
    }

    const result = cancelEnrollment(enrollmentToCancel);
    addToast(result.ok ? 'Đã hủy lượt ghi danh.' : result.error.message, result.ok ? 'success' : 'error');
    setEnrollmentToCancel(undefined);
  };

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Ghi danh</h1>
        <p className="mt-1 text-sm text-slate-600">Ghi danh học viên theo đúng quy định về sức chứa và trạng thái khóa học.</p>
      </div>
      <Panel title="Ghi danh học viên">
        <EnrollmentForm students={students} courses={courses} onSubmit={handleSubmit} />
      </Panel>
      <Panel title="Lượt ghi danh đang hoạt động">
        <EnrollmentList rows={rows} onCancel={setEnrollmentToCancel} />
      </Panel>
      <ConfirmModal
        isOpen={enrollmentToCancel !== undefined}
        title="Hủy lượt ghi danh?"
        message="Thao tác này sẽ xóa học viên khỏi khóa học và giải phóng một chỗ trống ngay lập tức."
        confirmLabel="Hủy ghi danh"
        onCancel={() => setEnrollmentToCancel(undefined)}
        onConfirm={confirmCancel}
      />
    </div>
  );
};
