import type { Course, Enrollment, Student } from '../types/domain';

export const fakeStudents: Student[] = [
  {
    id: 'stu_001',
    fullName: 'Mai Nguyễn',
    email: 'maya.nguyen@example.com',
    phone: '+84 912 345 111',
    address: '12 Trần Hưng Đạo, Thành phố Hồ Chí Minh',
    dob: '2001-04-12',
    createdAt: '2026-01-10T08:15:00.000Z',
  },
  {
    id: 'stu_002',
    fullName: 'Đan Trần',
    email: 'daniel.tran@example.com',
    phone: '+84 934 222 184',
    address: '41 Nguyễn Huệ, Đà Nẵng',
    dob: '1999-09-22',
    createdAt: '2026-01-18T09:00:00.000Z',
  },
  {
    id: 'stu_003',
    fullName: 'Linh Phạm',
    email: 'linh.pham@example.com',
    phone: '+84 903 114 208',
    address: '7 Lê Lợi, Huế',
    dob: '2002-07-03',
    createdAt: '2026-02-01T10:30:00.000Z',
  },
  {
    id: 'stu_004',
    fullName: 'An Võ',
    email: 'alex.vo@example.com',
    phone: '+84 908 991 301',
    address: '88 Hai Bà Trưng, Hà Nội',
    dob: '1998-12-15',
    createdAt: '2026-02-15T11:45:00.000Z',
  },
];

export const fakeCourses: Course[] = [
  {
    id: 'crs_001',
    name: 'Bảo trì điện công nghiệp',
    description: 'Đào tạo thực hành về đấu dây, kiểm tra an toàn và chẩn đoán sự cố điện.',
    maxStudents: 4,
    enrolledCount: 2,
    status: 'OPEN',
  },
  {
    id: 'crs_002',
    name: 'Vận hành máy CNC',
    description: 'Thực hành vận hành CNC, thiết lập dao cụ, hiệu chuẩn và quy trình sản xuất.',
    maxStudents: 2,
    enrolledCount: 2,
    status: 'FULL',
  },
  {
    id: 'crs_003',
    name: 'Kỹ năng bếp chuyên nghiệp',
    description: 'An toàn bếp, thực hiện công thức, kiểm soát tồn kho và chuẩn bị phục vụ.',
    maxStudents: 5,
    enrolledCount: 1,
    status: 'OPEN',
  },
  {
    id: 'crs_004',
    name: 'Chứng chỉ an toàn hàn',
    description: 'Lộ trình chứng chỉ về thiết bị hàn, đồ bảo hộ và quy trình kiểm tra an toàn.',
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
