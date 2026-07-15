const currentLang = localStorage.getItem('lang') || 'vi';

const i18n = {
    'vi': {
        'about': '<i class="fa-solid fa-user-astronaut"></i> Về tôi',
        'socials': '<i class="fa-solid fa-hashtag"></i> Mạng xã hội',
        'contact': '<i class="fa-solid fa-envelope"></i> Liên hệ',
        'skills': '<i class="fa-solid fa-code"></i> Kỹ năng',
        'experience': '<i class="fa-solid fa-briefcase"></i> Kinh nghiệm',
        'certs': '<i class="fa-solid fa-certificate"></i> Chứng chỉ & Thành tích',
        'payment': '<i class="fa-solid fa-wallet"></i> Donate'
    },
    'en': {
        'about': '<i class="fa-solid fa-user-astronaut"></i> About Me',
        'socials': '<i class="fa-solid fa-hashtag"></i> Connect',
        'contact': '<i class="fa-solid fa-envelope"></i> Contact',
        'skills': '<i class="fa-solid fa-code"></i> Skills',
        'experience': '<i class="fa-solid fa-briefcase"></i> Experience',
        'certs': '<i class="fa-solid fa-certificate"></i> Certifications & Write-ups',
        'payment': '<i class="fa-solid fa-wallet"></i> Donate'
    }
};

// Data dictionary to translate backend strings to English
const dataDict = {
    'vi': {},
    'en': {
        'Kỹ sư An toàn thông tin': 'Information Security Engineer',
        'Xin chào! Tôi là Tuấn Anh - Một lập trình viên và kỹ sư an toàn thông tin đam mê công nghệ. Tôi luôn nỗ lực học hỏi mỗi ngày để khám phá những kiến thức mới, tối ưu hóa hệ thống và mang lại những giải pháp phần mềm toàn diện, bảo mật nhất.': 'Hello! I am Tuan Anh - A developer and information security engineer passionate about technology. I constantly strive to learn every day to discover new knowledge, optimize systems, and deliver the most comprehensive and secure software solutions.',
        'Xin chào, tôi là Kỹ sư An toàn thông tin đam mê tìm hiểu về bảo mật và hệ thống.': 'Hello, I am an Information Security Engineer passionate about security and systems.',
        'Xin chào, tôi là Kỹ sư An toàn thông tin.': 'Hello, I am an Information Security Engineer.',
        'Việt Nam': 'Vietnam',
        'Lập trình & Phát triển': 'Programming & Development',
        'Framework & Thư viện': 'Frameworks & Libraries',
        'Cơ sở dữ liệu': 'Databases',
        'An toàn thông tin': 'Information Security',
        'Bảo mật ứng dụng Web, Phân tích mã nguồn': 'Web Application Security, Source Code Analysis',
        'Kiểm thử & Khác': 'Testing & Others',
        'Phân tích & Thiết kế hệ thống, RESTful APIs': 'System Analysis & Design, RESTful APIs',
        'Kỹ sư Bảo mật': 'Security Engineer',
        '2023 - Hiện tại': '2023 - Present',
        'Đánh giá an toàn thông tin, bảo mật hệ thống.': 'Information security assessment and system protection.',
        'Cảm ơn bạn đã ủng hộ!': 'Thank you for your support!',
        'Chuyển khoản kèm lời nhắn nhé!': 'Please include a transfer message!',
        'Chuyển khoản nhé': 'Please include a transfer message!',
        'Hiện tại': 'Present',
        'Tập trung vào an toàn thông tin, bảo mật web, và phát triển các hệ thống an toàn.': 'Focusing on information security, web security, and developing secure systems.',
        'Trước đây': 'Previously',
        'Phát triển web app với Python (Flask/Django) và React.js.': 'Developing web apps with Python (Flask/Django) and React.js.'
    }
};

function translate(text, lang) {
    if (!text) return text;
    if (lang === 'en' && dataDict['en'][text]) {
        return dataDict['en'][text];
    }
    return text;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Apply initial language headers
    applyLanguage(currentLang);
    initCustomCursor();
    initTerminal();

    let profileData = null;

    // 1. Fetch Profile Data from Backend
    try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error("Failed to fetch profile");
        profileData = await response.json();
    } catch (err) {
        console.error("Error loading profile data, using fallback:", err);
        profileData = {
            title: "Kỹ sư An toàn thông tin",
            about: "Xin chào, tôi là Kỹ sư An toàn thông tin đam mê tìm hiểu về bảo mật và hệ thống.",
            socials: [
                { name: "Facebook", url: "https://www.facebook.com/tuanh.467/", iconClass: "fa-brands fa-facebook" },
                { name: "Github", url: "https://github.com/reikageisme", iconClass: "fa-brands fa-github" }
            ],
            contact: {
                email: "ptuananh7787@gmail.com",
                phone: "0399737867",
                address: "Việt Nam"
            },
            skills: [
                "Lập trình & Phát triển: Python, JavaScript, HTML, CSS",
                "Framework & Thư viện: Flask, React.js, TailwindCSS, Bootstrap",
                "Cơ sở dữ liệu: SQLite, PostgreSQL, SQLAlchemy ORM",
                "An toàn thông tin: Bảo mật ứng dụng Web, Phân tích mã nguồn",
                "Kiểm thử & Khác: Git, GitHub, Phân tích & Thiết kế hệ thống, RESTful APIs"
            ],
            experience: [
                { job: "Kỹ sư Bảo mật", period: "2023 - Hiện tại", description: "Đánh giá an toàn thông tin, bảo mật hệ thống." }
            ],
            payment: [
                { bankName: "PayPal", accountName: "Phạm Tuấn Anh", accountNumber: "ptuananh7787@gmail.com", addInfo: "Cảm ơn bạn đã ủng hộ!", qrCode: "" },
                { bankName: "Momo", accountName: "Phạm Tuấn Anh", accountNumber: "0399737867", addInfo: "Chuyển khoản kèm lời nhắn nhé!", qrCode: "" }
            ]
        };
    }
    
    // Save to window for re-rendering on lang toggle
    window.currentProfileData = profileData;

    // Render Data to Bento Box
    renderAllData(profileData, currentLang);

    // Show bento container after load
    document.getElementById('bento-container').style.display = 'grid';

    // 4. Init Utilities
    initUtilities();
});

function renderAllData(data, lang) {
    if(!data) return;
    renderProfile(data, lang);
    renderAbout(data.about, lang);
    renderSocials(data.socials, lang);
    renderContact(data.contact, lang);
    renderSkills(data.skills, lang);
    renderExperience(data.experience, lang);
    renderPayment(data.payment, lang);
}

// ========================
// RENDER FUNCTIONS
// ========================

function applyLanguage(lang) {
    let dict = i18n[lang];
    if (!dict) {
        lang = 'vi';
        dict = i18n['vi'];
        localStorage.setItem('lang', 'vi');
    }
    
    if(document.querySelector('#about h2')) document.querySelector('#about h2').innerHTML = dict['about'];
    if(document.querySelector('#socials h2')) document.querySelector('#socials h2').innerHTML = dict['socials'];
    if(document.querySelector('#contact h2')) document.querySelector('#contact h2').innerHTML = dict['contact'];
    if(document.querySelector('#skills h2')) document.querySelector('#skills h2').innerHTML = dict['skills'];
    if(document.querySelector('#experience h2')) document.querySelector('#experience h2').innerHTML = dict['experience'];
    if(document.querySelector('#certifications h2')) document.querySelector('#certifications h2').innerHTML = dict['certs'];
    if(document.querySelector('#payment h2')) document.querySelector('#payment h2').innerHTML = dict['payment'];
    
    const langBtn = document.getElementById('langToggle');
    if(langBtn) {
        langBtn.innerHTML = lang === 'en' ? '<img src="https://flagcdn.com/w40/gb.png" width="30" alt="EN" style="border-radius: 5px;">' : '<img src="https://flagcdn.com/w40/vn.png" width="30" alt="VI" style="border-radius: 5px;">';
    }
}

function renderProfile(data, lang) {
    const titleEl = document.getElementById('userTitle');
    if(titleEl && data.title) {
        titleEl.innerHTML = translate(data.title, lang);
    }
}

function renderAbout(aboutText, lang) {
    const el = document.getElementById('aboutContent');
    if(el) el.innerHTML = translate(aboutText, lang);
}

function renderSocials(socials, lang) {
    const el = document.getElementById('socialsContent');
    if(!el) return;
    
    if(!socials || socials.length === 0) {
        el.innerHTML = "<p>No socials found.</p>";
        return;
    }

    el.innerHTML = socials.map(s => `
        <a href="${s.url}" target="_blank">
            <i class="${s.iconClass}"></i>
            <span>${translate(s.name, lang)}</span>
        </a>
    `).join('');
}

function renderContact(contact, lang) {
    const el = document.getElementById('contactContent');
    if(!el || !contact) return;
    
    let addr = translate(contact.address, lang);
    el.innerHTML = `
        <li><strong>Email:</strong> ${contact.email}</li>
        <li><strong>Phone:</strong> ${contact.phone}</li>
        <li><strong>Location:</strong> ${addr}</li>
    `;
}

function renderSkills(skills, lang) {
    const el = document.getElementById('skillsContent');
    if(!el || !skills) return;

    el.innerHTML = skills.map(skillText => {
        const parts = skillText.split(':');
        if(parts.length > 1) {
            let cat = translate(parts[0].trim(), lang);
            let desc = parts.slice(1).join(':').trim();
            // Try translating known desc
            desc = translate(desc, lang);
            return `<li><strong>${cat}</strong>: ${desc}</li>`;
        }
        return `<li>${translate(skillText, lang)}</li>`;
    }).join('');
}

function renderExperience(exp, lang) {
    const el = document.getElementById('experienceContent');
    if(!el || !exp) return;

    el.innerHTML = exp.map(e => `
        <li>
            <strong>${translate(e.job, lang)} (${translate(e.period, lang)})</strong>
            ${translate(e.description, lang)}
        </li>
    `).join('');
}

function renderPayment(payment, lang) {
    const el = document.getElementById('paymentContent');
    if(!el || !payment) return;

    el.innerHTML = payment.map(p => {
        let iconHtml = '';
        if(p.bankName.toLowerCase().includes('paypal')) {
            iconHtml = '<i class="fa-brands fa-paypal" style="color: #00457C; font-size: 2rem; margin-bottom: 10px;"></i>';
        } else if(p.bankName.toLowerCase().includes('momo')) {
            iconHtml = '<i class="fa-solid fa-wallet" style="color: #a50064; font-size: 2rem; margin-bottom: 10px;"></i>';
        } else {
            iconHtml = '<i class="fa-solid fa-building-columns" style="font-size: 2rem; margin-bottom: 10px;"></i>';
        }

        return `
        <div class="payment-card">
            ${iconHtml}
            <h3>${p.bankName}</h3>
            <p><strong>${p.accountName}</strong></p>
            <p style="user-select: all; font-family: monospace; font-size: 1.1em; background: rgba(0,0,0,0.1); padding: 5px; border-radius: 5px; margin: 10px 0;">${p.accountNumber}</p>
            <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">${translate(p.addInfo, lang)}</p>
            ${p.qrCode ? `<img src="${p.qrCode}" alt="QR Code">` : ''}
        </div>
    `}).join('');
}

// ========================
// UTILITIES
// ========================

function initCustomCursor() {
    const canvas = document.getElementById("spider-canvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, isHovering: false };
    
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        if(mouse.x === -1000) { mouse.x = mouse.targetX; mouse.y = mouse.targetY; }
    });
    
    document.addEventListener("mouseover", (e) => {
        const target = e.target;
        if(target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('.glass-effect')) {
            mouse.isHovering = true;
        } else {
            mouse.isHovering = false;
        }
    });

    // Create web nodes
    const nodes = [];
    for(let i = 0; i < 40; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Interpolate mouse for smoothness
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;

        // Draw main cursor dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.isHovering ? 8 : 4, 0, Math.PI * 2);
        ctx.fillStyle = mouse.isHovering ? "rgba(59, 130, 246, 0.8)" : "#3b82f6";
        ctx.fill();

        // Draw outline if hovering
        if(mouse.isHovering) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
            ctx.fill();
        }

        // Draw and update nodes
        for(let i = 0; i < nodes.length; i++) {
            let p = nodes[i];
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;
            
            // Distance to mouse
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distToMouse = Math.sqrt(dx*dx + dy*dy);
            
            // Draw spider web lines to mouse
            let maxDist = mouse.isHovering ? 200 : 120;
            if(distToMouse < maxDist) {
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(p.x, p.y);
                let opacity = 1 - (distToMouse/maxDist);
                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Pull slightly towards mouse
                p.x += dx * 0.01;
                p.y += dy * 0.01;
            }
            
            // Draw lines between nodes
            for(let j = i + 1; j < nodes.length; j++) {
                let p2 = nodes[j];
                let ndx = p.x - p2.x;
                let ndy = p.y - p2.y;
                let ndist = Math.sqrt(ndx*ndx + ndy*ndy);
                if(ndist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - ndist/80) * 0.2})`;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    animate();
}

function initTerminal() {
    const el = document.getElementById('terminal-content');
    if(!el) return;

    const lines = [
        "root@tuananh:~# nmap -sV -O target.local",
        "Starting Nmap 7.94 ( https://nmap.org )",
        "Nmap scan report for target.local (192.168.1.100)",
        "Host is up (0.012s latency).",
        "PORT   STATE SERVICE VERSION",
        "22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu",
        "80/tcp open  http    Apache httpd 2.4.52",
        "No exact OS matches for host.",
        "",
        "root@tuananh:~# ./exploit.sh",
        "[*] Bypassing security layers...",
        "[*] Injecting payload...",
        "[+] Access granted! root shell opened."
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let html = "";

    function typeLine() {
        if (lineIdx >= lines.length) {
            el.innerHTML = html + '<span class="terminal-cursor"></span>';
            setTimeout(() => {
                // Reset terminal after 10 seconds
                lineIdx = 0; charIdx = 0; html = "";
                el.innerHTML = "";
                typeLine();
            }, 10000);
            return;
        }

        const currentLine = lines[lineIdx];
        
        if (charIdx < currentLine.length) {
            html += currentLine.charAt(charIdx);
            el.innerHTML = html + '<span class="terminal-cursor"></span>';
            charIdx++;
            
            // Randomize typing speed for realism
            let delay = Math.random() * 30 + 20;
            if (currentLine.charAt(charIdx - 1) === ' ') delay += 20;
            
            // Fast output for scan results
            if (lineIdx > 0 && lineIdx < 8) delay = 10;
            
            setTimeout(typeLine, delay);
        } else {
            html += "<br>";
            el.innerHTML = html + '<span class="terminal-cursor"></span>';
            lineIdx++;
            charIdx = 0;
            
            // Delays between specific commands
            let nextDelay = 300;
            if (lineIdx === 1) nextDelay = 800; // wait after nmap
            if (lineIdx === 9) nextDelay = 1500; // wait before exploit
            if (lineIdx === 12) nextDelay = 800; // wait before success
            
            setTimeout(typeLine, nextDelay);
        }
    }

    // Start typing after a short delay
    setTimeout(typeLine, 1000);
}

function initUtilities() {
    // Clock Logic
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        const dateString = now.toLocaleDateString('vi-VN');
        const clockEl = document.getElementById('currentTime');
        if (clockEl) {
            clockEl.textContent = `${timeString} - ${dateString}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Lang Toggle
    const langToggleBtn = document.getElementById('langToggle');
    if(langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = localStorage.getItem('lang') === 'en' ? 'vi' : 'en';
            localStorage.setItem('lang', nextLang);
            applyLanguage(nextLang);
            if(window.currentProfileData) {
                renderAllData(window.currentProfileData, nextLang);
            }
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = themeToggleBtn.querySelector('i');
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.remove('dark');
            const icon = themeToggleBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Scroll to Top logic
    const backToTopBtn = document.getElementById('backToTop');
    const scrollPercentEl = document.getElementById('scrollPercent');
    
    if(backToTopBtn && scrollPercentEl) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
            
            scrollPercentEl.textContent = `${scrollPercent}%`;

            if (scrollTop > 200) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
