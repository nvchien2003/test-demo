import type { Course, Enrollment, Student } from '../types/domain';

export const fakeStudents: Student[] = [
  {
    id: 'stu_001',
    fullName: 'Maya Nguyen',
    email: 'maya.nguyen@example.com',
    phone: '+84 912 345 111',
    address: '12 Tran Hung Dao, Ho Chi Minh City',
    dob: '2001-04-12',
    createdAt: '2026-01-10T08:15:00.000Z',
  },
  {
    id: 'stu_002',
    fullName: 'Daniel Tran',
    email: 'daniel.tran@example.com',
    phone: '+84 934 222 184',
    address: '41 Nguyen Hue, Da Nang',
    dob: '1999-09-22',
    createdAt: '2026-01-18T09:00:00.000Z',
  },
  {
    id: 'stu_003',
    fullName: 'Linh Pham',
    email: 'linh.pham@example.com',
    phone: '+84 903 114 208',
    address: '7 Le Loi, Hue',
    dob: '2002-07-03',
    createdAt: '2026-02-01T10:30:00.000Z',
  },
  {
    id: 'stu_004',
    fullName: 'Alex Vo',
    email: 'alex.vo@example.com',
    phone: '+84 908 991 301',
    address: '88 Hai Ba Trung, Hanoi',
    dob: '1998-12-15',
    createdAt: '2026-02-15T11:45:00.000Z',
  },
];

export const fakeCourses: Course[] = [
  {
    id: 'crs_001',
    name: 'Industrial Electrical Maintenance',
    description: 'Hands-on training for wiring, safety checks, and electrical fault diagnosis.',
    maxStudents: 4,
    enrolledCount: 2,
    status: 'OPEN',
  },
  {
    id: 'crs_002',
    name: 'CNC Machine Operation',
    description: 'Practical CNC operation, tooling setup, calibration, and production workflows.',
    maxStudents: 2,
    enrolledCount: 2,
    status: 'FULL',
  },
  {
    id: 'crs_003',
    name: 'Professional Culinary Skills',
    description: 'Kitchen safety, recipe execution, inventory control, and service preparation.',
    maxStudents: 5,
    enrolledCount: 1,
    status: 'OPEN',
  },
  {
    id: 'crs_004',
    name: 'Welding Safety Certification',
    description: 'Certification track covering welding equipment, protective gear, and inspections.',
    maxStudents: 3,
    enrolledCount: 0,
    status: 'CLOSED',
  },
];

export const fakeEnrollments: Enrollment[] = [
  {
    id: 'enr_001',
    studentId: 'stu_001',
    courseId: 'crs_001',
    enrolledAt: '2026-03-05T08:00:00.000Z',
  },
  {
    id: 'enr_002',
    studentId: 'stu_002',
    courseId: 'crs_001',
    enrolledAt: '2026-03-06T08:30:00.000Z',
  },
  {
    id: 'enr_003',
    studentId: 'stu_003',
    courseId: 'crs_002',
    enrolledAt: '2026-03-07T09:30:00.000Z',
  },
  {
    id: 'enr_004',
    studentId: 'stu_004',
    courseId: 'crs_002',
    enrolledAt: '2026-03-08T10:00:00.000Z',
  },
  {
    id: 'enr_005',
    studentId: 'stu_001',
    courseId: 'crs_003',
    enrolledAt: '2026-03-09T13:15:00.000Z',
  },
];
