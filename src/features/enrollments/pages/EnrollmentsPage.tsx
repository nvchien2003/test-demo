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
    addToast(result.ok ? 'Student registered.' : result.error.message, result.ok ? 'success' : 'error');
  };

  const confirmCancel = () => {
    if (enrollmentToCancel === undefined) {
      return;
    }

    const result = cancelEnrollment(enrollmentToCancel);
    addToast(result.ok ? 'Registration cancelled.' : result.error.message, result.ok ? 'success' : 'error');
    setEnrollmentToCancel(undefined);
  };

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Enrollments</h1>
        <p className="mt-1 text-sm text-slate-600">Register students while enforcing capacity and status rules.</p>
      </div>
      <Panel title="Register student">
        <EnrollmentForm students={students} courses={courses} onSubmit={handleSubmit} />
      </Panel>
      <Panel title="Active registrations">
        <EnrollmentList rows={rows} onCancel={setEnrollmentToCancel} />
      </Panel>
      <ConfirmModal
        isOpen={enrollmentToCancel !== undefined}
        title="Cancel registration?"
        message="This removes the student from the course and immediately frees a slot."
        confirmLabel="Cancel registration"
        onCancel={() => setEnrollmentToCancel(undefined)}
        onConfirm={confirmCancel}
      />
    </div>
  );
};
