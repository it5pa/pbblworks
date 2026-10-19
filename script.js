// --- SCATTERED LETTERS (Landing Page) ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.canvas');
  const letters = document.querySelectorAll('.scattered-letter');

  if (canvas && letters.length) {
    letters.forEach(letter => {
      letter.addEventListener('mouseenter', () => {
        const groupName = letter.dataset.group;
        canvas.classList.add('is-hovering');
        document.querySelectorAll(`.scattered-letter[data-group="${groupName}"]`)
          .forEach(el => el.classList.add('highlighted'));
      });

      letter.addEventListener('mouseleave', () => {
        canvas.classList.remove('is-hovering');
        document.querySelectorAll('.scattered-letter.highlighted')
          .forEach(el => el.classList.remove('highlighted'));
      });
    });
  }
});

// --- IMPRINT OVERLAY CONTROLS ---
const imprintOverlay = document.getElementById('imprint-overlay');
const openImprintBtn = document.getElementById('open-imprint');
const closeImprintBtn = document.getElementById('close-imprint');

function openModal() {
  if (!imprintOverlay) return;
  imprintOverlay.classList.add('is-open');
  imprintOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!imprintOverlay) return;
  imprintOverlay.classList.remove('is-open');
  imprintOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (openImprintBtn) openImprintBtn.addEventListener('click', openModal);
if (closeImprintBtn) closeImprintBtn.addEventListener('click', closeModal);

if (imprintOverlay) {
  imprintOverlay.addEventListener('click', (e) => {
    if (e.target === imprintOverlay) closeModal();
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imprintOverlay && imprintOverlay.classList.contains('is-open')) {
    closeModal();
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const contactOverlay = document.getElementById('contact-overlay');
  const closeContactBtn = document.getElementById('close-contact');
  
  // Find whatever link/button you use to trigger contact
  // Adjust this selector to match your HTML (e.g., '#contact-trigger', '.contact-link', or 'a[href="#contact"]')
  const contactTriggers = document.querySelectorAll('a[href="#contact"], .contact-trigger');

  function openContactModal(e) {
    if (e) e.preventDefault();
    if (!contactOverlay) return;
    contactOverlay.classList.add('is-open');
    contactOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    if (!contactOverlay) return;
    contactOverlay.classList.remove('is-open');
    contactOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open triggers
  contactTriggers.forEach(btn => {
    btn.addEventListener('click', openContactModal);
  });

  // Close button click
  if (closeContactBtn) {
    closeContactBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeContactModal();
    });
  }

  // Click outside the email link to close
  if (contactOverlay) {
    contactOverlay.addEventListener('click', (e) => {
      if (!e.target.closest('.contact-email')) {
        closeContactModal();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactOverlay.classList.contains('is-open')) {
        closeContactModal();
      }
    });
  }
});

// --- GALLERY SLIDESHOW ---
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('slideshowOverlay');
  const slideImg = document.getElementById('slideshowImage');
  const slideCaption = document.getElementById('slideshowCaption');
  const closeBtn = document.getElementById('slideshowClose');
  const prevBtn = document.getElementById('slideshowPrev');
  const nextBtn = document.getElementById('slideshowNext');

  if (!overlay || !slideImg) return;

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const allProjects = Array.from(document.querySelectorAll('.project-entry'));
  let currentIndex = 0;

  function showImage(index) {
    if (!galleryItems.length) return;
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;

    currentIndex = index;
    const currentItem = galleryItems[currentIndex];

    // Update image
    slideImg.src = currentItem.src;
    slideImg.alt = currentItem.alt || 'Slideshow image';

    // Find parent project article
    const parentProject = currentItem.closest('.project-entry');

    // Toggle background: Odd projects (1st, 3rd) = #D7F2FF, Even (2nd, 4th) = Grey
    if (parentProject) {
      const projectIndex = allProjects.indexOf(parentProject); // 0 = Project 1, 1 = Project 2...
      if (projectIndex % 2 === 1) {
        overlay.classList.add('is-alt-bg');
      } else {
        overlay.classList.remove('is-alt-bg');
      }
    } else {
      overlay.classList.remove('is-alt-bg');
    }

    // Pull the caption from whichever project article owns this image
    if (slideCaption) {
      const projectCaption = parentProject ? parentProject.querySelector('.works-caption') : null;
      slideCaption.innerHTML = projectCaption ? projectCaption.innerHTML : '';
    }
  }

  function openSlideshow(index) {
    showImage(index);
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSlideshow() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openSlideshow(index);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSlideshow();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('slideshow-image-container')) {
      closeSlideshow();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-active')) return;

    if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (e.key === 'Escape') {
      closeSlideshow();
    }
  });

  // Mobile swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;

  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  overlay.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      showImage(currentIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showImage(currentIndex - 1);
    }
  }, { passive: true });
});

// --- PBBL PRONUNCIATION OVERLAY CONTROLS ---
const pronounceOverlay = document.getElementById('pronounce-overlay');
const closePronounceBtn = document.getElementById('close-pronounce');
const pbblLetters = document.querySelectorAll('.scattered-letter[data-group="pbbl"]');

function openPronounceModal(e) {
  if (e) e.preventDefault();
  if (!pronounceOverlay) return;
  pronounceOverlay.classList.add('is-open');
  pronounceOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePronounceModal() {
  if (!pronounceOverlay) return;
  pronounceOverlay.classList.remove('is-open');
  pronounceOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Bind clicks to all PBBL letters
pbblLetters.forEach(letter => {
  letter.addEventListener('click', openPronounceModal);
});

// Close button click
if (closePronounceBtn) {
  closePronounceBtn.addEventListener('click', closePronounceModal);
}

// Click anywhere on the overlay background to close
if (pronounceOverlay) {
  pronounceOverlay.addEventListener('click', (e) => {
    if (e.target === pronounceOverlay || e.target.classList.contains('pronounce-content')) {
      closePronounceModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pronounceOverlay.classList.contains('is-open')) {
      closePronounceModal();
    }
  });
}

