1. Cài đặt Vite
   Mở terminal thư mục dự án

-   npm create vite

-   Rồi chọn theo các bước sau: (Project name: để dấu . để cài đặt tại thư mục hiện tại)

        │
        ◇ Project name:
        │ .
        │
        ◇ Select a framework:
        │ React
        │
        ◇ Select a variant:
        │ JavaScript + SWC
        │
        ◇ Use rolldown-vite (Experimental)?:
        │ Yes
        │
        ◇ Install with npm and start now?
        │ Yes

2.  Cài tailwind
    Mở terminal mới của thư mục dự án

        -   npm install tailwindcss @tailwindcss/vite

        -   Tạo file vite.config.js trong thư mục /node_modules của dự án

        -   Dán toàn bộ nội dung sau vào và lưu lại

            import { defineConfig } from "vite";
            import react from "@vitejs/plugin-react-swc";
            import tailwindcss from "@tailwindcss/vite";

            // https://vite.dev/config/
            export default defineConfig({
                plugins: [react(), tailwindcss()],
            });

        -   Vào file .css (app.css, main.css, index.css) trong thư mục /node_modules/src của dự án
        -   Dán nội dung sau vào và lưu lại

            @import "tailwindcss";

3.  Cài axios

    -   npm i axios

4.  Chạy dự án

    -   npm run dev

    *   Tắt import React trong Extension, bạn có thể tắt dòng import thừa thông qua cài đặt:

    -   Mở VS Code, nhấn tổ hợp Ctrl + , (Windows) hoặc Cmd + , (Mac) để mở Settings.
    -   Gõ vào thanh tìm kiếm: React Snippets.
    -   Tìm mục "ES7 React Snippets: Import React On Top".
    -   Bỏ chọn (Uncheck) ô này.
    -   Thử lại lệnh rafc, dòng import React sẽ biến mất.

    *   Xuống dòng không ảnh hưởng code

    -   Trường hợp 1: Word Wrap (Chỉ để dễ nhìn, không sửa code)

        -   Đây là cách phổ biến nhất để bạn không phải kéo thanh trượt ngang.
        -   Cách nhanh nhất (Phím tắt):
            Windows/Linux: Nhấn Alt + Z
            Mac: Nhấn Option + Z (Nhấn lần nữa để tắt)
        -   Cách cài đặt vĩnh viễn (Luôn luôn xuống dòng):
            Mở Settings: Ctrl + , (hoặc Cmd + ,).
            Gõ vào ô tìm kiếm: Word Wrap.
            Tại mục Editor: Word Wrap, chuyển từ off sang on.

    -   Trường hợp 2: Format Code (Xuống dòng thật khi Save)

        -   Nếu bạn muốn khi nhấn Ctrl + S, code tự động được sắp xếp lại, cắt các dòng quá dài xuống dòng mới theo chuẩn quy định (thường dùng Prettier), hãy làm như sau:

        Bước 1: Bật tính năng Format On Save
        Mở Settings (Ctrl + ,).
        Tìm kiếm: Format On Save.
        Tích vào ô: Editor: Format On Save.

        Bước 2: Cài đặt giới hạn độ dài dòng (để nó biết khi nào cần xuống dòng)
        Vẫn trong Settings, tìm kiếm: Prettier Print Width (nếu bạn đã cài Prettier Extension).
        Mặc định là 80. Bạn có thể chỉnh lên 100 hoặc 120 nếu muốn dòng dài hơn một chút rồi mới xuống dòng.
        Lưu ý: Để cách này hoạt động, bạn cần cài Extension Prettier - Code formatter trong VS Code.
