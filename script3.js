// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('show');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ===== Navbar background + active link on scroll =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#menu a[href^="#"]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ===== Typewriter effect =====
const roles = ['Web Development Enthusiast', 'Database Design Lover', 'B.Tech CSE Student'];
const typewriterEl = document.getElementById('typewriterText');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();

// ===== Scroll-triggered reveal animations =====
// IMPORTANT: sections start VISIBLE by default. We only add the
// "pre-reveal" (hidden) class here, once JS has actually loaded and run.
// If this script ever fails to load, the sections simply stay visible
// instead of being permanently stuck at opacity: 0.
const revealEls = document.querySelectorAll('.reveal');

revealEls.forEach(el => el.classList.add('pre-reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      entry.target.classList.remove('pre-reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));