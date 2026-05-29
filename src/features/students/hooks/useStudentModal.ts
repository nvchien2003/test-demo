import { useCallback, useState } from 'react';
import type { Student } from '../types';

interface StudentModalState {
  selectedStudent: Student | undefined;
  isModalOpen: boolean;
  openCreateModal: () => void;
  openEditModal: (student: Student) => void;
  closeModal: () => void;
}

export const useStudentModal = (): StudentModalState => {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = useCallback(() => {
    setSelectedStudent(undefined);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedStudent(undefined);
    setIsModalOpen(false);
  }, []);

  return {
    selectedStudent,
    isModalOpen,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
