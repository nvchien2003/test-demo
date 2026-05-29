import { NavLink, Outlet } from 'react-router-dom';
import { ROUTE_PATHS, type RoutePath } from '../../routes/paths';
import { ToastViewport } from '../../shared/components/Toast';

interface NavigationItem {
  label: string;
  path: RoutePath;
}

const navigationItems: NavigationItem[] = [
  { label: 'Tổng quan', path: ROUTE_PATHS.dashboard },
  { label: 'Học viên', path: ROUTE_PATHS.students },
  { label: 'Khóa học', path: ROUTE_PATHS.courses },
  { label: 'Ghi danh', path: ROUTE_PATHS.enrollments },
];

export const AppLayout = () => (
  <div className="min-h-screen bg-surface">
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-lg font-semibold text-ink">Quản trị trung tâm đào tạo</div>
          <div className="text-sm text-slate-500">Thay thế quy trình Excel, chạy hoàn toàn trên trình duyệt</div>
        </div>
        <nav className="flex gap-2 overflow-x-auto" aria-label="Điều hướng chính">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ROUTE_PATHS.dashboard}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-accent text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <ToastViewport />
  </div>
);
