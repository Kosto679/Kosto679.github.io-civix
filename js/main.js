(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const revealEls = document.querySelectorAll('.reveal');
  const previewPanels = document.querySelectorAll('.preview-panel');
  const previewDots = document.querySelectorAll('.preview-dot');
  let activePanelIndex = 0;
  let previewInterval = null;

  /* Scroll: header background */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  navToggle.addEventListener('click', () => {
    const open = navToggle.classList.toggle('open');
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Intersection Observer: reveal on scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* Preview carousel */
  function setActivePanel(index) {
    activePanelIndex = index;
    previewPanels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
    previewDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
  }

  previewPanels.forEach((panel, index) => {
    panel.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 961px)').matches) {
        setActivePanel(index);
        resetPreviewAutoplay();
      }
    });

    panel.addEventListener('click', () => {
      setActivePanel(index);
      resetPreviewAutoplay();
    });
  });

  previewDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setActivePanel(Number(dot.dataset.index));
      resetPreviewAutoplay();
    });
  });

  function startPreviewAutoplay() {
    if (window.matchMedia('(max-width: 960px)').matches) {
      previewInterval = setInterval(() => {
        setActivePanel((activePanelIndex + 1) % previewPanels.length);
      }, 5000);
    }
  }

  function resetPreviewAutoplay() {
    clearInterval(previewInterval);
    startPreviewAutoplay();
  }

  startPreviewAutoplay();

  /* Smooth anchor offset for fixed header */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#top') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Parallax orbs (subtle) */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        document.querySelectorAll('.orb').forEach((orb, i) => {
          orb.style.transform = `translateY(${y * (0.03 + i * 0.02)}px)`;
        });
      },
      { passive: true }
    );
  }
})();
