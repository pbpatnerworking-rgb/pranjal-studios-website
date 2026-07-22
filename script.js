/* ==========================================================================
   PRANJAL STUDIOS - Master JavaScript
   Developer: Pranjal Tiwari
   Support Email: stdhelp.support@gmail.com
   ========================================================================== */

/* --- Modal System Controller --- */
function initModalSystem() {
  const modalOverlay = document.getElementById('app-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.btn-details');

  if (!modalOverlay) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.app-card-compact, .app-card');
      if (!card) return;

      const title = card.getAttribute('data-title') || card.querySelector('.app-title')?.textContent || '';
      const category = card.getAttribute('data-category-name') || card.querySelector('.app-category')?.textContent || '';
      const iconSrc = card.querySelector('.app-icon')?.getAttribute('src') || '';
      const version = card.getAttribute('data-version') || 'v1.0.0';
      const status = card.getAttribute('data-status') || '🟡 COMING SOON';
      const desc = card.getAttribute('data-description') || '';
      const features = (card.getAttribute('data-features') || '').split('|');

      // Populate modal content
      document.getElementById('modal-app-icon').src = iconSrc;
      document.getElementById('modal-app-title').textContent = title;
      document.getElementById('modal-app-category').textContent = category;
      document.getElementById('modal-app-version').textContent = version;
      document.getElementById('modal-app-status').textContent = status;
      document.getElementById('modal-app-desc').textContent = desc;

      const featuresList = document.getElementById('modal-app-features');
      if (featuresList) {
        featuresList.innerHTML = '';
        features.forEach(f => {
          if (f.trim()) {
            const li = document.createElement('li');
            li.style.marginBottom = '0.4rem';
            li.style.color = 'var(--text-muted)';
            li.style.fontSize = '0.9rem';
            li.innerHTML = `✓ ${f.trim()}`;
            featuresList.appendChild(li);
          }
        });
      }

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- Mouse Follower Glow --- */
function initMouseGlow() {
  let mouseGlow = document.querySelector('.mouse-glow');
  if (!mouseGlow) {
    mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    document.body.appendChild(mouseGlow);
  }

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateMouseGlow);
    }
  });

  function updateMouseGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    mouseGlow.style.left = `${currentX}px`;
    mouseGlow.style.top = `${currentY}px`;

    if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
      requestAnimationFrame(updateMouseGlow);
    } else {
      isMoving = false;
    }
  }
}

/* --- Starfield Background Setup --- */
function initStarfield() {
  if (!document.querySelector('.starfield')) {
    const starfield = document.createElement('div');
    starfield.className = 'starfield';
    starfield.setAttribute('aria-hidden', 'true');
    document.body.appendChild(starfield);
  }
}

/* --- Parallax Scroll Background --- */
function initParallaxScroll() {
  const glow1 = document.querySelector('.bg-glow-1');
  const glow2 = document.querySelector('.bg-glow-2');
  if (!glow1 && !glow2) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (glow1) glow1.style.transform = `translateY(${lastScrollY * 0.08}px)`;
        if (glow2) glow2.style.transform = `translateY(${-lastScrollY * 0.05}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Page Transition Controller --- */
function initPageTransitions() {
  let transitionOverlay = document.querySelector('.page-transition-overlay');
  if (!transitionOverlay) {
    transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
  }

  const internalLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      if (!targetUrl || targetUrl.startsWith('#') || link.getAttribute('target') === '_blank') return;

      e.preventDefault();
      transitionOverlay.classList.add('active');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 250);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initMouseGlow();
  initParallaxScroll();
  initThemeToggle();
  initMobileDrawer();
  initAccordions();
  initSearchAndFilters();
  initForms();
  initScrollAnimations();
  initModalSystem();
  initPageTransitions();
  setCurrentYear();
});

/* --- Theme Toggle System --- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('ps_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ps_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;
  
  if (theme === 'light') {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* --- Mobile Drawer Navigation --- */
function initMobileDrawer() {
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (!mobileToggleBtn || !mobileDrawer) return;

  mobileToggleBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileDrawer.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer on clicking links
  const drawerLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- Accordion FAQ System --- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      
      // Close all active items in same accordion group
      const parentAccordion = item.closest('.accordion');
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(child => {
          child.classList.remove('active');
        });
      }
      
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* --- Search & Filter System --- */
function initSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const filterTags = document.querySelectorAll('.filter-tag');
  const cards = document.querySelectorAll('.app-card, .game-card');

  if (!cards.length) return;

  function filterContent() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeTag = document.querySelector('.filter-tag.active');
    const category = activeTag ? activeTag.getAttribute('data-category') : 'all';

    cards.forEach(card => {
      const title = card.querySelector('.app-title, .game-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.app-description, .game-description')?.textContent.toLowerCase() || '';
      const cardCat = card.getAttribute('data-category') || '';

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesCategory = category === 'all' || cardCat === category;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterContent);
  }

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      filterContent();
    });
  });
}

/* --- Interactive Forms & Validation --- */
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending...`;
      }

      setTimeout(() => {
        showToast('Success! Your message has been sent to Pranjal Tiwari.');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1000);
    });
  });
}

/* --- Scroll Trigger Animations --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.glass-card, .feature-card, .stat-card, .section-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

/* --- Toast Notification Helper --- */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --- Dynamic Copyright Year --- */
function setCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);
}
