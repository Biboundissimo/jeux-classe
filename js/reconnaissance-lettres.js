/*
 * Reconnaissance de lettres CAPITALES écrites au stylet, au doigt ou à la souris.
 * Fonctionne sans Internet, avec l'algorithme « $P » (Vatavu, Anthony & Wobbrock, 2012) :
 * le dessin est transformé en un nuage de 32 points, puis comparé à des modèles de chaque lettre.
 * L'ordre et le sens des traits n'ont donc pas d'importance.
 *
 *   ReconnaissanceLettres.reconnaitre(traits) -> [{ lettre: 'A', distance: 1.2 }, ...] du plus probable au moins probable
 *   ReconnaissanceLettres.apprendre('A', traits) : ajoute ce dessin comme modèle (mémorisé sur cet appareil)
 *
 * traits = [ [ {x, y}, {x, y}, ... ], ... ]  (un tableau de points par trait de stylo)
 */
const ReconnaissanceLettres = (() => {
  const N = 32;
  const CLE_STOCKAGE = 'reconnaissance-lettres-modeles';

  // ---------- Dessin des lettres modèles (x vers la droite, y vers le bas, hauteur 100) ----------
  const L = (x1, y1, x2, y2) => [[x1, y1], [x2, y2]];
  const suite = (...morceaux) => [].concat(...morceaux);
  function arc(cx, cy, rx, ry, de, a, pas = 12) {
    const points = [];
    for (let i = 0; i <= pas; i++) {
      const t = (de + (a - de) * i / pas) * Math.PI / 180;
      points.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
    }
    return points;
  }
  const ROND = arc(40, 50, 40, 50, -90, 270, 24);
  const BOUCLE_P = suite([[0, 0]], arc(25, 25, 30, 25, -90, 90), [[0, 50]]);

  // Chaque lettre peut avoir plusieurs façons de s'écrire.
  const DESSINS = {
    A: [[[[0, 100], [30, 0], [60, 100]], L(12, 60, 48, 60)]],
    B: [[L(0, 0, 0, 100), suite([[0, 0]], arc(28, 25, 26, 25, -90, 90), arc(30, 75, 30, 25, -90, 90), [[0, 100]])]],
    C: [[arc(45, 50, 45, 50, -40, -320)]],
    D: [[L(0, 0, 0, 100), suite([[0, 0]], arc(15, 50, 45, 50, -90, 90), [[0, 100]])]],
    E: [[L(0, 0, 0, 100), L(0, 0, 50, 0), L(0, 50, 40, 50), L(0, 100, 50, 100)]],
    F: [[L(0, 0, 0, 100), L(0, 0, 50, 0), L(0, 50, 40, 50)]],
    G: [[arc(45, 50, 45, 50, -40, -360), L(90, 55, 55, 55)],
        [suite(arc(45, 50, 45, 50, -40, -355), [[90, 90]]), L(60, 55, 90, 55)]],
    H: [[L(0, 0, 0, 100), L(60, 0, 60, 100), L(0, 50, 60, 50)]],
    I: [[L(20, 0, 20, 100)],
        [L(20, 0, 20, 100), L(0, 0, 40, 0), L(0, 100, 40, 100)]],
    J: [[suite(L(50, 0, 50, 70), arc(25, 70, 25, 30, 0, 180))],
        [suite(L(50, 0, 50, 70), arc(25, 70, 25, 30, 0, 180)), L(25, 0, 75, 0)]],
    K: [[L(0, 0, 0, 100), L(55, 0, 0, 55), L(15, 42, 55, 100)],
        [L(0, 0, 0, 100), [[55, 0], [0, 50], [55, 100]]]],
    L: [[[[0, 0], [0, 100], [50, 100]]]],
    M: [[[[0, 100], [0, 0], [35, 60], [70, 0], [70, 100]]],
        [[[0, 100], [8, 0], [35, 90], [62, 0], [70, 100]]]],
    N: [[[[0, 100], [0, 0], [60, 100], [60, 0]]]],
    O: [[ROND]],
    P: [[L(0, 0, 0, 100), BOUCLE_P]],
    Q: [[ROND, L(50, 75, 85, 105)]],
    R: [[L(0, 0, 0, 100), BOUCLE_P, L(25, 50, 60, 100)],
        [suite(L(0, 100, 0, 0), BOUCLE_P.slice(1), [[60, 100]])]],
    S: [[suite(arc(30, 25, 30, 25, -20, -270), arc(30, 75, 30, 25, -90, 160))]],
    T: [[L(0, 0, 60, 0), L(30, 0, 30, 100)]],
    U: [[suite(L(0, 0, 0, 65), arc(30, 65, 30, 35, 180, 0), L(60, 65, 60, 0))]],
    V: [[[[0, 0], [30, 100], [60, 0]]]],
    W: [[[[0, 0], [20, 100], [40, 30], [60, 100], [80, 0]]]],
    X: [[L(0, 0, 60, 100), L(60, 0, 0, 100)]],
    Y: [[L(0, 0, 30, 50), L(60, 0, 30, 50), L(30, 50, 30, 100)],
        [L(0, 0, 30, 50), L(60, 0, 0, 100)]],
    Z: [[[[0, 0], [60, 0], [0, 100], [60, 100]]]],
  };

  // ---------- Algorithme $P ----------
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  function versPoints(traits) {
    const points = [];
    traits.forEach((trait, id) => trait.forEach(p => points.push({ x: p.x, y: p.y, id })));
    return points;
  }

  function longueur(points) {
    let d = 0;
    for (let i = 1; i < points.length; i++)
      if (points[i].id === points[i - 1].id) d += distance(points[i - 1], points[i]);
    return d;
  }

  function reechantillonner(points) {
    points = points.slice();
    const pas = longueur(points) / (N - 1);
    let cumul = 0;
    const resultat = [points[0]];
    for (let i = 1; i < points.length; i++) {
      if (points[i].id !== points[i - 1].id) continue;
      const d = distance(points[i - 1], points[i]);
      if (cumul + d >= pas && d > 0) {
        const q = {
          x: points[i - 1].x + ((pas - cumul) / d) * (points[i].x - points[i - 1].x),
          y: points[i - 1].y + ((pas - cumul) / d) * (points[i].y - points[i - 1].y),
          id: points[i].id,
        };
        resultat.push(q);
        points.splice(i, 0, q);
        cumul = 0;
      } else cumul += d;
    }
    while (resultat.length < N) resultat.push({ ...points[points.length - 1] });
    return resultat.slice(0, N);
  }

  function normaliser(points) {
    points = reechantillonner(points);
    const xs = points.map(p => p.x), ys = points.map(p => p.y);
    const minX = Math.min(...xs), minY = Math.min(...ys);
    const taille = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY) || 1;
    points = points.map(p => ({ x: (p.x - minX) / taille, y: (p.y - minY) / taille, id: p.id }));
    const cx = points.reduce((s, p) => s + p.x, 0) / N;
    const cy = points.reduce((s, p) => s + p.y, 0) / N;
    return points.map(p => ({ x: p.x - cx, y: p.y - cy, id: p.id }));
  }

  function distanceNuage(a, b, debut) {
    const pris = new Array(N).fill(false);
    let somme = 0, i = debut;
    do {
      let min = Infinity, indice = -1;
      for (let j = 0; j < N; j++) {
        if (pris[j]) continue;
        const d = distance(a[i], b[j]);
        if (d < min) { min = d; indice = j; }
      }
      pris[indice] = true;
      const poids = 1 - ((i - debut + N) % N) / N;
      somme += poids * min;
      i = (i + 1) % N;
    } while (i !== debut);
    return somme;
  }

  function comparer(a, b) {
    const pas = Math.floor(Math.pow(N, 0.5));
    let min = Infinity;
    for (let i = 0; i < N; i += pas)
      min = Math.min(min, distanceNuage(a, b, i), distanceNuage(b, a, i));
    return min;
  }

  // ---------- Modèles ----------
  const modeles = [];

  function ajouterModeleDessin(lettre, traitsXY) {
    // On accepte les lettres plus étroites ou plus larges que le modèle.
    for (const largeur of [0.65, 1, 1.4]) {
      const traits = traitsXY.map(t => t.map(([x, y]) => ({ x: x * largeur, y })));
      modeles.push({ lettre, points: normaliser(versPoints(traits)) });
    }
  }
  for (const [lettre, facons] of Object.entries(DESSINS))
    facons.forEach(traits => ajouterModeleDessin(lettre, traits));

  // Modèles appris sur cet appareil (quand l'enfant corrige une lettre mal reconnue).
  let appris = {};
  try { appris = JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || {}; } catch (e) { appris = {}; }
  for (const [lettre, liste] of Object.entries(appris))
    liste.forEach(points => modeles.push({ lettre, points, appris: true }));

  function reconnaitre(traits) {
    traits = traits.filter(t => t.length > 0);
    if (!traits.length) return null;
    const points = versPoints(traits);
    if (longueur(points) < 10) return null; // simple point : on ignore
    const dessin = normaliser(points);
    const meilleur = {};
    for (const m of modeles) {
      const d = comparer(dessin, m.points);
      if (!(m.lettre in meilleur) || d < meilleur[m.lettre]) meilleur[m.lettre] = d;
    }
    return Object.entries(meilleur)
      .map(([lettre, d]) => ({ lettre, distance: d }))
      .sort((a, b) => a.distance - b.distance);
  }

  function apprendre(lettre, traits) {
    const points = versPoints(traits.filter(t => t.length));
    if (longueur(points) < 10) return;
    const normalise = normaliser(points);
    modeles.push({ lettre, points: normalise, appris: true });
    const arrondi = normalise.map(p => ({ x: +p.x.toFixed(3), y: +p.y.toFixed(3), id: p.id }));
    appris[lettre] = (appris[lettre] || []).concat([arrondi]).slice(-5); // 5 dessins au plus par lettre
    try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(appris)); } catch (e) { /* stockage indisponible */ }
  }

  return { reconnaitre, apprendre, _dessins: DESSINS };
})();
