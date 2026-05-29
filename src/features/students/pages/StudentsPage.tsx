import { useCallback, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { ConfirmModal, Panel } from '../../../shared/components/Modal';
import { TextField } from '../../../shared/components/Field';
import { useAppStore } from '../store';
import type { Student } from '../types';
import type { StudentFormValues } from '../validations';
import { useFilteredStudents } from '../hooks/useFilteredStudents';
import { useStudentModal } from '../hooks/useStudentModal';
import { StudentModal } from '../components/StudentModal';
import { StudentTable } from '../components/StudentTable';

export const StudentsPage = () => {
  const students = useAppStore((state) => state.students);
  const createStudent = useAppStore((state) => state.createStudent);
  const updateStudent = useAppStore((state) => state.updateStudent);
  const deleteStudent = useAppStore((state) => state.deleteStudent);
  const addToast = useAppStore((state) => state.addToast);
  const [search, setSearch] = useState('');
  const [studentToDelete, setStudentToDelete] = useState<Student | undefined>(undefined);
  const [deletingStudentId, setDeletingStudentId] = useState<string | undefined>(undefined);
  const { selectedStudent, isModalOpen, openCreateModal, openEditModal, closeModal } = useStudentModal();
  const filteredStudents = useFilteredStudents(students, search);

  const handleSubmit = useCallback(async (values: StudentFormValues): Promise<void> => {
    const result =
      selectedStudent === undefined ? await createStudent(values) : await updateStudent(selectedStudent.id, values);

    if (result.ok) {
      addToast(selectedStudent === undefined ? 'Student created.' : 'Student updated.');
      closeModal();
      return;
    }

    addToast(result.error.message, 'error');
  }, [addToast, closeModal, createStudent, selectedStudent, updateStudent]);

  const confirmDelete = async () => {
    if (studentToDelete === undefined) {
      return;
    }

    setDeletingStudentId(studentToDelete.id);
    const result = await deleteStudent(studentToDelete.id);
    addToast(result.ok ? 'Student and related enrollments deleted.' : result.error.message, result.ok ? 'success' : 'error');
    setDeletingStudentId(undefined);
    setStudentToDelete(undefined);
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Students</h1>
          <p className="mt-1 text-sm text-slate-600">Create, search, and maintain student records.</p>
        </div>
        <Button type="button" onClick={openCreateModal}>
          New student
        </Button>
      </div>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <Panel
        title="Student directory"
        actions={
          <TextField
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, email, or phone"
          />
        }
      >
        <StudentTable
          students={filteredStudents}
          onEdit={openEditModal}
          onDelete={setStudentToDelete}
          disabledStudentId={deletingStudentId}
        />
      </Panel>

      <ConfirmModal
        isOpen={studentToDelete !== undefined}
        title="Delete student?"
        message="This removes the student and every related course registration."
        onCancel={() => setStudentToDelete(undefined)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
};
