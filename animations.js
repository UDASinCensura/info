/* Animations & interactions for UDA Sin Censura */
(function () {
  'use strict';

  // ===== IntersectionObserver reveal =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .prohib, .comp-row, .paso, .paradoja').forEach((el) => {
    io.observe(el);
  });

  // ===== Redaction strike on hero =====
  const redact = document.querySelector('.impacto .redact');
  if (redact) {
    const r2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => redact.classList.add('struck'), 700);
          r2.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    r2.observe(redact);
  }

  // ===== Counter animation =====
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = (el.dataset.decimals | 0);
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = target * eased;
          el.textContent = val.toFixed(decimals);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => counterIO.observe(el));
})();
