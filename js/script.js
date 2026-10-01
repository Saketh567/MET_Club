/* ============================================================
   MET CLUB - Interactions
   Clean, minimal - no gimmicks
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

  // ════════════════════════════════════════════════════════════════
  // STEP 0: LOAD SHARED COMPONENTS (Navbar & Footer)
  // Fetches the single-source-of-truth partials from /components/
  // and injects them into every page automatically.
  // To update the nav or footer across ALL pages, edit those files.
  // ════════════════════════════════════════════════════════════════
  try {
    const [navbarHTML, footerHTML] = await Promise.all([
      fetch('components/navbar.html').then(r => r.text()),
      fetch('components/footer.html').then(r => r.text()),
    ]);

    const navPlaceholder = document.getElementById('site-navbar');
    if (navPlaceholder) navPlaceholder.outerHTML = navbarHTML;

    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
  } catch (e) {
    // Components failed to load (e.g. opened as a local file:// without a server).
    // The page will still work - nav/footer just won't appear. Use a local server.
    console.warn('MET: Could not load shared components. Run via a local web server.', e);
  }


  // ──── Navbar scroll ────────────────────────────────
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }


  // ──── Mobile menu ──────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    // Helper function to toggle menu state
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    };

    hamburger.addEventListener('click', toggleMenu);

    // Keyboard accessibility for hamburger menu
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ──── Smooth scroll ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = (navbar ? navbar.offsetHeight : 0) + 20;
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


  // ──── Forms ────────────────────────────────────────
  setupForm('connect-form', 'connect-submit-btn', 'connect-success', 'connect-email');
  setupForm('story-form',   'story-submit-btn',   'story-success',   'story-email');

  function setupForm(formId, btnId, successId, emailId) {
    const form    = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form) return;

    // Check if we just returned from a successful FormSubmit redirect
    if (window.location.search.includes('submitted=true')) {
      form.style.display = 'none';
      if (success) success.classList.add('show');

      // Clean up the URL so it looks nice
      const anchor   = form.closest('section') ? form.closest('section').id : 'contact';
      const cleanUrl = window.location.href.split('?')[0] + '#' + anchor;
      window.history.replaceState(null, null, cleanUrl);
      return; // Don't setup the submit listener since form is already gone
    }

    form.addEventListener('submit', e => {
      let valid = true;

      form.querySelectorAll('[required]').forEach(f => {
        if (!f.value.trim()) {
          valid = false;
          f.style.borderColor = '#c44';
          f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true });
        }
      });

      const email = emailId ? document.getElementById(emailId) : null;
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        email.style.borderColor = '#c44';
      }

      if (!valid) {
        e.preventDefault(); // Stop if invalid
      } else {
        // Form is valid! Allow native submission.
        const btn = document.getElementById(btnId);
        btn.textContent = 'Redirecting...';
        btn.style.opacity = '0.6';

        // Use SITE_CONFIG as the single source of truth for the contact email
        const targetEmail = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.contactEmail)
          ? SITE_CONFIG.contactEmail
          : '1873reddy1873@gmail.com';

        form.action = `https://formsubmit.co/${targetEmail}`;

        // Create a dynamic _next field to bounce the user right back here with ?submitted=true
        let nextInput = form.querySelector('input[name="_next"]');
        if (!nextInput) {
          nextInput = document.createElement('input');
          nextInput.type = 'hidden';
          nextInput.name = '_next';
          form.appendChild(nextInput);
        }

        // The URL to bounce back to
        const anchor    = form.closest('section') ? form.closest('section').id : 'contact';
        const returnUrl = window.location.href.split('?')[0].split('#')[0] + '?submitted=true#' + anchor;
        nextInput.value = returnUrl;
      }
    });
  }


  // ──── Footer year ──────────────────────────────────
  // Automatically updates the copyright year so it's never out of date.
  // #year lives inside the footer component, which is now loaded above.
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ════════════════════════════════════════════════════════════════
  // DYNAMIC CONTENT INJECTION (Driven by config.js)
  // Reads SITE_CONFIG and generates HTML for Team, Events, Projects.
  // To update content, edit config.js only. No HTML changes needed.
  // ════════════════════════════════════════════════════════════════
  if (typeof SITE_CONFIG !== 'undefined') {

    // 1. INJECT TEAM MEMBERS (index.html)
    const teamContainer = document.getElementById('dynamic-team');
    if (teamContainer && SITE_CONFIG.team) {
      teamContainer.innerHTML = SITE_CONFIG.team.map((member, i) => {
        const delay = 0.1 + (i * 0.1);
        return `
        <div class="team-member reveal" style="transition-delay:${delay}s">
          <div class="team-photo-wrap">
            <img src="${member.image}" alt="${member.name}" style="object-position: ${member.imagePosition || 'center'};">
            <div class="team-overlay"></div>
            <div class="team-socials">
              <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="team-social" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 110-4.128 2.064 2.064 0 010 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="${member.github}" target="_blank" rel="noopener noreferrer" class="team-social" aria-label="GitHub"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.95 11.95 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
            </div>
          </div>
          <h3 class="team-name">${member.name}</h3>
          <p class="team-role">${member.role}</p>
        </div>`;
      }).join('');
    }


    // 1.5 INJECT TEAM SLIDER (team.html)
    const sliderTrack = document.getElementById('team-slider-track');
    if (sliderTrack && SITE_CONFIG.team && SITE_CONFIG.team.length > 0) {
      const createSlideHTML = (member) => `
        <div class="team-slide" style="flex: 0 0 100%;">
          <div class="team-slide-sidebar">
            <img src="${member.image}" alt="${member.name}" loading="lazy" class="full-length-img" style="object-position: ${member.imagePosition || 'center'};" />
          </div>
          <div class="team-slide-main">
            <div class="main-header">
               <h3 class="main-name">${member.name.toUpperCase()}</h3>
               <p class="main-role">${member.role.toUpperCase()}</p>
            </div>
            <p class="main-bio">${member.bio || "No biography available."}</p>

            <div class="tech-dashboard">
              ${member.skills ? `
              <div class="quick-stats-card">
                 <h5>QUICK STATS</h5>
                 <div class="stats-list">
                    ${member.skills.map(s => `
                      <div class="stat-item">
                        <div class="stat-label"><span>${s.name || s}</span> <span>${s.level || 80}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${s.level || 80}%"></div></div>
                      </div>
                    `).join('')}
                 </div>
              </div>
              ` : ''}

              ${member.currentProject ? `
              <div class="current-project-wrapper">
                  <div class="current-project-card">
                     <div class="project-badge">CURRENTLY WORKING ON</div>
                     <p class="project-title">${typeof member.currentProject === 'string' ? member.currentProject : member.currentProject.title}</p>
                     ${member.currentProject.desc ? `<p class="project-desc">${member.currentProject.desc}</p>` : ''}
                  </div>
                  <div class="action-buttons">
                     <button class="action-btn">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                       Message
                     </button>
                     <button class="action-btn">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                       Network
                     </button>
                     <button class="action-btn">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                       Follow
                     </button>
                  </div>
              </div>
              ` : ''}
            </div>
          </div>
        </div>`;

      // Populate slider with all members
      sliderTrack.innerHTML = SITE_CONFIG.team.map(createSlideHTML).join('');

      // True Infinite Loop Logic
      let isAnimating = false;

      const nextBtn = document.getElementById('slider-next');
      const prevBtn = document.getElementById('slider-prev');

      nextBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        sliderTrack.style.transform = 'translateX(-100%)';

        setTimeout(() => {
          sliderTrack.style.transition = 'none';
          sliderTrack.appendChild(sliderTrack.firstElementChild);
          sliderTrack.style.transform = 'translateX(0)';
          isAnimating = false;
        }, 500);
      });

      prevBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // Move the last element to the front instantaneously
        sliderTrack.style.transition = 'none';
        sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
        sliderTrack.style.transform = 'translateX(-100%)';

        // Force reflow
        void sliderTrack.offsetWidth;

        sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        sliderTrack.style.transform = 'translateX(0)';

        setTimeout(() => { isAnimating = false; }, 500);
      });
    }


    // 2. INJECT EVENTS TIMETABLE (index.html)
    const eventsContainer = document.getElementById('dynamic-events');
    if (eventsContainer && SITE_CONFIG.events) {
      if (SITE_CONFIG.events.length === 0) {
        // No events yet. Show a friendly stay-tuned message.
        eventsContainer.innerHTML = `
          <div style="text-align: center; padding: 4rem 2rem; border: 1px dashed var(--border); border-radius: 12px; background: var(--white);">
            <p style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green); margin-bottom: 1rem;">/ COMING SOON</p>
            <h3 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 400; color: var(--black); margin-bottom: 1rem;">More events on the way.</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 2rem; line-height: 1.7;">We're busy planning workshops, hackathons and study circles. Check back often. Exciting things are brewing!</p>
            <a href="events.html" style="display: inline-block; padding: 0.75rem 2.5rem; background: var(--green); color: var(--white); border-radius: var(--r-pill); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none;">Visit Events Page</a>
          </div>`;
      } else {
        eventsContainer.innerHTML = SITE_CONFIG.events.map((ev, index) => `
          <div class="timetable-row">
            <span class="timetable-date">${ev.date}</span>
            <span class="timetable-title">${ev.title}</span>
            <span class="timetable-meta">${ev.meta}</span>
            <a href="events.html#event-${index}" class="view-event-btn" style="text-decoration:none; display:inline-block; text-align:center;">View Event</a>
          </div>`).join('');
      }
    }

    // 2.5. INJECT FULL EVENTS LIST (events.html)
    const eventsPageContainer = document.getElementById('dynamic-events-page');
    if (eventsPageContainer && SITE_CONFIG.events) {
      if (SITE_CONFIG.events.length === 0) {
        // No events yet. Show a full-width stay-tuned message.
        eventsPageContainer.innerHTML = `
          <div style="text-align: center; padding: 6rem 2rem; border: 1px dashed var(--border); border-radius: 16px; background: var(--white); box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 2rem; display: block; opacity: 0.8;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <p style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--green); margin-bottom: 1.5rem;">/ STAY TUNED</p>
            <h2 style="font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; color: var(--black); margin-bottom: 1.5rem; line-height: 1.2;">Events are on the way.</h2>
            <p style="color: var(--text-muted); font-size: 1rem; max-width: 560px; margin: 0 auto 1rem; line-height: 1.8;">We're currently planning our next round of workshops, hackathons, and collaborative sessions. Our schedule fills up fast so visit this page often. You don't want to miss out.</p>
            <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 480px; margin: 0 auto 3rem; line-height: 1.7;">Have an idea for an event or want to help organise one? We'd love to hear from you.</p>
            <a href="index.html#contact" style="display: inline-block; padding: 1rem 3rem; background: var(--green); color: var(--white); border-radius: var(--r-pill); font-size: 0.9rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: var(--t-fast);">Get In Touch</a>
          </div>`;
      } else {
        eventsPageContainer.innerHTML = SITE_CONFIG.events.map((ev, index) => `
          <div class="event-detail-card reveal" id="event-${index}" style="background: var(--surface); padding: 3rem; margin-bottom: 2rem; border-radius: 8px; border: 1px solid var(--border); transition-delay: ${index * 0.1}s; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <p style="color: var(--green); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 0.5rem;">${ev.date} | ${ev.meta}</p>
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--black); font-family: var(--font-serif); font-weight: normal;">${ev.title}</h2>
            <p style="color: var(--text-muted); line-height: 1.8;">${ev.details || "No additional details available at this time."}</p>
          </div>`).join('');
      }
    }

    // 3. INJECT SHOWCASE PROJECTS (showcase.html)
    const projectsContainer = document.getElementById('dynamic-projects');
    if (projectsContainer && SITE_CONFIG.projects) {
      if (SITE_CONFIG.projects.length === 0) {
        projectsContainer.innerHTML = `
          <div style="text-align: center; padding: 6rem 2rem; border: 1px dashed var(--border); border-radius: 12px; background: var(--white); grid-column: 1 / -1; margin-bottom: 2rem;">
            <p style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green); margin-bottom: 1rem;">/ YOUR WORK HERE</p>
            <h3 style="font-family: var(--font-serif); font-size: 2.5rem; font-weight: 400; color: var(--black); margin-bottom: 1.5rem;">Have a project to share?</h3>
            <p style="color: var(--text-muted); font-size: 1rem; max-width: 560px; margin: 0 auto 2rem; line-height: 1.7;">We're looking for innovative projects built by MET members to feature in our showcase. Whether it's a hackathon build, a personal project, or a club collaboration, we want to see it.</p>
            <a href="#submit" style="display: inline-block; padding: 0.85rem 3rem; background: var(--green); color: var(--white); border-radius: var(--r-pill); font-size: 0.9rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none;">Submit Your Project</a>
          </div>`;
      } else {
        projectsContainer.innerHTML = SITE_CONFIG.projects.map((proj, i) => `
          <div class="team-card reveal" style="transition-delay: ${i * 0.1}s;">
            <div class="team-img-wrap" style="aspect-ratio: 16/9;">
              <img src="${proj.image}" alt="${proj.title}">
            </div>
            <div class="team-info">
              <h3 class="team-name">${proj.title}</h3>
              <p class="team-role">By ${proj.author}</p>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${proj.description}</p>
              <a href="${proj.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 1rem; color: var(--green); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; text-decoration: none;">View Project &rarr;</a>
            </div>
          </div>`).join('');
      }
    }

    // 3.5. INJECT PROJECTS PREVIEW (index.html) (shows first 3 only)
    const projectsPreviewContainer = document.getElementById('dynamic-projects-preview');
    if (projectsPreviewContainer && SITE_CONFIG.projects) {
      if (SITE_CONFIG.projects.length === 0) {
        projectsPreviewContainer.innerHTML = `
          <div style="text-align: center; padding: 4rem 2rem; border: 1px dashed var(--border); border-radius: 12px; background: var(--white); grid-column: 1 / -1; margin-bottom: 2rem;">
            <p style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green); margin-bottom: 1rem;">/ SHOWCASE</p>
            <h3 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 400; color: var(--black); margin-bottom: 1rem;">Submit your work</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 2rem; line-height: 1.7;">We want to showcase the best projects from the MET community. Have you built something cool recently?</p>
            <a href="showcase.html#submit" style="display: inline-block; padding: 0.75rem 2.5rem; background: var(--green); color: var(--white); border-radius: var(--r-pill); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none;">Add Your Project</a>
          </div>`;
      } else {
        projectsPreviewContainer.innerHTML = SITE_CONFIG.projects.slice(0, 3).map((proj, i) => `
          <div class="team-card reveal" style="transition-delay: ${i * 0.1}s;">
            <div class="team-img-wrap" style="aspect-ratio: 16/9;">
              <img src="${proj.image}" alt="${proj.title}">
            </div>
            <div class="team-info">
              <h3 class="team-name">${proj.title}</h3>
              <p class="team-role">By ${proj.author}</p>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${proj.description}</p>
            </div>
          </div>`).join('');
      }
    }

    // 4. RE-INITIALIZE OBSERVER for dynamically added .reveal elements
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

});
