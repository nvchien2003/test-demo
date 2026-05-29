import { fakeStudents } from '../../../shared/data/fakeDatabase';
import type { Result, Student } from '../../../shared/types/domain';
import type { StudentFormValues } from '../validations';
import { createId } from '../../../shared/utils/id';
import { todayIso } from '../../../shared/utils/date';
import { failure, success } from '../../../shared/utils/result';
import { validateUniqueStudentEmail } from './studentRules';

const API_DELAY_MS = 500;

let studentDatabase: Student[] = [...fakeStudents];

const wait = (): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, API_DELAY_MS);
  });

export const getStudents = async (): Promise<Result<Student[]>> => {
  await wait();
  return success([...studentDatabase]);
};

export const createStudent = async (values: StudentFormValues): Promise<Result<Student>> => {
  await wait();

  const emailResult = validateUniqueStudentEmail(values.email, studentDatabase);
  if (!emailResult.ok) {
    return emailResult;
  }

  const student: Student = {
    id: createId('stu'),
    ...values,
    email: emailResult.value,
    createdAt: todayIso(),
  };

  studentDatabase = [...studentDatabase, student];
  return success(student);
};

export const updateStudent = async (
  studentId: string,
  values: StudentFormValues,
): Promise<Result<Student>> => {
  await wait();

  const existingStudent = studentDatabase.find((student) => student.id === studentId);
  if (existingStudent === undefined) {
    return failure('INVALID_STUDENT', 'Student was not found.');
  }

  const emailResult = validateUniqueStudentEmail(values.email, studentDatabase, studentId);
  if (!emailResult.ok) {
    return emailResult;
  }

  const updatedStudent: Student = {
    ...existingStudent,
    ...values,
    email: emailResult.value,
  };

  studentDatabase = studentDatabase.map((student) =>
    student.id === studentId ? updatedStudent : student,
  );

  return success(updatedStudent);
};

export const deleteStudent = async (studentId: string): Promise<Result<string>> => {
  await wait();

  const exists = studentDatabase.some((student) => student.id === studentId);
  if (!exists) {
    return failure('INVALID_STUDENT', 'Student was not found.');
  }

  studentDatabase = studentDatabase.filter((student) => student.id !== studentId);
  return success(studentId);
};
