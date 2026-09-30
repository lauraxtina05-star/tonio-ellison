/* Bounded scroll treatment. No pinning, scroll interception or animation library. */
(() => {
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 700px)');
  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  let heroObserver;
  let revealObserver;
  let frame = 0;
  let listening = false;

  function render() {
    frame = 0;
    if (reducedMotion.matches) return;
    const bounds = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -bounds.top / (bounds.height * .8)));
    hero.style.setProperty('--portrait-y', `${(progress * 18).toFixed(2)}px`);
    hero.style.setProperty('--portrait-scale', (1 + progress * .035).toFixed(4));
    hero.style.setProperty('--headline-y', `${(-progress * 24).toFixed(2)}px`);
    hero.style.setProperty('--hero-scale', (1 - progress * .014).toFixed(4));
    hero.style.setProperty('--mobile-y', `${(-progress * 6).toFixed(2)}px`);
    hero.style.setProperty('--mobile-opacity', (1 - progress * .06).toFixed(4));
  }

  function requestRender() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function listen(enabled) {
    if (enabled === listening) return;
    listening = enabled;
    window[enabled ? 'addEventListener' : 'removeEventListener']('scroll', requestRender, { passive: true });
  }

  function configureMotion() {
    heroObserver?.disconnect();
    revealObserver?.disconnect();
    listen(false);
    cancelAnimationFrame(frame);
    frame = 0;
    hero.classList.remove('is-motion-active');
    hero.removeAttribute('style');
    revealTargets.forEach(target => target.classList.remove('reveal-ready', 'is-revealed'));
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    hero.classList.add('is-motion-active');
    render();
    heroObserver = new IntersectionObserver(([entry]) => {
      listen(entry.isIntersecting);
      if (entry.isIntersecting) requestRender();
    });
    heroObserver.observe(hero);

    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealTargets.forEach(target => {
      // Never hide a reading block already on screen or reached via an anchor.
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add('reveal-ready');
      revealObserver.observe(target);
    });
  }

  if (!hero) return;
  reducedMotion.addEventListener('change', configureMotion);
  mobile.addEventListener('change', configureMotion);
  window.addEventListener('resize', requestRender, { passive: true });
  window.addEventListener('pageshow', requestRender);
  configureMotion();
})();
