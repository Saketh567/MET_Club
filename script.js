/* ============================================================
   MET CLUB - Interactions
   Clean, minimal - no gimmicks
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





  // ──── Forms ────────────────────────────────
  setupForm('connect-form', 'connect-submit-btn', 'connect-success', 'connect-email');
  setupForm('story-form', 'story-submit-btn', 'story-success', 'story-email');

  function setupForm(formId, btnId, successId, emailId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form) return;

    // Check if we just returned from a successful FormSubmit redirect
    if (window.location.search.includes('submitted=true')) {
        form.style.display = 'none';
        if (success) success.classList.add('show');
        
        // Clean up the URL so it looks nice
        const anchor = form.closest('section') ? form.closest('section').id : 'contact';
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
        
        const targetEmail = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.contactEmail) ? SITE_CONFIG.contactEmail : "1873reddy1873@gmail.com";
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
        const anchor = form.closest('section') ? form.closest('section').id : 'contact';
        const returnUrl = window.location.href.split('?')[0].split('#')[0] + "?submitted=true#" + anchor;
        nextInput.value = returnUrl;
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
      });
    }



    // 1.5 INJECT TEAM SLIDER (team.html)
    const sliderTrack = document.getElementById('team-slider-track');
    if (sliderTrack && SITE_CONFIG.team && SITE_CONFIG.team.length > 0) {
      // Create slide HTML
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

      // Populate it normally
      SITE_CONFIG.team.forEach(member => {
        sliderTrack.innerHTML += createSlideHTML(member);
      });

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
        }, 500); // matches transition time
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
        
        // Slide to 0
        sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        sliderTrack.style.transform = 'translateX(0)';
        
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      });
    }



    // 2. INJECT EVENTS TIMETABLE (index.html)
    // Fills the calendar section row-by-row with upcoming events
    const eventsContainer = document.getElementById('dynamic-events');
    if (eventsContainer && SITE_CONFIG.events) {
      SITE_CONFIG.events.forEach((ev, index) => {
        eventsContainer.innerHTML += `
        <div class="timetable-row">
          <span class="timetable-date">${ev.date}</span>
          <span class="timetable-title">${ev.title}</span>
          <span class="timetable-meta">${ev.meta}</span>
          <a href="events.html#event-${index}" class="view-event-btn" style="text-decoration:none; display:inline-block; text-align:center;">View Event</a>
        </div>`;
      });
    }

    // 2.5. INJECT FULL EVENTS LIST (events.html)
    // Fills the dedicated events page with detailed event information
    const eventsPageContainer = document.getElementById('dynamic-events-page');
    if (eventsPageContainer && SITE_CONFIG.events) {
      SITE_CONFIG.events.forEach((ev, index) => {
        const delay = index * 0.1;
        eventsPageContainer.innerHTML += `
        <div class="event-detail-card reveal" id="event-${index}" style="background: var(--surface); padding: 3rem; margin-bottom: 2rem; border-radius: 8px; border: 1px solid var(--border); transition-delay: ${delay}s; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <p style="color: var(--green); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 0.5rem;">${ev.date} | ${ev.meta}</p>
          <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--black); font-family: var(--font-serif); font-weight: normal;">${ev.title}</h2>
          <p style="color: var(--text-muted); line-height: 1.8;">${ev.details || "No additional details available at this time."}</p>
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

    // 3.5. INJECT PROJECTS PREVIEW (index.html)
    const projectsPreviewContainer = document.getElementById('dynamic-projects-preview');
    if (projectsPreviewContainer && SITE_CONFIG.projects) {
      // Show only up to 3 projects on the home page preview
      SITE_CONFIG.projects.slice(0, 3).forEach((proj, i) => {
        const delay = i * 0.1;
        projectsPreviewContainer.innerHTML += `
        <div class="team-card reveal" style="transition-delay: ${delay}s;">
          <div class="team-img-wrap" style="aspect-ratio: 16/9;">
            <img src="${proj.image}" alt="${proj.title}">
          </div>
          <div class="team-info">
            <h3 class="team-name">${proj.title}</h3>
            <p class="team-role">By ${proj.author}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${proj.description}</p>
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
