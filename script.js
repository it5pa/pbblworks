document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.canvas');
  const letters = document.querySelectorAll('.scattered-letter');

  letters.forEach(letter => {
    // Underline and highlight group on hover
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

    // Remove highlight immediately upon clicking
    letter.addEventListener('click', () => {
      canvas.classList.remove('is-hovering');
      document.querySelectorAll('.scattered-letter.highlighted')
        .forEach(el => el.classList.remove('highlighted'));
    });
  });
});

// --- IMPRINT OVERLAY CONTROLS ---
const imprintOverlay = document.getElementById('imprint-overlay');
const openImprintBtn = document.getElementById('open-imprint');
const closeImprintBtn = document.getElementById('close-imprint');

function openModal() {
  imprintOverlay.classList.add('is-open');
  imprintOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Freeze background scroll
}

function closeModal() {
  imprintOverlay.classList.remove('is-open');
  imprintOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore background scroll
}

if (openImprintBtn) openImprintBtn.addEventListener('click', openModal);
if (closeImprintBtn) closeImprintBtn.addEventListener('click', closeModal);

// Close when clicking outside modal box
imprintOverlay.addEventListener('click', (e) => {
  if (e.target === imprintOverlay) closeModal();
});

// Close with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imprintOverlay.classList.contains('is-open')) {
    closeModal();
  }
});


// --- CONTACT OVERLAY CONTROLS ---
const contactOverlay = document.getElementById('contact-overlay');
const closeContactBtn = document.getElementById('close-contact');
const contactLetters = document.querySelectorAll('.scattered-letter[data-group="contact"]');

function openContactModal(e) {
  if (e) e.preventDefault();
  contactOverlay.classList.add('is-open');
  contactOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  contactOverlay.classList.remove('is-open');
  contactOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Bind to all scattered CONTACT letters
contactLetters.forEach(letter => {
  letter.addEventListener('click', openContactModal);
});

if (closeContactBtn) {
  closeContactBtn.addEventListener('click', closeContactModal);
}

// Also close with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactOverlay.classList.contains('is-open')) {
    closeContactModal();
  }
});