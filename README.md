# 🛡️ InfoSec Profile Portfolio

<div align="center">
  <img src="public/img/avata.jpg" alt="Logo" width="120" style="border-radius: 50%; border: 2px solid #00ff00;">
  <h3>Pham Tuan Anh (Таник)</h3>
  <p>Information Security Engineer | Bug Bounty Hunter</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
  [![SQLite3](https://img.shields.io/badge/Database-SQLite3-blue.svg)](https://www.sqlite.org/)
</div>

## 📖 Giới thiệu (Overview)
Đây là một trang Portfolio cá nhân được thiết kế đặc biệt dành riêng cho các Hacker, Kỹ sư An toàn thông tin (InfoSec) và Lập trình viên. Với phong cách **Glassmorphism**, cấu trúc **Bento Grid** hiện đại, và giao diện dòng lệnh (Hacker Terminal) tự động tương tác.

Dự án này sử dụng kiến trúc Fullstack nhỏ gọn với **Node.js (Express)** làm API và **SQLite** làm cơ sở dữ liệu.

## ✨ Tính năng nổi bật (Key Features)
- 💻 **Hacker Terminal**: Tích hợp một bảng điều khiển ảo tự động gõ mã lệnh (như `nmap`, shell scripts) siêu mượt.
- 🌐 **Hệ thống Song Ngữ Tự Động (Bilingual)**: Cung cấp từ điển dịch thuật tích hợp (Anh / Việt) tự động biên dịch dữ liệu trả về từ API backend mà không cần cấu hình lại CSDL.
- 🕸️ **Spider-web Cursor**: Con trỏ chuột mạng nhện tương tác thông minh được render bằng `Canvas 2D`, đảm bảo hiệu năng tuyệt đối (60FPS).
- ⚡ **Tối ưu hóa GPU (Hardware Acceleration)**: Khung ảnh nền GIF chất lượng cao được xử lý độc lập trên GPU (`translateZ(0)` và `will-change: transform`), loại bỏ hoàn toàn hiện tượng giật lag khi cuộn trang.
- 🛡️ **Hệ thống phòng thủ (Security Layers)**:
  - **Anti-cURL API**: Chặn các truy cập trái phép vào API lấy dữ liệu từ các công cụ automated (Postman, Python, Wget, cURL).
  - **Anti-DevTools & Right-Click**: Vô hiệu hóa tính năng Inspect Element (F12) và chặn chuột phải trên trình duyệt.

## 🛠️ Công nghệ sử dụng (Tech Stack)
- **Frontend**: HTML5, Vanilla JS, CSS3, FontAwesome, Bootstrap 5 (Base).
- **Backend**: Node.js, Express.js.
- **Database**: SQLite3.

## 🚀 Hướng dẫn cài đặt (Installation & Setup)

1. **Clone repository**:
   ```bash
   git clone https://github.com/reikageisme/Portfolio-1.git
   cd Portfolio-1
   ```

2. **Cài đặt thư viện**:
   ```bash
   npm install express sqlite3 cors
   ```

3. **Khởi tạo dữ liệu (Seeding Database)**:
   ```bash
   node database.js
   ```

4. **Khởi động Máy chủ (Start Server)**:
   ```bash
   node server.js
   ```

5. **Truy cập trang web**:
   Mở trình duyệt và truy cập vào `http://localhost:3000`

## 👨‍💻 Tác giả
- Tên: **Phạm Tuấn Anh (Таник)**
- Email: ptuananh7787@gmail.com
- Github: [@reikageisme](https://github.com/reikageisme)

## 📄 Giấy phép (License)
Dự án này được phân phối dưới giấy phép MIT. Xem chi tiết tại file [LICENSE](LICENSE).
