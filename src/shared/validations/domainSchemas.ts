import { z } from 'zod';

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

export const studentFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number.'),
  address: z.string().trim().min(3, 'Address is required.'),
  dob: z.string().min(1, 'Date of birth is required.'),
});

export const courseFormSchema = z.object({
  name: z.string().trim().min(2, 'Course name is required.'),
  description: z.string().trim().min(8, 'Description is required.'),
  maxStudents: z.coerce.number().int().min(1, 'Capacity must be at least 1.'),
  status: z.enum(['OPEN', 'CLOSED']),
});

export const enrollmentFormSchema = z.object({
  studentId: z.string().min(1, 'Select a student.'),
  courseId: z.string().min(1, 'Select a course.'),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;
export type CourseFormValues = z.infer<typeof courseFormSchema>;
export type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>;
