import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/StateView';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import type { Course } from '../types';
import type { CourseMetric } from '../hooks/useCourseMetrics';

interface CourseListProps {
  courses: Course[];
  metrics: CourseMetric[];
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export const CourseList = ({ courses, metrics, onEdit, onDelete }: CourseListProps) => {
  if (courses.length === 0) {
    return <EmptyState title="No courses yet" message="Create a course to start accepting registrations." />;
  }

  const getMetric = (courseId: string): CourseMetric | undefined =>
    metrics.find((metric) => metric.courseId === courseId);

  return (
    <div className="grid gap-3">
      {courses.map((course) => {
        const metric = getMetric(course.id);
        return (
          <article key={course.id} className="rounded-lg border border-line bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-ink">{course.name}</h3>
                  <StatusBadge status={course.status} />
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{course.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button type="button" variant="secondary" onClick={() => onEdit(course)}>
                  Edit
                </Button>
                <Button type="button" variant="ghost" onClick={() => onDelete(course)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-slate-50 p-3">
                <div className="text-xs font-medium uppercase text-slate-500">Enrolled</div>
                <div className="mt-1 text-lg font-semibold text-ink">
                  {course.enrolledCount}/{course.maxStudents}
                </div>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <div className="text-xs font-medium uppercase text-slate-500">Available slots</div>
                <div className="mt-1 text-lg font-semibold text-ink">{metric?.availableSlots ?? 0}</div>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <div className="text-xs font-medium uppercase text-slate-500">Fill rate</div>
                <div className="mt-1 text-lg font-semibold text-ink">{metric?.fillPercent ?? 0}%</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
