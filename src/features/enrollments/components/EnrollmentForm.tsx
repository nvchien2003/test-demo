import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../../shared/components/Button';
import { SelectField } from '../../../shared/components/Field';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import type { Course } from '../../courses/types';
import type { Student } from '../../students/types';
import { enrollmentFormSchema, type EnrollmentFormValues } from '../validations';

interface EnrollmentFormProps {
  students: Student[];
  courses: Course[];
  onSubmit: (values: EnrollmentFormValues) => void;
}

export const EnrollmentForm = ({ students, courses, onSubmit }: EnrollmentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: { studentId: '', courseId: '' },
  });

  const submitForm = (values: EnrollmentFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <form
      className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]"
      onSubmit={(event) => void handleSubmit(submitForm)(event)}
    >
      <SelectField label="Student" error={errors.studentId?.message} {...register('studentId')}>
        <option value="">Select student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.fullName} ({student.email})
          </option>
        ))}
      </SelectField>
      <SelectField label="Course" error={errors.courseId?.message} {...register('courseId')}>
        <option value="">Select course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name} - {course.status}
          </option>
        ))}
      </SelectField>
      <div className="flex items-end">
        <Button type="submit" className="w-full lg:w-auto" disabled={isSubmitting}>
          Register
        </Button>
      </div>
      <div className="lg:col-span-3 flex flex-wrap gap-2">
        {courses.slice(0, 4).map((course) => (
          <span key={course.id} className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs">
            {course.name}
            <StatusBadge status={course.status} />
          </span>
        ))}
      </div>
    </form>
  );
};
