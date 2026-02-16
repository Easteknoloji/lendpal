/* ===========================
   Mobile Menu Toggle
   =========================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      menu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.remove('hidden');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===========================
   Active Navigation Highlight
   =========================== */
function highlightActiveNav() {
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  document.querySelectorAll('[data-nav-link]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('text-accent', 'font-bold');
      link.classList.remove('text-primary');
      // Mobile version
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-primary', 'text-white');
        link.classList.remove('text-gray-700');
      }
    }
  });
}

/* ===========================
   Hero Carousel (Home page)
   =========================== */
function initCarousel() {
  var slides = document.querySelectorAll('.carousel-slide');
  var dots = document.querySelectorAll('.carousel-dot');
  if (slides.length === 0) return;

  var current = 0;
  var total = slides.length;

  function showSlide(index) {
    slides.forEach(function (s) {
      s.classList.remove('opacity-100');
      s.classList.add('opacity-0');
    });
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100');

    dots.forEach(function (d) {
      d.classList.remove('w-8', 'bg-accent');
      d.classList.add('w-2', 'bg-white/40');
    });
    dots[index].classList.remove('w-2', 'bg-white/40');
    dots[index].classList.add('w-8', 'bg-accent');
  }

  setInterval(function () {
    current = (current + 1) % total;
    showSlide(current);
  }, 5000);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      current = i;
      showSlide(current);
    });
  });
}

/* ===========================
   FAQ Accordion
   =========================== */
function initFAQAccordion() {
  document.querySelectorAll('.faq-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var chevronDown = btn.querySelector('.chevron-down');
      var chevronUp = btn.querySelector('.chevron-up');
      var isOpen = answer.classList.contains('max-h-96');

      if (isOpen) {
        answer.classList.remove('max-h-96', 'opacity-100');
        answer.classList.add('max-h-0', 'opacity-0');
        if (chevronDown) chevronDown.classList.remove('hidden');
        if (chevronUp) chevronUp.classList.add('hidden');
      } else {
        answer.classList.add('max-h-96', 'opacity-100');
        answer.classList.remove('max-h-0', 'opacity-0');
        if (chevronDown) chevronDown.classList.add('hidden');
        if (chevronUp) chevronUp.classList.remove('hidden');
      }
    });
  });
}

/* ===========================
   Form Submission Handlers
   =========================== */
function initForm(formId, successId) {
  var form = document.getElementById(formId);
  var success = document.getElementById(successId);
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnOriginal = submitBtn.innerHTML;

    // Disable and show spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<svg class="animate-spin h-5 w-5 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Submitting...';

    // Special handling for contact form - forward to WhatsApp
    if (formId === 'contact-form') {
      var name = document.getElementById('contact-name').value;
      var email = document.getElementById('contact-email').value;
      var phone = document.getElementById('contact-phone').value;
      var loanAmount = document.getElementById('contact-loanAmount').value;
      var message = document.getElementById('contact-message').value;

      var whatsappMessage =
        'Hello LendPal Capital,\n\nI would like to inquire about your services.\n\n' +
        '*Name:* ' +
        name +
        '\n' +
        '*Email:* ' +
        email +
        '\n' +
        '*Phone:* ' +
        phone +
        '\n';

      if (loanAmount) {
        whatsappMessage += '*Desired Loan Amount:* ' + loanAmount + '\n';
      }

      whatsappMessage +=
        '*Message:* ' + message + '\n\n' + 'Please get back to me. Thank you!';

      var whatsappUrl =
        'https://wa.me/0115211600?text=' + encodeURIComponent(whatsappMessage);
      window.open(whatsappUrl, '_blank');
    }

    setTimeout(function () {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnOriginal;
    }, 2000);
  });

  // Reset button
  var resetBtn = document.getElementById(formId + '-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      success.classList.add('hidden');
      form.classList.remove('hidden');
      form.reset();
    });
  }
}

/* ===========================
   Initialize Everything
   =========================== */
document.addEventListener('DOMContentLoaded', function () {
  highlightActiveNav();
  initMobileMenu();
  initCarousel();
  initFAQAccordion();
  initForm('partner-form', 'partner-success');
  initForm('contact-form', 'contact-success');

  // Dynamic footer year
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
