<div align="center">
  <img src="public/img/avata.jpg" alt="Pham Tuan Anh Profile" width="150" style="border-radius: 50%; border: 3px solid #00ff00; box-shadow: 0 0 20px #00ff00;">
  
  # 🛡️ Tuan Anh (Таник) - InfoSec Engineer Portfolio
  
  **An Advanced, Secure, and Interactive Personal Portfolio for Information Security Professionals.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933.svg?logo=nodedotjs)](https://nodejs.org/)
  [![SQLite3](https://img.shields.io/badge/Database-SQLite3-003B57.svg?logo=sqlite)](https://www.sqlite.org/)
  [![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS_%7C_CSS3-f7df1e.svg?logo=javascript)]()
  [![Security](https://img.shields.io/badge/Security-Hardened-red.svg?logo=shield)]()
</div>

<hr>

## 📖 Giới thiệu dự án (Project Overview)

Chào mừng bạn đến với kho lưu trữ mã nguồn mở của dự án **InfoSec Portfolio**. 

Trong giới An toàn thông tin (Cybersecurity), việc sở hữu một trang profile cá nhân không chỉ dừng lại ở việc hiển thị thông tin tĩnh, mà còn là nơi thể hiện tư duy hệ thống, kỹ năng lập trình và khả năng phòng thủ của người kỹ sư. Dự án này ra đời nhằm mục đích cung cấp một giải pháp Portfolio toàn diện, kết hợp giữa **Giao diện Glassmorphism / Bento Grid cực kỳ hiện đại**, **Hiệu năng cao**, và **Kiến trúc bảo mật nhiều lớp**.

Không giống như các trang web tĩnh (Static Web) thông thường, dự án này được trang bị một **Node.js API Backend** độc lập để quản lý dữ liệu linh hoạt, đồng thời cài cắm các kỹ thuật chặn đứng trình cào dữ liệu (Anti-Scraping) và thao tác kiểm tra mã nguồn (Anti-DevTools).

---

## ✨ Tính năng nổi bật & Phân tích kỹ thuật (Key Features & Technical Details)

### 1. 🛡️ Kiến trúc Bảo mật (Security Architecture)
Là một dự án của kỹ sư bảo mật, hệ thống được thiết lập các lớp phòng thủ chủ động:
- **Lớp bảo vệ Backend (API Anti-Scraping):** Tích hợp Middleware tự động phân tích `User-Agent`. Mọi nỗ lực truy cập API bằng các công cụ tự động hóa như `cURL`, `Wget`, `Postman`, `Python-requests`, `Axios` đều bị từ chối truy cập với mã `403 Forbidden`.
- **Lớp bảo vệ Frontend (Anti-DevTools & Anti-Right-Click):**
  - Chặn triệt để các hành vi mở Developer Tools (F12, Ctrl+Shift+I/J).
  - Vô hiệu hóa tính năng chuột phải (Context Menu) và chọn văn bản để chống sao chép trái phép.
  - Tự động đóng băng luồng thực thi (debugger loop) nếu cố gắng can thiệp bộ nhớ.

### 2. 💻 Trải nghiệm Người dùng Đậm chất Hacker (InfoSec UX/UI)
- **Terminal Emulator (Trình giả lập lệnh):** Một khối Bento đặc biệt đóng vai trò là cửa sổ Console. Khi tải trang, hệ thống sẽ tự động gõ (Typewriter effect) các lệnh hacker chân thực như `nmap`, quét lỗ hổng và mô phỏng thông báo xâm nhập thành công (`root shell opened`).
- **Tối ưu hóa GPU (Hardware Acceleration GPU):** Hình nền GIF động thường xuyên gây hiện tượng thắt cổ chai (bottleneck) cho CPU khi cuộn trang. Giải pháp là bóc tách ảnh nền sang một Layer riêng biệt với `z-index: -100`, kích hoạt `will-change: transform` và `transform: translateZ(0)` để ép card đồ họa (GPU) xử lý, mang lại trải nghiệm mượt mà 60 FPS.
- **Con trỏ mạng nhện (Canvas Spider-web Cursor):** Loại bỏ hoàn toàn sự gián đoạn của DOM Cursor truyền thống. Hệ thống tạo ra một môi trường hạt (particles) tương tác thời gian thực thông qua công nghệ `Canvas 2D HTML5`. Các đường lưới (web) sẽ liên tục bám theo và tương tác với các khối thông tin khi người dùng rê chuột.

### 3. 🌐 Tự động hóa Đa ngôn ngữ (Smart i18n System)
- Khác với cách dùng file JSON truyền thống, bộ dịch thuật thuật toán (Translation Wrapper) được nhúng sâu vào Frontend.
- Khi API trả dữ liệu từ cơ sở dữ liệu (Mặc định: Tiếng Việt), thuật toán sẽ ánh xạ (map) tự động và chuyển đổi toàn bộ giao diện, nội dung dữ liệu động sang **Tiếng Anh** một cách trơn tru chỉ với một nút bấm chuyển đổi cờ (🇻🇳 / 🇬🇧).

---

## 🏗️ Cấu trúc thư mục (Project Structure)

Dự án được phân chia theo kiến trúc Client-Server tiêu chuẩn, dễ dàng bảo trì và mở rộng:

```text
📦 Portfolio-1
 ┣ 📂 public                   # Thư mục gốc chứa tài nguyên Frontend
 ┃ ┣ 📂 background             # Các ảnh nền GIF/Videos tĩnh
 ┃ ┣ 📂 img                    # Logo, Avatar và QR Code
 ┃ ┣ 📜 index.html             # Khung sườn giao diện (Bento Grid)
 ┃ ┣ 📜 style.css              # Hệ thống CSS (Glassmorphism, Animations)
 ┃ ┣ 📜 app-core.js            # Xử lý Logic (API Fetch, Canvas Cursor, Typewriter, i18n)
 ┃ ┗ 📜 security.js            # Tệp thực thi các lớp bảo mật chống Debug
 ┣ 📜 server.js                # Express Server, Middleware bảo mật & RESTful API
 ┣ 📜 database.js              # Script khởi tạo Schema, Bảng và Seeding dữ liệu (SQLite)
 ┣ 📜 package.json             # Khai báo Dependencies
 ┗ 📜 README.md                # Tài liệu dự án
```

---

## 💾 Kiến trúc Cơ sở dữ liệu (Database Schema)

Dự án sử dụng **SQLite3** để đảm bảo tính gọn nhẹ (Serverless DB). Các bảng được thiết kế tách biệt và tối ưu hóa cho truy vấn đọc (Read-heavy):

1. **`profile`**: Lưu trữ tiêu đề (Title) và giới thiệu bản thân (About).
2. **`socials`**: Chứa danh sách các mạng xã hội (Tên, URL, FontAwesome Class).
3. **`contact`**: Thông tin cá nhân (Email, SĐT, Vị trí địa lý).
4. **`skills`**: Chuyên môn và kỹ năng công nghệ.
5. **`experience`**: Lịch sử làm việc, nhiệm vụ và mô tả (Bilingual fields support).
6. **`payment`**: Cấu hình các phương thức thanh toán, số tài khoản, và lời nhắn Donate.

Toàn bộ dữ liệu được tổng hợp vào duy nhất một RESTful Endpoint: `GET /api/profile`.

---

## 🚀 Hướng dẫn Cài đặt & Triển khai (Installation & Deployment)

Việc khởi chạy dự án cực kỳ đơn giản, chỉ cần môi trường của bạn đã cài đặt sẵn [Node.js (v14+)](https://nodejs.org/).

### Bước 1: Sao chép dự án về máy
```bash
git clone https://github.com/reikageisme/Portfolio-1.git
cd Portfolio-1
```

### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)
Môi trường backend sử dụng Express và SQLite:
```bash
npm install express sqlite3 cors
```

### Bước 3: Khởi tạo dữ liệu (Seeding Database)
Chạy script để hệ thống tự động tạo file `portfolio.db` và chèn các dữ liệu cá nhân có sẵn:
```bash
node database.js
```
*(Kết quả mong đợi: `Database setup complete` và hệ thống sẽ thông báo chèn thành công các bản ghi).*

### Bước 4: Khởi động Server
```bash
node server.js
```
Máy chủ sẽ lắng nghe ở cổng mặc định. Bạn hãy mở trình duyệt và truy cập vào:
👉 **http://localhost:3000**

---

## 🎯 Định hướng phát triển tương lai (Roadmap)
- [ ] Thêm chức năng Blog/Write-up để tự động kéo các bài viết CVE phân tích lỗ hổng từ Github/Medium về.
- [ ] Bổ sung bảng điều khiển Admin Panel (bảo vệ bằng JWT/OTP) để thay đổi thông tin mà không cần sửa code.
- [ ] Nâng cấp Terminal ảo thành Interactive Terminal (Cho phép khách truy cập gõ lệnh thật như `whoami`, `help`, `cat flag.txt`).

---

## 📞 Liên hệ (Contact)

Dự án được phát triển và duy trì bởi:
- **Tác giả:** Phạm Tuấn Anh (Таник)
- **Vị trí:** Information Security Engineer
- **Email:** ptuananh7787@gmail.com
- **Mạng xã hội:** [Facebook](https://www.facebook.com/tuanh.467/) | [Github](https://github.com/reikageisme)

---

## ⚖️ License
Dự án được cung cấp dưới dạng mã nguồn mở theo giấy phép [MIT License](LICENSE). Bạn có thể thoải mái tham khảo, sửa đổi và sử dụng cho mục đích cá nhân miễn là giữ nguyên thông tin bản quyền của tác giả gốc.
