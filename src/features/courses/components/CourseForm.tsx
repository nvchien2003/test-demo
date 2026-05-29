import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../shared/components/Button';
import { SelectField, TextareaField, TextField } from '../../../shared/components/Field';
import type { Course } from '../types';
import { courseFormSchema, type CourseFormValues } from '../validations';

interface CourseFormProps {
  course?: Course;
  onSubmit: (values: CourseFormValues) => void;
  onCancel: () => void;
}

const getDefaultValues = (course?: Course): CourseFormValues => ({
  name: course?.name ?? '',
  description: course?.description ?? '',
  maxStudents: course?.maxStudents ?? 1,
  status: course?.status === 'CLOSED' ? 'CLOSED' : 'OPEN',
});

export const CourseForm = ({ course, onSubmit, onCancel }: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: getDefaultValues(course),
  });

  useEffect(() => {
    reset(getDefaultValues(course));
  }, [course, reset]);

  return (
    <form className="grid gap-4" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px]">
        <TextField label="Course name" error={errors.name?.message} {...register('name')} />
        <TextField
          label="Maximum students"
          type="number"
          min={1}
          error={errors.maxStudents?.message}
          {...register('maxStudents')}
        />
        <SelectField label="Status" error={errors.status?.message} {...register('status')}>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </SelectField>
      </div>
      <TextareaField label="Description" error={errors.description?.message} {...register('description')} />
      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {course === undefined ? 'Create course' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
};
