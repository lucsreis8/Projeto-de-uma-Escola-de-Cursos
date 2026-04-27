/* ================= LOADER ================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 800);
    }
});


/* ================= TEMA ================= */
const themeBtns = document.querySelectorAll(".theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });
});


/* ================= MENU MOBILE ================= */
const menuBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove("active");
        }
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });
}


/* ================= SLIDER INÍCIO ================= */
const homeTrack = document.getElementById("carouselTrack");
const homeSlides = homeTrack ? homeTrack.querySelectorAll(".slide") : [];

const homeNext = document.getElementById("nextBtn");
const homePrev = document.getElementById("prevBtn");

let homeIndex = 0;

function updateHomeSlider() {
    if (homeTrack) {
        homeTrack.style.transform = `translateX(-${homeIndex * 100}%)`;
    }
}

if (homeTrack && homeNext && homePrev && homeSlides.length > 0) {

    homeNext.addEventListener("click", () => {
        homeIndex = (homeIndex + 1) % homeSlides.length;
        updateHomeSlider();
    });

    homePrev.addEventListener("click", () => {
        homeIndex = (homeIndex - 1 + homeSlides.length) % homeSlides.length;
        updateHomeSlider();
    });

    setInterval(() => {
        homeIndex = (homeIndex + 1) % homeSlides.length;
        updateHomeSlider();
    }, 4000);
}


/* ================= SLIDER SOBRE (CORRIGIDO) ================= */
const aboutTrack = document.getElementById("aboutSlides");
const aboutSlides = aboutTrack ? aboutTrack.querySelectorAll(".slide") : [];

const aboutNext = document.getElementById("aboutNext");
const aboutPrev = document.getElementById("aboutPrev");

let aboutIndex = 0;

function updateAboutSlider() {
    if (aboutTrack) {
        aboutTrack.style.transform = `translateX(-${aboutIndex * 100}%)`;
    }
}

if (aboutTrack && aboutNext && aboutPrev && aboutSlides.length > 0) {

    aboutNext.addEventListener("click", () => {
        aboutIndex = (aboutIndex + 1) % aboutSlides.length;
        updateAboutSlider();
    });

    aboutPrev.addEventListener("click", () => {
        aboutIndex = (aboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
        updateAboutSlider();
    });

    setInterval(() => {
        aboutIndex = (aboutIndex + 1) % aboutSlides.length;
        updateAboutSlider();
    }, 4000);
}


/* ================= HEADER SCROLL ================= */
let lastScroll = 0;
const header = document.querySelector(".desktop-header");

if (header) {
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove("hide-top");
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 50) {
            header.classList.add("hide-top");
        } else {
            header.classList.remove("hide-top");
        }

        lastScroll = currentScroll;
    });
}


/* ================= FAQ ================= */
document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    }
});


/* ================= FILTRO DE CURSOS ================= */
const filterBtns = document.querySelectorAll(".categories button");
const cards = document.querySelectorAll(".course-card");

function showDefault() {
    cards.forEach((card, index) => {
        card.style.display = index < 3 ? "block" : "none";
    });
}

if (cards.length > 0) showDefault();

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        if (filter === "all") {
            showDefault();
            return;
        }

        cards.forEach(card => {
            const category = card.getAttribute("data-category");
            card.style.display = category === filter ? "block" : "none";
        });
    });
});


/* ================= SCROLL SUAVE ================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* ================= CANVAS ================= */
const canvas = document.getElementById("bg");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y -= p.speedY;

            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(101,179,7,0.6)";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

const botoes = document.querySelectorAll(".btn-main");

botoes.forEach(botao => {
    botao.addEventListener("click", function(e) {
        e.preventDefault();

        const card = this.closest(".course-card");
        const curso = card.querySelector("h3").textContent;

        const numero = "5561991795648";

        const mensagem = `Olá! Tenho interesse no curso de ${curso}.

Gostaria de saber:
• Valor
• Horários
• Se ainda tem vaga`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    });
});