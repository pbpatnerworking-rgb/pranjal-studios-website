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
      const bannerSrc = card.getAttribute('data-banner') || '';
      const splashSrc = card.getAttribute('data-splash') || '';
      const playstoreUrl = card.getAttribute('data-playstore') || '';

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

      const modalGallery = document.querySelector('.modal-gallery');
      if (modalGallery) {
        modalGallery.innerHTML = '';
        if (bannerSrc) {
          const item = document.createElement('div');
          item.className = 'screenshot-item';
          item.style.gridColumn = '1 / -1';
          item.innerHTML = `<img src="${bannerSrc}" alt="${title} Feature Banner" class="screenshot-img" loading="lazy" />`;
          modalGallery.appendChild(item);
        }
        if (splashSrc) {
          const item = document.createElement('div');
          item.className = 'screenshot-item';
          item.innerHTML = `<img src="${splashSrc}" alt="${title} Splash Graphic" class="screenshot-img" loading="lazy" />`;
          modalGallery.appendChild(item);
        }
        if (iconSrc) {
          const item = document.createElement('div');
          item.className = 'screenshot-item';
          item.innerHTML = `<img src="${iconSrc}" alt="${title} Icon HD" class="screenshot-img" loading="lazy" />`;
          modalGallery.appendChild(item);
        }
      }

      const modalWrapper = document.getElementById('modal-playstore-wrapper');
      if (modalWrapper) {
        if (playstoreUrl) {
          modalWrapper.innerHTML = `
            <a href="${playstoreUrl}" target="_blank" rel="noopener" class="btn btn-playstore" style="padding: 0.6rem 1.4rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div class="playstore-text">
                <span class="main" style="font-weight: 700; letter-spacing: 0.8px;">GOOGLE PLAY</span>
              </div>
            </a>
          `;
        } else {
          modalWrapper.innerHTML = `
            <div class="btn btn-playstore btn-disabled" style="padding: 0.6rem 1.4rem; cursor: default;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div class="playstore-text">
                <span class="sub">GOOGLE PLAY</span>
                <span class="main" style="font-size: 0.85rem;">Coming Soon</span>
              </div>
            </div>
          `;
        }
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
  initCountdownTimer();
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

/* --- Input Sanitization & Anti-Spam Security System --- */
const SecuritySystem = {
  // Sanitize text to prevent HTML/XSS injection
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Validate Email Format
  isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase().trim());
  },

  // Rate Limiter: Prevent form spamming (max 1 submission every 15 seconds)
  checkRateLimit(formId) {
    const key = `ps_ratelimit_${formId || 'form'}`;
    const lastSubmit = localStorage.getItem(key);
    const now = Date.now();
    const COOLDOWN_MS = 15000; // 15 seconds cooldown

    if (lastSubmit && (now - parseInt(lastSubmit, 10)) < COOLDOWN_MS) {
      const remainingSecs = Math.ceil((COOLDOWN_MS - (now - parseInt(lastSubmit, 10))) / 1000);
      return { allowed: false, remainingSecs };
    }

    localStorage.setItem(key, now.toString());
    return { allowed: true, remainingSecs: 0 };
  }
};

/* --- Interactive Forms & Validation (Web3Forms & FormSubmit) --- */
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formId = form.getAttribute('id') || 'generic_form';
      
      // 1. Anti-Spam Honeypot Check
      const honeypot = form.querySelector('[name="botcheck"], [name="_honey"]');
      if (honeypot && (honeypot.checked || honeypot.value)) {
        form.reset();
        return;
      }

      // 2. Rate-Limit Check
      const rateCheck = SecuritySystem.checkRateLimit(formId);
      if (!rateCheck.allowed) {
        showToast(`Please wait ${rateCheck.remainingSecs} second(s) before submitting again.`, 'warning');
        return;
      }

      // 3. Validate all required inputs & email format
      const inputs = form.querySelectorAll('input, textarea, select');
      let isValid = true;

      inputs.forEach(input => {
        const val = input.value.trim();
        if (input.hasAttribute('required') && !val) {
          isValid = false;
          input.classList.add('input-error');
        } else {
          input.classList.remove('input-error');
        }

        if (input.type === 'email' && val && !SecuritySystem.isValidEmail(val)) {
          isValid = false;
          input.classList.add('input-error');
          showToast('Please enter a valid email address.', 'error');
        }
      });

      if (!isValid) {
        showToast('Please fill out all required fields correctly.', 'error');
        return;
      }

      // 4. Gather Form Data & Submit to Web3Forms API
      const targetUrl = form.getAttribute('action') || 'https://api.web3forms.com/submit';
      const formData = new FormData(form);
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="btn-spinner"></span> Sending Message...`;
      }

      try {
        const response = await fetch(targetUrl, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          form.reset();
          window.location.href = 'thank-you.html';
        } else {
          const errorMsg = data.message || 'Unable to submit your message right now. Please try again.';
          showModalPopup('Submission Failed', errorMsg, false);
        }
      } catch (err) {
        showModalPopup(
          'Network Error',
          'Failed to send message due to a connection issue. Please check your internet connection and try again.',
          false
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
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
function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : type === 'warning'
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    ${iconSvg}
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

/* --- Premium Glassmorphic Modal Popup Helper --- */
function showModalPopup(title, message, isSuccess = true) {
  let modalOverlay = document.querySelector('.modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const iconSvg = isSuccess
    ? `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  modalOverlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-icon-wrapper ${isSuccess ? 'success' : 'error'}">
        ${iconSvg}
      </div>
      <h3 class="modal-title ${isSuccess ? 'text-gradient' : ''}">${title}</h3>
      <p class="modal-desc">${message}</p>
      <button type="button" class="btn btn-primary modal-close-btn" style="width: 100%;">Continue</button>
    </div>
  `;

  requestAnimationFrame(() => {
    modalOverlay.classList.add('active');
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      if (modalOverlay.parentElement) modalOverlay.parentElement.removeChild(modalOverlay);
    }, 300);
  };

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* --- Countdown Timer Helper for Thank You Page --- */
function initCountdownTimer() {
  const timerEl = document.getElementById('countdown-timer');
  if (!timerEl) return;

  let seconds = 5;
  timerEl.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    if (seconds >= 0 && timerEl) {
      timerEl.textContent = seconds;
    }
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = 'index.html';
    }
  }, 1000);
}
