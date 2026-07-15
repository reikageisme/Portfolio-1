const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'portfolio.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected.');
        initDB();
    }
});

function initDB() {
    db.serialize(() => {
        // Create tables
        db.run(`CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            title_en TEXT,
            about TEXT,
            about_en TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS socials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            url TEXT,
            iconClass TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            phone TEXT,
            address TEXT,
            address_en TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS experience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job TEXT,
            job_en TEXT,
            period TEXT,
            period_en TEXT,
            description TEXT,
            description_en TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS payment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bankName TEXT,
            accountName TEXT,
            accountNumber TEXT,
            addInfo TEXT,
            addInfo_en TEXT,
            qrCode TEXT
        )`);

        // Check if profile exists, if not seed data
        db.get("SELECT count(*) as count FROM profile", (err, row) => {
            if (row.count === 0) {
                seedData();
            }
        });
    });
}

function seedData() {
    console.log("Seeding initial data...");
    
    // Seed Profile
    db.run(`INSERT INTO profile (title, title_en, about, about_en) VALUES (?, ?, ?, ?)`, 
        ['Kỹ sư An toàn thông tin', 'Information Security Engineer', 'Xin chào, tôi là Kỹ sư An toàn thông tin đam mê tìm hiểu về bảo mật và hệ thống.', 'Hello, I am an Information Security Engineer passionate about security and systems.']
    );

    db.run(`INSERT INTO contact (email, phone, address, address_en) VALUES (?, ?, ?, ?)`,
        ['ptuananh7787@gmail.com', '0399737867', 'Việt Nam', 'Vietnam']
    );

    // Seed Skills
    const skills = [
        ["Lập trình & Phát triển"],
        ["Framework & Thư viện"],
        ["Cơ sở dữ liệu"],
        ["An toàn thông tin"],
        ["Kiểm thử & Khác"]
    ];
    const stmtSkills = db.prepare("INSERT INTO skills (name) VALUES (?)");
    skills.forEach(s => stmtSkills.run(s[0]));
    stmtSkills.finalize();

    // Seed Experience
    const experiences = [
        { job: 'Kỹ sư Bảo mật', job_en: 'Security Engineer', period: '2023 - Hiện tại', period_en: '2023 - Present', description: 'Đánh giá an toàn thông tin, bảo mật hệ thống.', description_en: 'Information security assessment and system protection.' }
    ];
    const stmtExp = db.prepare(`INSERT INTO experience (job, job_en, period, period_en, description, description_en) VALUES (?, ?, ?, ?, ?, ?)`);
    experiences.forEach(e => stmtExp.run(e.job, e.job_en, e.period, e.period_en, e.description, e.description_en));
    stmtExp.finalize();

    // Seed Socials
    const socials = [
        ["Facebook", "https://www.facebook.com/tuanh.467/", "fab fa-facebook"],
        ["Github", "https://github.com/reikageisme", "fab fa-github"]
    ];
    const stmtSocial = db.prepare("INSERT INTO socials (name, url, iconClass) VALUES (?, ?, ?)");
    socials.forEach(s => stmtSocial.run(s[0], s[1], s[2]));
    stmtSocial.finalize();

    // Seed Payment
    const payments = [
        { bankName: 'PayPal', accountName: 'Phạm Tuấn Anh', accountNumber: 'ptuananh7787@gmail.com', addInfo: 'Cảm ơn bạn đã ủng hộ!', addInfo_en: 'Thank you for your support!', qrCode: '' },
        { bankName: 'Momo', accountName: 'Phạm Tuấn Anh', accountNumber: '0399737867', addInfo: 'Chuyển khoản kèm lời nhắn nhé!', addInfo_en: 'Please include a message!', qrCode: '' }
    ];
    const stmtPay = db.prepare(`INSERT INTO payment (bankName, accountName, accountNumber, addInfo, addInfo_en, qrCode) VALUES (?, ?, ?, ?, ?, ?)`);
    payments.forEach(p => stmtPay.run(p.bankName, p.accountName, p.accountNumber, p.addInfo, p.addInfo_en, p.qrCode));
    stmtPay.finalize();
}

module.exports = db;
