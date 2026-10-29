/**
 * Glam Box - Luxury Cosmetic Boutique
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLiveStatus();
  initGallery();
  initProductFilter();
  initReviews();
  initReviewModal();
  initLightbox();
});

/* ----------------------------------------------------
   1. Navbar & Scrolling
----------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* ----------------------------------------------------
   2. Gallery Filter
----------------------------------------------------- */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   2b. Popular Products Filter
----------------------------------------------------- */
function initProductFilter() {
  const prodFilterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  prodFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prodFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   3. Lightbox Viewer
----------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const productImgBoxes = document.querySelectorAll('.product-img-box');

  if (!lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent || 'Glam Box Boutique';
      const desc = item.querySelector('p')?.textContent || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.9rem; opacity:0.8;">${desc}</span>`;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  productImgBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      const title = box.closest('.product-card')?.querySelector('.product-title')?.textContent || 'Glam Box Product';
      const desc = box.closest('.product-card')?.querySelector('.product-desc')?.textContent || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.9rem; opacity:0.85;">${desc}</span>`;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ----------------------------------------------------
   4. Reviews System (Initial + LocalStorage dynamic)
----------------------------------------------------- */
const defaultReviews = [
  {
    name: "Pooja Verma",
    rating: 5,
    text: "So happy to finally have a genuine luxury cosmetics store in Kaushalpuri Lucknow! Near P.S Lawn, the location is super convenient. They have authentic bridal makeup kits and top brand lipsticks. The staff is extremely polite and helps you find the exact shade match.",
    date: "October, 2026",
    initials: "PV"
  },
  {
    name: "Shreya Srivastava",
    rating: 5,
    text: "Glam Box is a gem! Visited yesterday after calling their number. Found all my skincare essentials and genuine international perfumes that are usually hard to find locally. Beautiful boutique vibe!",
    date: "October, 2026",
    initials: "SS"
  },
  {
    name: "Ananya Mishra",
    rating: 5,
    text: "Loved the personal consultation. Instead of pushing expensive items, they suggested what suits my skin tone best. 100% original products and wonderful ambiance.",
    date: "October, 2026",
    initials: "AM"
  },
  {
    name: "Ritika Kapoor",
    rating: 5,
    text: "Clean, elegant, and well-curated. The best part is you can try and test shades in person before buying, without any pressure. Highly recommended for anyone in Lucknow looking for authentic beauty items!",
    date: "October, 2026",
    initials: "RK"
  }
];

function getStoredReviews() {
  const stored = localStorage.getItem('glam_box_reviews_v2');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultReviews;
    }
  }
  // Reset previous cache so new October, 2026 dates show immediately
  localStorage.removeItem('glam_box_reviews');
  localStorage.setItem('glam_box_reviews_v2', JSON.stringify(defaultReviews));
  return defaultReviews;
}

function saveReviews(reviews) {
  localStorage.setItem('glam_box_reviews_v2', JSON.stringify(reviews));
}

function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  const reviewCountEl = document.getElementById('totalReviewCount');
  if (!container) return;

  const reviews = getStoredReviews();
  if (reviewCountEl) {
    reviewCountEl.textContent = `${reviews.length} Verified Customer Reviews`;
  }

  container.innerHTML = reviews.map(rev => {
    const starIcons = Array.from({ length: 5 }, (_, i) => 
      `<i class="fa-solid fa-star" style="color: ${i < rev.rating ? 'var(--gold-accent)' : '#E5E7EB'}"></i>`
    ).join(' ');

    const initials = rev.initials || rev.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'GB';

    return `
      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-meta">
            <div class="reviewer-avatar">${initials}</div>
            <div>
              <div class="reviewer-name">${escapeHtml(rev.name)}</div>
              <div class="reviewer-badge"><i class="fa-solid fa-circle-check"></i> In-Store Visitor</div>
            </div>
          </div>
          <div class="review-card-stars">
            ${starIcons}
          </div>
        </div>
        <p class="review-text">"${escapeHtml(rev.text)}"</p>
        <div class="review-date">
          <i class="fa-regular fa-calendar-check" style="margin-right: 6px;"></i> ${rev.date || 'Recent review'}
        </div>
      </div>
    `;
  }).join('');
}

function initReviews() {
  renderReviews();
}

/* ----------------------------------------------------
   5. Interactive Review Modal
----------------------------------------------------- */
function initReviewModal() {
  const openBtn = document.getElementById('openReviewModalBtn');
  const modal = document.getElementById('reviewModal');
  const closeBtn = document.getElementById('closeReviewModal');
  const reviewForm = document.getElementById('reviewForm');
  const starSelectContainer = document.getElementById('starRatingSelect');
  let selectedRating = 5;

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Star rating selector
  if (starSelectContainer) {
    const stars = starSelectContainer.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-val'), 10);
        stars.forEach((s, idx) => {
          if (idx < selectedRating) {
            s.classList.add('active');
            s.style.color = 'var(--gold-accent)';
          } else {
            s.classList.remove('active');
            s.style.color = '#D1D5DB';
          }
        });
      });
    });
  }

  // Handle Form Submit
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reviewerName');
      const textInput = document.getElementById('reviewerComment');

      const name = nameInput.value.trim();
      const text = textInput.value.trim();

      if (!name || !text) {
        alert('Please enter both your name and review experience.');
        return;
      }

      const now = new Date();
      const newReview = {
        name: name,
        rating: selectedRating,
        text: text,
        date: `${now.toLocaleDateString('en-US', { month: 'long' })}, ${now.getFullYear()}`,
        initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      };

      const reviews = getStoredReviews();
      reviews.unshift(newReview);
      saveReviews(reviews);
      renderReviews();

      // Reset & close
      reviewForm.reset();
      closeModal();
      showToast('Thank you! Your review for Glam Box has been added.');
    });
  }
}

/* ----------------------------------------------------
   6. Toast notification
----------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Utility to escape HTML preventing XSS
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ----------------------------------------------------
   7. Live Store Open / Close Status Indicator
   Hours: Monday - Sunday, 11:00 AM to 8:30 PM (Asia/Kolkata)
----------------------------------------------------- */
function initLiveStatus() {
  function updateStatus() {
    const topStatus = document.getElementById('storeLiveStatus');
    const brandStatus = document.getElementById('brandLiveStatus');
    if (!topStatus && !brandStatus) return;

    try {
      // Get current time in Indian Standard Time (Asia/Kolkata)
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
      });

      const parts = formatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour')?.value;
      const minutePart = parts.find(p => p.type === 'minute')?.value;

      let hour = parseInt(hourPart || '0', 10);
      let minute = parseInt(minutePart || '0', 10);

      // Handle 24-hour edge cases
      if (hour === 24) hour = 0;
      const currentMinutes = hour * 60 + minute;

      // 11:00 AM is 11 * 60 = 660
      // 8:30 PM is 20 * 60 + 30 = 1230
      const isOpen = currentMinutes >= 660 && currentMinutes < 1230;

      const openHtmlTop = `<span class="status-pulse-dot"></span> <i class="fa-solid fa-door-open"></i> <span>Open Now • Closes 8:30 PM</span>`;
      const closedHtmlTop = `<span class="status-pulse-dot"></span> <i class="fa-solid fa-door-closed"></i> <span>Closed Now • Opens 11:00 AM</span>`;

      const openHtmlBrand = `<span class="status-pulse-dot"></span> <span>Open Now</span>`;
      const closedHtmlBrand = `<span class="status-pulse-dot"></span> <span>Closed Now</span>`;

      if (topStatus) {
        if (isOpen) {
          topStatus.className = 'store-live-status status-open';
          topStatus.innerHTML = openHtmlTop;
          topStatus.setAttribute('title', 'Glam Box is currently OPEN. Visit us near P.S Lawn!');
        } else {
          topStatus.className = 'store-live-status status-closed';
          topStatus.innerHTML = closedHtmlTop;
          topStatus.setAttribute('title', 'Glam Box is currently CLOSED. We open daily at 11:00 AM.');
        }
      }

      if (brandStatus) {
        if (isOpen) {
          brandStatus.className = 'brand-live-pill status-open';
          brandStatus.innerHTML = openHtmlBrand;
        } else {
          brandStatus.className = 'brand-live-pill status-closed';
          brandStatus.innerHTML = closedHtmlBrand;
        }
      }
    } catch (e) {
      console.error('Error updating live store status:', e);
    }
  }

  // Update immediately
  updateStatus();
  // Live update every 30 seconds
  setInterval(updateStatus, 30000);
}
