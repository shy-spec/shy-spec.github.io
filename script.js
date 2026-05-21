/* ============================================================
   NAVBAR — scroll shadow
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ============================================================
   TYPING ANIMATION
   ============================================================ */
const typedEl  = document.getElementById('typed-text');
const phrases  = ['UI/UX Designer', 'Web Designer', 'Project Manager', 'BSIT Student'];
let phraseIdx  = 0;
let charIdx    = 0;
let deleting   = false;
let delay      = 150;

function type() {
  const phrase = phrases[phraseIdx];

  if (deleting) {
    typedEl.textContent = phrase.substring(0, charIdx - 1);
    charIdx--;
    delay = 75;
  } else {
    typedEl.textContent = phrase.substring(0, charIdx + 1);
    charIdx++;
    delay = 150;
  }

  if (!deleting && charIdx === phrase.length) {
    delay    = 2000;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay    = 400;
  }

  setTimeout(type, delay);
}

type();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.reveal, .project-card, .cert-card, .skill-group, .contact-row, .timeline-item, .cta-card'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
