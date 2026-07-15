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
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return; // competition day!

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // If countdown element exists, update it
  const el = document.getElementById('countdown');
  if (el) {
    el.innerHTML = `
      <span class="cd-item"><span class="cd-num">${days}</span><span class="cd-label">วัน</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(hours).padStart(2, '0')}</span><span class="cd-label">ชั่วโมง</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(minutes).padStart(2, '0')}</span><span class="cd-label">นาที</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-item"><span class="cd-num">${String(seconds).padStart(2, '0')}</span><span class="cd-label">วินาที</span></span>
    `;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

console.log('%c ICPC Thailand 2026 – ภาคกลาง 🟣', 'color:#7c3aed; font-size:14px; font-weight:bold;');
console.log('%c คณะพาณิชยศาสตร์และการบัญชี จุฬาลงกรณ์มหาวิทยาลัย', 'color:#a78bfa; font-size:11px;');


// ---------- Contestant Teams Data & Interactive Grid ----------
const contestantTeams = [
  { name: "0x4B 0x55", institution: "Chulalongkorn University" },
  { name: "3Piggies", institution: "Chulalongkorn University" },
  { name: "A Rai Na", institution: "Kasetsart University Bangkhen" },
  { name: "AeyAeySaGaDungGaDingPaDungDing", institution: "Mahidol University" },
  { name: "ANDORXOR", institution: "Mahidol University" },
  { name: "auauP", institution: "King Mongkut's Institute of Technology Ladkrabang" },
  { name: "BigO n is fine", institution: "Silpakorn University Phra Ratchawang Sanam Chan Campus" },
  { name: "BNK42", institution: "King Mongkut's Institute of Technology Ladkrabang" },
  { name: "BUG", institution: "King Mongkut's Institute of Technology Ladkrabang" },
  { name: "CMKL Knickers", institution: "CMKL University" },
  { name: "CSTUTEAM1", institution: "Thammasat University Rangsit Center" },
  { name: "CSTUTEAM2", institution: "Thammasat University Rangsit Center" },
  { name: "CSTUTEAM3", institution: "Thammasat University Rangsit Center" },
  { name: "CSTUTEAM4", institution: "Thammasat University Rangsit Center" },
  { name: "CunKieRook", institution: "Thammasat University" },
  { name: "Freebies", institution: "Kasetsart University Bangkhen" },
  { name: "Ggwp", institution: "Chulalongkorn University" },
  { name: "Hold Your Horse", institution: "Mahidol University" },
  { name: "How did we get here", institution: "Chulalongkorn University" },
  { name: "I cant impl segment tree", institution: "Kasetsart University Bangkhen" },
  { name: "I want to have BF", institution: "Chulalongkorn University" },
  { name: "ICookPanCake", institution: "Chulalongkorn University" },
  { name: "It worked on my machine", institution: "Kasetsart University Bangkhen" },
  { name: "kod Teh jao ka", institution: "Rajamangala University of Technology Thanyaburi" },
  { name: "Kuha", institution: "Chulalongkorn University" },
  { name: "LankaTechno", institution: "Chulalongkorn University" },
  { name: "LingLeast", institution: "King Mongkut's Institute of Technology Ladkrabang" },
  { name: "LunarCroissant", institution: "Chulalongkorn University" },
  { name: "Manchester United", institution: "CMKL University" },
  { name: "MatchaGreenTea", institution: "Mahidol University" },
  { name: "Me and the boys", institution: "King Mongkut's Institute of Technology Ladkrabang" },
  { name: "Mue krue P Teh rue mai", institution: "Rajamangala University of Technology Thanyaburi" },
  { name: "My Fella ACS", institution: "King Mongkut's University of Technology Thonburi" },
  { name: "NoiNa Tae Mai Noi Na", institution: "Rajamangala University of Technology Thanyaburi" },
  { name: "NSX", institution: "Mahidol University" },
  { name: "Powerbug Girl", institution: "Kasetsart University Kamphaeng Saen Campus" },
  { name: "Proof by AC", institution: "Chulalongkorn University" },
  { name: "Slave of Crow", institution: "Mahidol University" },
  { name: "Std", institution: "Chulalongkorn University" },
  { name: "Syntax Error", institution: "Silpakorn University Phra Ratchawang Sanam Chan Campus" },
  { name: "T2K", institution: "Kasetsart University Bangkhen" },
  { name: "Team Name", institution: "Thammasat University Rangsit Center" },
  { name: "The LAN to Your Heart", institution: "Silpakorn University Phra Ratchawang Sanam Chan Campus" },
  { name: "Trust me just pray", institution: "Kasetsart University Bangkhen" },
  { name: "Yutthahatthi", institution: "Chulalongkorn University" }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('teams-container');
  const searchInput = document.getElementById('teams-search');
  const noResults = document.getElementById('teams-no-results');

  if (!container) return;

  let searchQuery = '';

  function renderTeams() {
    container.innerHTML = '';

    const filteredTeams = contestantTeams.filter(team => {
      return team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.institution.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filteredTeams.length === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
      filteredTeams.forEach(team => {
        const item = document.createElement('div');
        item.className = 'team-list-item';
        item.innerHTML = `
          <div class="team-list-name">${team.name}</div>
          <div class="team-list-uni"><i data-lucide="graduation-cap"></i>${team.institution}</div>
        `;
        container.appendChild(item);
      });
      // Re-trigger Lucide icons for dynamically added elements
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderTeams();
    });
  }

  // Initial render
  renderTeams();
});
