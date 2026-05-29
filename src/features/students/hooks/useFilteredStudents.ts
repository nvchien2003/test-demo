import { useMemo } from 'react';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { includesSearch, normalizeSearch } from '../../../shared/utils/search';
import type { Student } from '../types';

export const useFilteredStudents = (students: Student[], search: string): Student[] => {
  const debouncedSearch = useDebouncedValue(search);

  return useMemo(() => {
    const query = normalizeSearch(debouncedSearch);
    if (query.length === 0) {
      return students;
    }

    return students.filter(
      (student) =>
        includesSearch(student.fullName, query) ||
        includesSearch(student.email, query) ||
        includesSearch(student.phone, query),
    );
  }, [debouncedSearch, students]);
};
