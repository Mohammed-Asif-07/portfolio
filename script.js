(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const contactPhoneNumber = '918072499658';
  const contactEmail = 'aasif772007@gmail.com';
  const emailJsConfig = {
    publicKey: 'UyR77uBGy5jUzs9_O',
    serviceId: 'service_5bhot5e',
    templateId: 'template_dcy4jyc'
  };

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      navLinks.classList.toggle('is-open', open);
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal only when motion is allowed; content remains visible if JS is unavailable.
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.project-card, .toolkit-card, .timeline-item, .about-facts > div');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    targets.forEach(target => {
      target.classList.add('reveal-ready');
      observer.observe(target);
    });
  }

  // Keep contact delivery on the existing EmailJS account and template.
  function setStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.remove('error', 'success');
    if (type) formStatus.classList.add(type);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        setStatus('Please complete all three fields before sending.', 'error');
        return;
      }
      if (!emailPattern.test(email)) {
        setStatus('Please enter a valid email address.', 'error');
        document.getElementById('email').focus();
        return;
      }
      if (!window.emailjs) {
        setStatus('The email service did not load. Please email me directly at ' + contactEmail + '.', 'error');
        return;
      }
      const missing = Object.entries(emailJsConfig)
        .filter(([, value]) => !value || value.startsWith('YOUR_'))
        .map(([key]) => key);
      if (missing.length) {
        setStatus('The contact service needs configuration. Please email me directly at ' + contactEmail + '.', 'error');
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      setStatus('Sending your message…');
      try {
        window.emailjs.init({ publicKey: emailJsConfig.publicKey });
        const formattedMessage = ['Portfolio Contact Request', '', 'Name: ' + name, 'Email: ' + email, '', 'Message:', message].join('\n');
        await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
          name,
          email,
          title: 'Portfolio Contact Request from ' + name,
          from_name: name,
          from_email: email,
          reply_to: email,
          to_email: contactEmail,
          message,
          formatted_message: formattedMessage,
          to_phone: '+' + contactPhoneNumber
        });
        contactForm.reset();
        setStatus('Message sent successfully. Thanks for reaching out — I’ll get back to you.', 'success');
      } catch (error) {
        console.error('EmailJS error:', error);
        setStatus('Sorry, the message could not be sent. Please email me directly at ' + contactEmail + '.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
})();