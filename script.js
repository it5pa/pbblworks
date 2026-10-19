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

// --- CONTACT OVERLAY CONTROLS ---
const contactOverlay = document.getElementById('contact-overlay');
const closeContactBtn = document.getElementById('close-contact');
const contactLetters = document.querySelectorAll('.scattered-letter[data-group="contact"]');

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

contactLetters.forEach(letter => {
  letter.addEventListener('click', openContactModal);
});

if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);

if (contactOverlay) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactOverlay.classList.contains('is-open')) {
      closeContactModal();
    }
  });
}

// --- GALLERY SLIDESHOW ---
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('slideshowOverlay');
  const slideImg = document.getElementById('slideshowImage');
  const closeBtn = document.getElementById('slideshowClose');
  const prevBtn = document.getElementById('slideshowPrev');
  const nextBtn = document.getElementById('slideshowNext');

  if (!overlay || !slideImg) return;

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function showImage(index) {
    if (!galleryItems.length) return;
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;

    currentIndex = index;
    slideImg.src = galleryItems[currentIndex].src;
    slideImg.alt = galleryItems[currentIndex].alt || 'Slideshow image';
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

  let touchStartX = 0;
let touchEndX = 0;

overlay.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

overlay.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 45; // Minimum travel in px to trigger page turn
  if (touchEndX < touchStartX - swipeThreshold) {
    showImage(currentIndex + 1); // Swipe left -> next image
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    showImage(currentIndex - 1); // Swipe right -> prev image
  }
}
});

