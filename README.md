# Quản trị trung tâm đào tạo

Ứng dụng web nội bộ giúp trung tâm đào tạo nghề quản lý học viên, khóa học, ghi danh và thống kê tổng quan thay cho quy trình quản lý bằng nhiều file Excel rời rạc.

Project chạy hoàn toàn trên trình duyệt, sử dụng dữ liệu giả/mock data và không cần backend.

## Tính năng chính

- Quản lý học viên: thêm, sửa, xóa, tìm kiếm theo thời gian thực.
- Quản lý khóa học: thêm, sửa, xóa, theo dõi sức chứa và trạng thái khóa học.
- Quản lý ghi danh: ghi danh học viên vào khóa học, hủy ghi danh, kiểm tra trùng lặp và sức chứa.
- Dashboard: hiển thị tổng số học viên, khóa học, khóa đang mở, lượt ghi danh và tỷ lệ lấp đầy.
- Tự động cập nhật dữ liệu liên quan khi xóa học viên hoặc khóa học.
- Giao diện tiếng Việt, responsive cho desktop, tablet và mobile.

## Công nghệ sử dụng

- React 18
- TypeScript strict mode
- Vite
- TailwindCSS
- React Router
- Zustand
- React Hook Form
- Zod
- ESLint

## Yêu cầu môi trường

Cần cài đặt:

- Node.js 18 trở lên
- npm
- Git

Kiểm tra phiên bản:

```bash
node -v
npm -v
git --version
```

## Cách tải code từ GitHub

Clone repository:

```bash
git clone https://github.com/nvchien2003/test-demo.git
```

Đi vào thư mục project:

```bash
cd test-demo
```

## Cài đặt dependencies

```bash
npm install
```

## Chạy project ở môi trường phát triển

```bash
npm run dev
```

Sau khi chạy, mở trình duyệt tại địa chỉ Vite hiển thị trong terminal, thường là:

```text
http://localhost:5173
```

## Build production

```bash
npm run build
```

Thư mục build sẽ được tạo tại:

```text
dist/
```

## Xem thử bản production build

```bash
npm run preview
```

## Kiểm tra chất lượng mã nguồn

Chạy ESLint:

```bash
npm run lint
```

Chạy build để kiểm tra TypeScript và Vite:

```bash
npm run build
```

## Cấu trúc thư mục chính

```text
src/
├── app/
├── routes/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── validations/
│   └── types/
└── features/
    ├── students/
    ├── courses/
    ├── enrollments/
    └── dashboard/
```

## Ghi chú dữ liệu

- Ứng dụng hiện dùng mock/fake data trong mã nguồn.
- Không cần cấu hình database.
- Không cần chạy server backend.
- Các thao tác CRUD được mô phỏng ở frontend.

## Những file không nên commit

Project đã có `.gitignore` để bỏ qua:

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- file `.env`
- log và file cấu hình editor cục bộ

## Đẩy code lên GitHub

Sau khi chỉnh sửa code:

```bash
git status
git add .
git commit -m "Update project"
git push origin main
```

Nếu đây là lần đầu push nhánh `main`:

```bash
git push -u origin main
```
