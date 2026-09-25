/* ============================================================
   MET CLUB — Interactions
   Clean, minimal — no gimmicks
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──── Navbar scroll ────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  // ──── Mobile menu ──────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ──── Smooth scroll ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });


  // ──── Scroll reveal ────────────────────────────────
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  reveals.forEach(el => observer.observe(el));





  // ──── Form: Connect ────────────────────────────────
  setupForm('connect-form', 'connect-submit-btn', 'connect-success', 'connect-email');

  function setupForm(formId, btnId, successId, emailId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(f => {
        if (!f.value.trim()) {
          valid = false;
          f.style.borderColor = '#c44';
          f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true });
        }
      });

      const email = document.getElementById(emailId);
      if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        email.style.borderColor = '#c44';
      }

      if (valid) {
        const btn = document.getElementById(btnId);
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        setTimeout(() => {
          form.style.display = 'none';
          success.classList.add('show');
        }, 1100);
      }
    });
  }


  // ──── Footer year ──────────────────────────────────
  // Automatically updates the copyright year in the footer so it's never out of date
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ════════════════════════════════════════════════════════════════
  // DYNAMIC CONTENT INJECTION (Driven by config.js)
  // ════════════════════════════════════════════════════════════════
  // This section reads the SITE_CONFIG object from config.js and automatically
  // generates the HTML for the Team, Events, and Projects sections.
  // This allows you to easily update site content purely by editing config.js!

  if (typeof SITE_CONFIG !== 'undefined') {
    
    // 1. INJECT TEAM MEMBERS (index.html)
    // Grabs the empty container with id="dynamic-team" and fills it with cards
    const teamContainer = document.getElementById('dynamic-team');
    if (teamContainer && SITE_CONFIG.team) {
      SITE_CONFIG.team.forEach((member, i) => {
        // Stagger the animation delay for a cascading "waterfall" effect
        const delay = 0.1 + (i * 0.1); 
        teamContainer.innerHTML += `
        <div class="team-member reveal" style="transition-delay:${delay}s">
          <div class="team-photo-wrap">
            <img src="${member.image}" alt="${member.name}">
            <div class="team-overlay"></div>
            <div class="team-socials">
              <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="team-social" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 110-4.128 2.064 2.064 0 010 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="${member.github}" target="_blank" rel="noopener noreferrer" class="team-social" aria-label="GitHub"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.95 11.95 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
            </div>
          </div>
          <h3 class="team-name">${member.name}</h3>
          <p class="team-role">${member.role}</p>
        </div>`;
      });
    }

    // 2. INJECT EVENTS TIMETABLE (index.html)
    // Fills the calendar section row-by-row with upcoming events
    const eventsContainer = document.getElementById('dynamic-events');
    if (eventsContainer && SITE_CONFIG.events) {
      SITE_CONFIG.events.forEach(ev => {
        eventsContainer.innerHTML += `
        <div class="timetable-row">
          <span class="timetable-date">${ev.date}</span>
          <span class="timetable-title">${ev.title}</span>
          <span class="timetable-meta">${ev.meta}</span>
        </div>`;
      });
    }

    // 3. INJECT SHOWCASE PROJECTS (showcase.html)
    // Populates the community projects grid with their images and links
    const projectsContainer = document.getElementById('dynamic-projects');
    if (projectsContainer && SITE_CONFIG.projects) {
      SITE_CONFIG.projects.forEach((proj, i) => {
        const delay = i * 0.1;
        projectsContainer.innerHTML += `
        <div class="team-card reveal" style="transition-delay: ${delay}s;">
          <div class="team-img-wrap" style="aspect-ratio: 16/9;">
            <img src="${proj.image}" alt="${proj.title}">
          </div>
          <div class="team-info">
            <h3 class="team-name">${proj.title}</h3>
            <p class="team-role">By ${proj.author}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${proj.description}</p>
            <a href="${proj.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 1rem; color: var(--green); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; text-decoration: none;">View Project &rarr;</a>
          </div>
        </div>`;
      });
    }

    // 4. RE-INITIALIZE OBSERVER
    // Because we just dynamically added new HTML elements that have the ".reveal" class,
    // we need to tell the IntersectionObserver to start watching these new elements
    // so they smoothly animate in when the user scrolls down to them!
    const newReveals = document.querySelectorAll('.reveal:not(.visible)');
    newReveals.forEach(el => observer.observe(el));
  }

});
