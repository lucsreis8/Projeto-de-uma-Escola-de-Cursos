
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 700);
    }
});

const themeBtns = document.querySelectorAll(".theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });
});

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

const searchInput = document.getElementById("searchInput");
const courses = document.querySelectorAll(".course-card");

if (searchInput && courses.length > 0) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        courses.forEach(course => {
            const title = course.querySelector("h3").textContent.toLowerCase();
            course.style.display = title.includes(value) ? "block" : "none";
        });
    });
}

let lastScroll = 0;
const topBar = document.querySelector(".top-bar");

if (topBar) {
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 50) {
            topBar.classList.add("hide");
        } else {
            topBar.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
}


const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("name")?.value || "";
        const email = document.getElementById("email")?.value || "";
        const mensagem = document.getElementById("message")?.value || "";

        const numero = "5561991795648";

        const texto = `Olá! Vim pelo site da Exata Cursos.

Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");
    });
}


const canvas = document.getElementById("bg");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            vx: (Math.random() - 0.5),
            vy: (Math.random() - 0.5)
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "#65B307";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}