import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { ConfirmModal, Panel } from '../../../shared/components/Modal';
import { useAppStore } from '../store';
import type { Course } from '../types';
import type { CourseFormValues } from '../validations';
import { CourseForm } from '../components/CourseForm';
import { CourseList } from '../components/CourseList';
import { useCourseMetrics } from '../hooks/useCourseMetrics';

export const CoursesPage = () => {
  const courses = useAppStore((state) => state.courses);
  const createCourse = useAppStore((state) => state.createCourse);
  const updateCourse = useAppStore((state) => state.updateCourse);
  const deleteCourse = useAppStore((state) => state.deleteCourse);
  const addToast = useAppStore((state) => state.addToast);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);
  const [courseToDelete, setCourseToDelete] = useState<Course | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const metrics = useCourseMetrics(courses);

  const closeForm = () => {
    setEditingCourse(undefined);
    setIsFormOpen(false);
  };

  const handleSubmit = (values: CourseFormValues) => {
    const result = editingCourse === undefined ? createCourse(values) : updateCourse(editingCourse.id, values);
    if (result.ok) {
      addToast(editingCourse === undefined ? 'Đã tạo khóa học.' : 'Đã cập nhật khóa học.');
      closeForm();
      return;
    }

    addToast(result.error.message, 'error');
  };

  const confirmDelete = () => {
    if (courseToDelete === undefined) {
      return;
    }

    const result = deleteCourse(courseToDelete.id);
    addToast(result.ok ? 'Đã xóa khóa học và các lượt ghi danh liên quan.' : result.error.message, result.ok ? 'success' : 'error');
    setCourseToDelete(undefined);
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Khóa học</h1>
          <p className="mt-1 text-sm text-slate-600">Quản lý sức chứa, tình trạng còn chỗ và trạng thái khóa học.</p>
        </div>
        <Button type="button" onClick={() => setIsFormOpen(true)}>
          Thêm khóa học
        </Button>
      </div>

      {isFormOpen ? (
        <Panel title={editingCourse === undefined ? 'Tạo khóa học' : 'Chỉnh sửa khóa học'}>
          <CourseForm course={editingCourse} onSubmit={handleSubmit} onCancel={closeForm} />
        </Panel>
      ) : null}

      <Panel title="Danh mục khóa học">
        <CourseList
          courses={courses}
          metrics={metrics}
          onEdit={(course) => {
            setEditingCourse(course);
            setIsFormOpen(true);
          }}
          onDelete={setCourseToDelete}
        />
      </Panel>

      <ConfirmModal
        isOpen={courseToDelete !== undefined}
        title="Xóa khóa học?"
        message="Thao tác này sẽ xóa khóa học và mọi lượt ghi danh học viên liên quan."
        onCancel={() => setCourseToDelete(undefined)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
