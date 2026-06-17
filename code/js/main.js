/* ═══════════════════════════════════════════════════════════
   CAHIER DE PARTENARIAT — DÉLÉGATION UQO · JDG 2027
   main.js — Toute la logique JavaScript
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. CARROUSEL HERO ─────────────────────────────────────
   Défilement automatique toutes les 5 secondes.
   Les dots permettent la navigation manuelle.
   Les images du carrousel sont définies directement dans le
   CSS (background-image sur .hero-slide) ou dans le HTML.   */

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');

function allerSlide(index) {
  // Désactiver l'ancien slide et dot
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  // Activer le nouveau
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function initCarrousel() {
  if (slides.length === 0) return;

  // Clic sur les dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      allerSlide(parseInt(dot.dataset.index));
    });
  });

  // Défilement automatique
  setInterval(() => {
    allerSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

/* ─── 2. COMPTE À REBOURS ───────────────────────────────────
   Calcule le temps restant jusqu'au 3 janvier 2027 à 8h00.
   Se met à jour chaque seconde.                             */

function mettreAJourCompteur() {
  const cible = new Date('2027-01-03T08:00:00');
  const maintenant = new Date();
  const diff = cible - maintenant;

  if (diff <= 0) {
    document.getElementById('cd-j').textContent = '000';
    document.getElementById('cd-h').textContent = '00';
    document.getElementById('cd-m').textContent = '00';
    document.getElementById('cd-s').textContent = '00';
    return;
  }

  const jours    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const heures   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondes = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-j').textContent = String(jours).padStart(3, '0');
  document.getElementById('cd-h').textContent = String(heures).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(secondes).padStart(2, '0');
}

function initCompteur() {
  mettreAJourCompteur();
  setInterval(mettreAJourCompteur, 1000);
}

/* ─── 3. GRAPHIQUE BUDGET (Chart.js) ───────────────────────
   Graphique donut pour visualiser la répartition du budget.
   Chart.js est chargé via CDN dans index.html.             */

function initGraphiqueBudget() {
  const ctx = document.getElementById('budgetChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Inscription & frais',
        'Transport & hébergement',
        'Équipements & matériel',
        'Communication',
        'Activités & divers'
      ],
      datasets: [{
        data: [18000, 21000, 12000, 6000, 4000],
        backgroundColor: ['#1A5CD4', '#E87722', '#2B70E8', '#FF8C2A', '#8A9BC7'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.label + ' : ' + ctx.parsed.toLocaleString('fr-CA') + ' $'
          }
        }
      }
    }
  });
}

/* ─── 4. BOUTON SCROLL TO TOP ───────────────────────────────
   Apparaît après 400px de défilement.                       */

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── 5. INITIALISATION ─────────────────────────────────────
   On lance tout quand le DOM est prêt.                      */

document.addEventListener('DOMContentLoaded', () => {
  initCarrousel();
  initCompteur();
  initGraphiqueBudget();
  initScrollTop();
});