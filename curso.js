/* LOADER */
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 700);
});

/* DARK MODE */
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

/* CANVAS PARTICULAS */
const canvas = document.getElementById("bg");
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

const menuBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

/* abrir / fechar */
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita fechar ao clicar nele mesmo
    mobileMenu.classList.toggle("active");
});


/* fechar ao clicar fora */
document.addEventListener("click", (e) => {

    const clicouFora =
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target);

    if (clicouFora) {
        mobileMenu.classList.remove("active");
    }
});


/* fechar ao clicar nos links */
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

const searchInput = document.getElementById("searchInput");
const courses = document.querySelectorAll(".course-card");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    courses.forEach(course => {
        const title = course.querySelector("h3").textContent.toLowerCase();

        if (title.includes(value)) {
            course.style.display = "block";
        } else {
            course.style.display = "none";
        }
    });
});

const botoes = document.querySelectorAll(".btn-course");

botoes.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const curso = btn.getAttribute("data-curso");

        const mensagem = `Olá! 
Vim pelo site da Exata Cursos.

Tenho interesse no curso de *${curso}* 

Poderia me informar:
• Se ainda há vagas
• Valores
• Como funciona o curso

Fico no aguardo, obrigado!`;

        const telefone = "5561991795648";

        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    });
});

let lastScroll = 0;
const topBar = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        // descendo
        topBar.classList.add("hide");
    } else {
        // subindo
        topBar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});