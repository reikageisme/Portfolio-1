const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'portfolio.db');

// Nếu file db cũ tồn tại, xóa để ghi đè dữ liệu mới
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
        return;
    }
    console.log('Connected to SQLite database.');
});

db.serialize(() => {
    // 1. Create Tables
    db.run(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, title_en TEXT,
        about TEXT, about_en TEXT
    )`);

    db.run(`CREATE TABLE socials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, url TEXT, iconClass TEXT
    )`);

    db.run(`CREATE TABLE contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT, phone TEXT,
        address TEXT, address_en TEXT
    )`);

    db.run(`CREATE TABLE skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, name_en TEXT
    )`);

    db.run(`CREATE TABLE experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job TEXT, job_en TEXT,
        period TEXT, period_en TEXT,
        description TEXT, description_en TEXT
    )`);

    db.run(`CREATE TABLE projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        role TEXT, role_en TEXT,
        description TEXT, description_en TEXT
    )`);

    db.run(`CREATE TABLE achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`);

    db.run(`CREATE TABLE payment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bankName TEXT, accountName TEXT,
        accountNumber TEXT,
        addInfo TEXT, addInfo_en TEXT, qrCode TEXT
    )`);

    // 2. Insert Data
    // Profile
    const aboutEn = "Hello! I'm Phạm Tuấn Anh (aka ReiKage), a passionate Information Security Engineer. My journey isn't just about scanning for vulnerabilities; it's fueled by a deep curiosity about how complex systems work—and how to break them. I thrive in the trenches of CTF competitions (Web Exploitation), late-night bug hunting, and architecting robust server infrastructures from scratch. I believe that to truly protect a system, you must know how to build it. Whether I'm developing AI-driven security dashboards, optimizing databases, or tinkering with hardware modding, I treat technology as an endless playground. Always ready to secure the unsecurable and debug the impossible.";
    const aboutVi = "Xin chào! Tôi là Phạm Tuấn Anh (hay còn gọi là ReiKage), một Kỹ sư An toàn thông tin đầy nhiệt huyết. Hành trình của tôi không chỉ dừng lại ở việc quét lỗ hổng bảo mật; nó được thúc đẩy bởi sự tò mò sâu sắc về cách các hệ thống phức tạp hoạt động—và cách để phá vỡ chúng. Tôi luôn bùng cháy trong các cuộc thi CTF (Khai thác Web), săn lỗi bảo mật xuyên đêm, và thiết kế các hạ tầng máy chủ vững chắc từ con số không. Tôi tin rằng để thực sự bảo vệ một hệ thống, bạn phải biết cách xây dựng nó. Cho dù đó là phát triển bảng điều khiển bảo mật tích hợp AI, tối ưu hóa cơ sở dữ liệu, hay độ chế phần cứng, tôi luôn coi công nghệ là một sân chơi vô tận. Luôn sẵn sàng bảo vệ những thứ không thể bảo vệ và gỡ lỗi những điều không tưởng.";
    
    db.run(`INSERT INTO profile (title, title_en, about, about_en) VALUES (?, ?, ?, ?)`, 
        ['Kỹ sư An toàn thông tin', 'Information Security Engineer', aboutVi, aboutEn]
    );

    // Contact
    db.run(`INSERT INTO contact (email, phone, address, address_en) VALUES (?, ?, ?, ?)`,
        ['ptuananh7787@gmail.com', '0399737867', 'Việt Nam', 'Vietnam']
    );

    // Socials
    const socials = [
        ["Facebook", "https://www.facebook.com/tuanh.467/", "fa-brands fa-facebook"],
        ["Github", "https://github.com/reikageisme", "fa-brands fa-github"]
    ];
    const stmtSoc = db.prepare(`INSERT INTO socials (name, url, iconClass) VALUES (?, ?, ?)`);
    socials.forEach(s => stmtSoc.run(s[0], s[1], s[2]));
    stmtSoc.finalize();

    // Skills
    const skills = [
        ["Lập trình: C, C++, T-SQL, JavaScript, Python", "Programming: C, C++, T-SQL, JavaScript, Python"],
        ["Frameworks: ReactJS, FastAPI, TailwindCSS, Express", "Frameworks: ReactJS, FastAPI, TailwindCSS, Express"],
        ["Cơ sở dữ liệu: SQLite, SQL Server (SSMS)", "Databases: SQLite, SQL Server (SSMS)"],
        ["An toàn thông tin: Web Exploitation, Network Scanning (Nmap), System Protection", "Security: Web Exploitation, Network Scanning (Nmap), System Protection"],
        ["Công cụ & Khác: Linux/LXC Administration, Proxmox, Adobe Illustrator, Canva, OpenSCAD", "Tools & Others: Linux/LXC Administration, Proxmox, Adobe Illustrator, Canva, OpenSCAD"]
    ];
    const stmtSkills = db.prepare(`INSERT INTO skills (name, name_en) VALUES (?, ?)`);
    skills.forEach(s => stmtSkills.run(s[0], s[1]));
    stmtSkills.finalize();

    // Experience
    const experiences = [
        { job: 'Kỹ sư Bảo mật', job_en: 'Security Engineer', period: '2023 - Hiện tại', period_en: '2023 - Present', description: 'Đánh giá an toàn thông tin và bảo vệ hệ thống.', description_en: 'Information security assessment and system protection.' },
        { job: 'Tuyển thủ CTF (Khai thác Web)', job_en: 'CTF Player (Web Exploitation)', period: 'Hiện tại', period_en: 'Present', description: 'Thành viên tích cực của các đội CTF: B0w_B3f0r3^US và 6h4T 9pT pR0. Tham gia các giải đấu như mCTF và UMassCTF.', description_en: 'Active member of CTF teams: B0w_B3f0r3^US and 6h4T 9pT pR0. Competing in events like mCTF and UMassCTF.' }
    ];
    const stmtExp = db.prepare(`INSERT INTO experience (job, job_en, period, period_en, description, description_en) VALUES (?, ?, ?, ?, ?, ?)`);
    experiences.forEach(e => stmtExp.run(e.job, e.job_en, e.period, e.period_en, e.description, e.description_en));
    stmtExp.finalize();

    // Projects
    const projects = [
        { name: "ACEDA IMS (aceda.id.vn)", role: "Lập trình viên chính", role_en: "Lead Developer", description: "Nền tảng học thuật được thiết kế để lưu trữ tài liệu giáo trình và quản lý thi trực tuyến cho học sinh trung học phổ thông.", description_en: "Academic platform designed to store curriculum materials and manage online testing for high school students." },
        { name: "Phishing/Malicious URL Detector", role: "Lập trình viên", role_en: "Developer", description: "Bảng điều khiển an ninh mạng tích hợp AI sử dụng ReactJS, FastAPI và TailwindCSS.", description_en: "AI-driven cybersecurity dashboard utilizing ReactJS, FastAPI, and TailwindCSS." },
        { name: "Visual DoS Attack Architecture on Legacy Edge Servers", role: "Nghiên cứu viên", role_en: "Researcher", description: "Bài báo nghiên cứu và khung hệ thống tập trung vào các lỗ hổng thị giác máy tính (Giải thưởng NCKH sinh viên toàn quốc Euréka).", description_en: "Research paper and system framework focused on machine vision vulnerabilities (Euréka national scientific competition)." }
    ];
    const stmtProj = db.prepare(`INSERT INTO projects (name, role, role_en, description, description_en) VALUES (?, ?, ?, ?, ?)`);
    projects.forEach(p => stmtProj.run(p.name, p.role, p.role_en, p.description, p.description_en));
    stmtProj.finalize();

    // Achievements
    const achievements = [
        "CEH v12 - Certified Ethical Hacker",
        "HackTheBox - Pro Hacker Rank",
        "Bug Bounty - Top 100 VDP",
        "Medium - CVE Write-ups"
    ];
    const stmtAch = db.prepare(`INSERT INTO achievements (name) VALUES (?)`);
    achievements.forEach(a => stmtAch.run(a));
    stmtAch.finalize();

    // Payment
    const payments = [
        { bankName: 'PayPal', accountName: 'Phạm Tuấn Anh', accountNumber: 'ptuananh7787@gmail.com', addInfo: 'Cảm ơn bạn đã ủng hộ!', addInfo_en: 'Thank you for your support!', qrCode: '' },
        { bankName: 'Momo', accountName: 'Phạm Tuấn Anh', accountNumber: '0399737867', addInfo: 'Vui lòng kèm theo lời nhắn nhé!', addInfo_en: 'Please include a transfer message!', qrCode: '' }
    ];
    const stmtPay = db.prepare(`INSERT INTO payment (bankName, accountName, accountNumber, addInfo, addInfo_en, qrCode) VALUES (?, ?, ?, ?, ?, ?)`);
    payments.forEach(p => stmtPay.run(p.bankName, p.accountName, p.accountNumber, p.addInfo, p.addInfo_en, p.qrCode));
    stmtPay.finalize();

    console.log("Database seeded successfully.");
});

module.exports = db;
