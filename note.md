1. Cài đặt Vite
   Mở terminal thư mục dự án

-   npm create vite
-   Rồi chọn theo các bước sau:

    ◇ Project name:
    │ . // Để dấu chấm để cài vào dự án hiện tại
    │
    ◇ Select a framework:
    │ Vanilla // Chọn Vanilla
    │
    ◇ Select a variant:
    │ JavaScript // Chọn Javascript

2. Cài tailwind
   Mở terminal mới của thư mục dự án

    - npm install tailwindcss @tailwindcss/vite

    - Tạo file vite.config.ts trong thư mục /node_modules của dự án

    - Dán toàn bộ nội dung sau vào và lưu lại

        import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'

        export default defineConfig({
        plugins: [
        tailwindcss(),
        ],
        })

    - Vào file style trong thư mục /node_modules/src của dự án
    - Dán toàn bộ nội dung sau vào và lưu lại

    @import "tailwindcss";

3. Cài axios

    - npm i axios

4. Chạy dự án

    - npm run dev
