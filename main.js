// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 15 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const isDecimal = target % 1 !== 0;
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
  }, 16);
}

// ===== INTERSECTION OBSERVER =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate counters in hero
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        animateCounter(el);
      });

      // Animate bars
      entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.animation = `barGrow 0.7s ease forwards`;
        }, i * 100);
      });

      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.slide, .stat-card, .cause-card, .world-card, .timeline-item, .contrib-card').forEach(el => io.observe(el));

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(240,192,64,0.2)';
  } else {
    nav.style.borderBottomColor = '#30363D';
  }

  // Active nav link
  const sections = document.querySelectorAll('.slide[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#F0C040' : '';
  });
});

// ===== BURGER MENU =====
const burger = document.getElementById('burgerBtn');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL-REVEAL CARDS =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (entry.target.dataset.delay || 0) * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .cause-card, .world-card, .contrib-card, .fact-box, .ilo-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.delay = i % 4;
  revealObserver.observe(el);
});

// ===== SMOOTH ACTIVE SLIDE INDICATOR =====
const slides = document.querySelectorAll('.slide');
const navAs = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAs.forEach(a => {
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = '#F0C040';
          a.style.background = 'rgba(240,192,64,0.1)';
        } else {
          a.style.color = '';
          a.style.background = '';
        }
      });
    }
  });
}, { threshold: 0.5 });
slides.forEach(s => activeObserver.observe(s));

// ===== BAR CHART TOOLTIP =====
document.querySelectorAll('.bar-fill').forEach(bar => {
  bar.addEventListener('mouseenter', () => {
    bar.style.filter = 'brightness(1.4) drop-shadow(0 0 12px rgba(240,192,64,0.5))';
  });
  bar.addEventListener('mouseleave', () => {
    bar.style.filter = '';
  });
});
