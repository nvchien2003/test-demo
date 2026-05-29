import { DialogModal } from '../../../shared/components/Modal';
import type { Student } from '../types';
import type { StudentFormValues } from '../validations';
import { StudentForm } from './StudentForm';

interface StudentModalProps {
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => Promise<void>;
}

export const StudentModal = ({ student, isOpen, onClose, onSubmit }: StudentModalProps) => (
  <DialogModal
    isOpen={isOpen}
    title={student === undefined ? 'Tạo học viên' : 'Chỉnh sửa học viên'}
    onClose={onClose}
  >
    <StudentForm student={student} onSubmit={onSubmit} onCancel={onClose} />
  </DialogModal>
);
