// Init Lucide icons (replaces all data-lucide="" elements with proper SVGs)
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});



// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Scroll reveal animation ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ?? 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Apply reveal to cards and blocks
document.querySelectorAll(
  '.schedule-container, .info-block, .room-item, .contact-card, .contact-links, .venue-map, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = el.dataset.delay ?? i;
  revealObserver.observe(el);
});

// ---------- Smooth active nav link highlighting ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.opacity = '0.7';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--clr-primary)';
        activeLink.style.opacity = '1';
      }
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => activeObserver.observe(sec));

// ---------- Particles parallax on mouse move ----------
const particles = document.querySelectorAll('.particle');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  particles.forEach((p, i) => {
    const depth = (i + 1) * 6;
    p.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

// ---------- Countdown to competition ----------
function updateCountdown() {
  // วันอาทิตย์ที่ 19 กรกฎาคม 2569 → 2026-07-19
  const target = new Date('2026-07-19T08:00:00+07:00');
  const now    = new Date();
  const diff   = target - now;

  if (diff <= 0) return; // competition day!

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // If countdown element exists, update it
  const el = document.getElementById('countdown');
  if (el) {
    el.innerHTML = `
      <span class="cd-item"><span class="cd-num">${days}</span><span class="cd-label">วัน</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(hours).padStart(2,'0')}</span><span class="cd-label">ชั่วโมง</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(minutes).padStart(2,'0')}</span><span class="cd-label">นาที</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(seconds).padStart(2,'0')}</span><span class="cd-label">วินาที</span></span>
    `;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

console.log('%c ICPC Thailand 2026 – ภาคกลาง 🟣', 'color:#7c3aed; font-size:14px; font-weight:bold;');
console.log('%c คณะพาณิชยศาสตร์และการบัญชี จุฬาลงกรณ์มหาวิทยาลัย', 'color:#a78bfa; font-size:11px;');
