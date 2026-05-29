import { z } from 'zod';

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

export const studentFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Vui lòng nhập họ và tên.'),
  email: z.string().trim().email('Vui lòng nhập địa chỉ email hợp lệ.'),
  phone: z.string().trim().regex(phoneRegex, 'Vui lòng nhập số điện thoại hợp lệ.'),
  address: z.string().trim().min(3, 'Vui lòng nhập địa chỉ.'),
  dob: z.string().min(1, 'Vui lòng chọn ngày sinh.'),
});

export const courseFormSchema = z.object({
  name: z.string().trim().min(2, 'Vui lòng nhập tên khóa học.'),
  description: z.string().trim().min(8, 'Vui lòng nhập mô tả khóa học.'),
  maxStudents: z.coerce.number().int().min(1, 'Sức chứa phải tối thiểu là 1.'),
  status: z.enum(['OPEN', 'CLOSED']),
});

export const enrollmentFormSchema = z.object({
  studentId: z.string().min(1, 'Vui lòng chọn học viên.'),
  courseId: z.string().min(1, 'Vui lòng chọn khóa học.'),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;
export type CourseFormValues = z.infer<typeof courseFormSchema>;
export type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>;
