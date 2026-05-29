import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../shared/components/Button';
import { TextField } from '../../../shared/components/Field';
import type { Student } from '../types';
import { studentFormSchema, type StudentFormValues } from '../validations';

interface StudentFormProps {
  student?: Student;
  onSubmit: (values: StudentFormValues) => Promise<void>;
  onCancel: () => void;
}

const getDefaultValues = (student?: Student): StudentFormValues => ({
  fullName: student?.fullName ?? '',
  email: student?.email ?? '',
  phone: student?.phone ?? '',
  address: student?.address ?? '',
  dob: student?.dob ?? '',
});

export const StudentForm = ({ student, onSubmit, onCancel }: StudentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: getDefaultValues(student),
  });

  useEffect(() => {
    reset(getDefaultValues(student));
  }, [reset, student]);

  return (
    <form className="grid gap-4" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Họ và tên" error={errors.fullName?.message} {...register('fullName')} />
        <TextField label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <TextField label="Số điện thoại" error={errors.phone?.message} {...register('phone')} />
        <TextField label="Ngày sinh" type="date" error={errors.dob?.message} {...register('dob')} />
      </div>
      <TextField label="Địa chỉ" error={errors.address?.message} {...register('address')} />
      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang lưu...' : student === undefined ? 'Tạo học viên' : 'Lưu thay đổi'}
        </Button>
      </div>
    </form>
  );
};
