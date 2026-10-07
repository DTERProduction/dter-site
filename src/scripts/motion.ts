import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const desktop = matchMedia('(min-width: 900px)').matches;
const $$ = <T extends HTMLElement = HTMLElement>(s: string, p: ParentNode = document) => Array.from(p.querySelectorAll<T>(s));

// Boutons : le libellé roule vers le haut au survol.
$$('.btn').forEach((b) => {
  if (b.querySelector('.roll') || b.children.length) return;
  const label = b.textContent?.trim() || '';
  b.innerHTML = `<span class="roll" data-label="${label.replace(/"/g, '&quot;')}"><span>${label}</span></span>`;
});

function init() {
  // Défilement fluide, synchronisé avec les animations.
  const lenis = new Lenis({ anchors: true, lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // En-tête : se cache en descendant, revient en remontant.
  const header = document.querySelector<HTMLElement>('.site-header-wrap');
  if (header) {
    ScrollTrigger.create({
      start: 120,
      end: 'max',
      onUpdate: (s) => header.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400),
      onLeaveBack: () => header.classList.remove('is-hidden'),
    });
  }

  // Titres : apparition ligne par ligne, derrière un masque.
  document.fonts.ready.then(() => {
    $$('.display, .h-xl, .h2, .cta-title, .lp-title, .quote-lg, .wordmark span, .hero-line').forEach((el) => {
      const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
      gsap.set(el, { visibility: 'visible' });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.inOut',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
    ScrollTrigger.refresh();
  });

  // Blocs : montée douce, décalée entre voisins.
  const blocks = '.project:not(.stack-card), .rows > *, .steps > *, .faq-item, .facts > *, .stats > *, .quotes figure, .checks li, .lead, .eyebrow, .case > *, .price-box, .contact-rows > *, .form, .filters, .marquee, .hero-card, .wide > .media, .lp-bullets li, .photo-item';
  gsap.set(blocks, { visibility: 'visible', opacity: 0, y: 36 });
  ScrollTrigger.batch(blocks, {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.05, overwrite: true }),
  });

  // Cartes (promesses, usages) : elles se lèvent une à une en pivotant depuis le bas.
  $$('.cards').forEach((group) => {
    const cards = $$('.card', group);
    gsap.set(group, { perspective: 1400 });
    gsap.set(cards, { visibility: 'visible' });
    gsap.from(cards, {
      opacity: 0, y: 140, rotateX: -38, rotate: (i) => (i - (cards.length - 1) / 2) * 5, transformOrigin: '50% 100%',
      duration: 0.95, ease: 'power4.inOut', stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // Images : léger déplacement en profondeur pendant le défilement.
  $$('.media > img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, {
      yPercent: 6,
      scale: 1.14,
      ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Hero : la fenêtre vidéo s'ouvre en plein écran pendant le défilement.
  const heroWrap = document.querySelector<HTMLElement>('[data-hero-wrap]');
  if (heroWrap && desktop) {
    ScrollTrigger.create({
      trigger: heroWrap,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (s) => heroWrap.style.setProperty('--p', gsap.parseEase('power2.inOut')(s.progress).toFixed(4)),
    });
  }

  // Réalisations : les cartes s'empilent en laissant leur titre visible. Celle du dessous recule et s'assombrit seulement quand la suivante la recouvre.
  const cards = $$('.stack-card');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card.querySelector('.stack-inner'), {
      scale: 0.95,
      '--dim': 0.5,
      ease: 'power1.inOut',
      scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 25%', scrub: 0.4 },
    });
  });

  // Bande photo : glisse à l'horizontale pendant le défilement.
  $$('[data-band]').forEach((track) => {
    const view = track.parentElement!;
    gsap.fromTo(track, { x: () => view.clientWidth * 0.12 }, {
      x: () => -(track.scrollWidth - view.clientWidth * 0.88),
      ease: 'none',
      scrollTrigger: { trigger: view, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
    });
  });

  // Coulisses : le cadre vertical se redresse en entrant, comme un téléphone qu'on relève.
  $$('.reel').forEach((reel) => {
    gsap.fromTo(reel, { rotate: -7, y: 90, scale: 0.9 }, {
      rotate: 0, y: 0, scale: 1, ease: 'none',
      scrollTrigger: { trigger: reel, start: 'top 100%', end: 'top 35%', scrub: 0.6 },
    });
  });

  // Méthode : la ligne de progression se remplit.
  $$('.steps').forEach((steps) => {
    gsap.fromTo(steps, { '--line': 0 }, { '--line': 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 80%', end: 'bottom 55%', scrub: true } });
  });

  if (!finePointer) return;

  // Curseur « Voir » sur les projets.
  const badge = document.createElement('div');
  badge.className = 'cursor-badge';
  badge.textContent = 'Voir';
  badge.setAttribute('aria-hidden', 'true');
  document.body.appendChild(badge);
  const bx = gsap.quickTo(badge, 'x', { duration: 0.35, ease: 'power3' });
  const by = gsap.quickTo(badge, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { bx(e.clientX); by(e.clientY); }, { passive: true });
  $$('a.project, a.stack-card').forEach((el) => {
    el.addEventListener('pointerenter', () => badge.classList.add('is-on'));
    el.addEventListener('pointerleave', () => badge.classList.remove('is-on'));
  });

  // Services : aperçu qui suit la souris. Une image pour la vidéo, un jeu de cartes pour la photo, une table de montage pour la post-production.
  const rows = $$('.rows > a[data-kind]');
  if (rows.length) {
    const prev = document.createElement('div');
    prev.className = 'hover-preview';
    prev.setAttribute('aria-hidden', 'true');
    document.body.appendChild(prev);
    const px = gsap.quickTo(prev, 'x', { duration: 0.7, ease: 'power3' });
    const py = gsap.quickTo(prev, 'y', { duration: 0.7, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { px(e.clientX); py(e.clientY); }, { passive: true });
    let timer = 0;
    let loop: gsap.core.Tween | null = null;
    const stop = () => { clearInterval(timer); loop?.kill(); loop = null; gsap.killTweensOf(prev.querySelectorAll('*')); };
    const img = (src: string, cls = '') => { const im = new Image(); im.src = src; im.alt = ''; im.className = cls; return im; };

    const builders: Record<string, (images: string[]) => void> = {
      video: (images) => { prev.appendChild(img(images[0])); },
      photos: (images) => {
        const deck = images.map((src) => prev.appendChild(img(src, 'hp-card')));
        const lay = (instant = false) => deck.forEach((c, i) => {
          c.style.zIndex = String(deck.length - i);
          gsap.to(c, { x: i * 18, y: i * -12, rotate: i === 0 ? -3 : (i % 2 ? 5 : -7) + i, scale: 1 - i * 0.06, opacity: i > 3 ? 0 : 1, duration: instant ? 0 : 0.6, ease: 'power3.inOut' });
        });
        lay(true);
        timer = window.setInterval(() => {
          const top = deck.shift()!;
          gsap.to(top, { x: 230, y: 30, rotate: 18, duration: 0.38, ease: 'power2.in', onComplete: () => { deck.push(top); lay(); } });
        }, 1000);
      },
      timeline: (images) => {
        const widths = [22, 14, 26, 18, 20].slice(0, images.length);
        const total = widths.reduce((a, b) => a + b, 0);
        prev.innerHTML = `<div class="hp-view"></div><div class="hp-bar mono"><span class="accent">●</span><span data-hp-tc>00:00:00:00</span></div>
          <div class="hp-tracks">
            <div class="hp-track">${images.map((src, i) => `<span style="flex:${widths[i]};background-image:url('${src}')"></span>`).join('')}</div>
            <div class="hp-track is-audio">${widths.map((w) => `<span style="flex:${w}"></span>`).join('')}</div>
            <div class="hp-track is-titles"><span style="flex:18"></span><i style="flex:26"></i><span style="flex:30"></span><i style="flex:26"></i></div>
            <b class="hp-head"></b>
          </div>`;
        const view = prev.querySelector('.hp-view')!;
        const shots = images.map((src) => view.appendChild(img(src)));
        const tcEl = prev.querySelector('[data-hp-tc]')!;
        const head = prev.querySelector<HTMLElement>('.hp-head')!;
        const o = { p: 0 };
        let current = -1;
        loop = gsap.to(o, {
          p: 1, duration: 4.5, ease: 'none', repeat: -1,
          onUpdate: () => {
            head.style.left = `${o.p * 100}%`;
            let acc = 0;
            const idx = widths.findIndex((w) => (acc += w / total) > o.p);
            if (idx !== current) { current = idx; shots.forEach((sh, k) => { sh.style.opacity = k === idx ? '1' : '0'; }); }
            const f = Math.floor(o.p * 4.5 * 25);
            tcEl.textContent = `00:00:${String(Math.floor(f / 25)).padStart(2, '0')}:${String(f % 25).padStart(2, '0')}`;
          },
        });
      },
    };

    rows.forEach((r) => {
      r.addEventListener('pointerenter', () => {
        const kind = r.dataset.kind || 'video';
        const images: string[] = JSON.parse(r.dataset.images || '[]');
        if (!images.length) return;
        stop();
        prev.replaceChildren();
        prev.className = `hover-preview is-${kind}`;
        builders[kind]?.(images);
        requestAnimationFrame(() => prev.classList.add('is-on'));
      });
      r.addEventListener('pointerleave', () => { prev.classList.remove('is-on'); stop(); });
    });
  }

  // Cartes : elles s'inclinent vers la souris.
  $$('.cards > .card').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3' });
    const ty = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3' });
    card.addEventListener('pointermove', (e) => {
      const b = card.getBoundingClientRect();
      rx(((e.clientY - b.top) / b.height - 0.5) * -9);
      ry(((e.clientX - b.left) / b.width - 0.5) * 11);
      ty(-8);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); ty(0); });
  });

  // Carte « Parler à Thomas » : elle est attirée par la souris.
  $$('.hero-card').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      mx((e.clientX - (b.left + b.width / 2)) * 0.18);
      my((e.clientY - (b.top + b.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { mx(0); my(0); });
  });

  // Appel final : traînée d'images sous la souris.
  const trail = document.querySelector<HTMLElement>('[data-trail]');
  if (trail) {
    const srcs: string[] = JSON.parse(trail.dataset.trail || '[]');
    let last = { x: 0, y: 0 }, n = 0;
    trail.addEventListener('pointermove', (e) => {
      if (!srcs.length || Math.hypot(e.clientX - last.x, e.clientY - last.y) < 110) return;
      last = { x: e.clientX, y: e.clientY };
      const r = trail.getBoundingClientRect();
      const im = document.createElement('img');
      im.className = 'trail-img';
      im.alt = '';
      im.src = srcs[n++ % srcs.length];
      trail.appendChild(im);
      gsap.set(im, { x: e.clientX - r.left, y: e.clientY - r.top, xPercent: -50, yPercent: -50, rotate: gsap.utils.random(-8, 8) });
      gsap.timeline({ onComplete: () => im.remove() })
        .fromTo(im, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' })
        .to(im, { scale: 0.8, opacity: 0, y: '+=40', duration: 0.6, ease: 'power2.in' }, '+=0.35');
    });
  }
}

// Rideau : deux volets noirs, comme une coupe au montage. Compteur de timecode à la première visite.
const curtainTop = document.querySelector<HTMLElement>('.curtain-bar.is-top');
const curtainBottom = document.querySelector<HTMLElement>('.curtain-bar.is-bottom');
const curtainMid = document.querySelector<HTMLElement>('.curtain-mid');
const tcEl = document.querySelector<HTMLElement>('[data-tc]');
const hasCurtain = !!(curtainTop && curtainBottom && curtainMid);
const tc = (frames: number) => {
  const f = Math.floor(frames);
  const two = (n: number) => String(n).padStart(2, '0');
  return `00:00:${two(Math.floor(f / 25))}:${two(f % 25)}`;
};

function start() {
  try {
    init();
  } catch (e) {
    root.classList.remove('js-motion');
    console.error(e);
  }
}

function openCurtain() {
  if (!hasCurtain) { root.classList.remove('pt-enter'); start(); return; }
  let first = false;
  try { first = !sessionStorage.getItem('dter-vu'); sessionStorage.setItem('dter-vu', '1'); } catch {}
  const tl = gsap.timeline({
    onComplete: () => {
      root.classList.remove('pt-enter');
      gsap.set([curtainTop, curtainBottom, curtainMid], { clearProps: 'all' });
    },
  });
  if (first && tcEl) {
    const o = { f: 0 };
    tl.to(o, { f: 22, duration: 0.75, ease: 'power1.in', onUpdate: () => { tcEl.textContent = tc(o.f); } });
  } else {
    gsap.set('.curtain-tc', { display: 'none' });
    tl.to({}, { duration: 0.12 });
  }
  tl.call(start)
    .to(curtainMid, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' })
    .fromTo(curtainTop, { y: 0, yPercent: 0 }, { yPercent: -101, duration: 0.7, ease: 'expo.inOut' }, '>-0.05')
    .fromTo(curtainBottom, { y: 0, yPercent: 0 }, { yPercent: 101, duration: 0.7, ease: 'expo.inOut' }, '<');
}

function closeCurtainThen(go: () => void) {
  if (!hasCurtain) { go(); return; }
  root.classList.add('pt-leave');
  gsap.set('.curtain-tc', { display: 'none' });
  gsap.timeline({ onComplete: go })
    // y: 0 est indispensable : sans lui, le décalage de départ défini en CSS s'ajoute et les volets restent hors de l'écran.
    .fromTo(curtainTop, { y: 0, yPercent: -101 }, { y: 0, yPercent: 0, duration: 0.42, ease: 'power3.inOut' })
    .fromTo(curtainBottom, { y: 0, yPercent: 101 }, { y: 0, yPercent: 0, duration: 0.42, ease: 'power3.inOut' }, '<')
    // Le logo n'apparaît qu'une fois les volets fermés.
    .fromTo(curtainMid, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, '>-0.08');
}

if (reduced) {
  root.classList.remove('js-motion', 'pt-enter');
} else {
  openCurtain();

  // Changement de page : le rideau se ferme avant de partir.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.startsWith('/admin')) return;
    if (url.pathname === location.pathname) return; // ancre ou même page : pas de rideau
    e.preventDefault();
    closeCurtainThen(() => { location.href = url.href; });
  });

  // Retour arrière du navigateur : la page revient sans rideau fermé.
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    root.classList.remove('pt-leave', 'pt-enter');
    gsap.set([curtainTop, curtainBottom, curtainMid], { clearProps: 'all' });
  });
}
