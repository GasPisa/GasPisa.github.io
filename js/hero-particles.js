(function () {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.getElementById('home');
  if (!canvas || !hero || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 22);

  const group = new THREE.Group();
  scene.add(group);

  const titleEl = hero.querySelector('.hero-text h1');

  function visibleSizeAt(z) {
    const vFov = (camera.fov * Math.PI) / 180;
    const dist = camera.position.z - z;
    const height = 2 * Math.tan(vFov / 2) * dist;
    return { width: height * camera.aspect, height };
  }

  // Set the camera's aspect from the hero's actual size before laying out any points, so the
  // field's extent below is computed against the real viewport, not a guessed box.
  const initialRect = hero.getBoundingClientRect();
  camera.aspect = Math.max(initialRect.width, 1) / Math.max(initialRect.height, 1);
  camera.updateProjectionMatrix();
  const baseVisible = visibleSizeAt(0);

  const isSmall = window.innerWidth < 640;
  const TOTAL = isSmall ? 28 : 56;
  // The frame spans the full viewport at load time; resize() rescales the group to match later.
  const SPREAD = { x: baseVisible.width / 2, y: baseVisible.height / 2, z: 4 };
  const MAX_DIST = isSmall ? 3.6 : 4.2;
  // Keep the field hugging the border only — a thin band right at the edge, reaching all the way
  // out to the corners (an ellipse never does), leaving the whole center clear.
  const INNER_BAND = 0.86;

  // Point on the actual rectangle boundary at a given angle (reaches the corners; an ellipse
  // formula would not), scaled by hw/hh.
  function rectBoundaryPoint(angle, hw, hh) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = Math.min(hw / (Math.abs(c) || 1e-6), hh / (Math.abs(s) || 1e-6));
    return [c * t, s * t];
  }

  const basePositions = new Float32Array(TOTAL * 3);
  const phases = new Float32Array(TOTAL);
  const bobAmount = new Float32Array(TOTAL);

  // One point per angular slot (with jitter) instead of pure random placement — pure randomness
  // clumps some areas into a dense blob while leaving others with disconnected, isolated points.
  const angleStep = (Math.PI * 2) / TOTAL;
  for (let i = 0; i < TOTAL; i++) {
    const angle = i * angleStep + (Math.random() - 0.5) * angleStep * 0.7;
    const r = INNER_BAND + Math.random() * (1 - INNER_BAND);
    const [bx, by] = rectBoundaryPoint(angle, SPREAD.x, SPREAD.y);
    basePositions[i * 3] = bx * r;
    basePositions[i * 3 + 1] = by * r;
    basePositions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD.z * 2;
    phases[i] = Math.random() * Math.PI * 2;
    bobAmount[i] = 0.4;
  }

  const pointPositions = basePositions.slice();
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  const pointColors = new Float32Array(TOTAL * 3);
  pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

  const pointMaterial = new THREE.PointsMaterial({
    size: isSmall ? 0.22 : 0.26,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  group.add(points);

  // ---- Edges: the ring itself is always fully closed, plus nearby cross-links for fill ----
  const edges = [];
  const edgeSeen = new Set();
  function addEdge(i, j) {
    const key = i < j ? i * TOTAL + j : j * TOTAL + i;
    if (edgeSeen.has(key)) return;
    edgeSeen.add(key);
    edges.push(i, j);
  }
  for (let i = 0; i < TOTAL; i++) addEdge(i, (i + 1) % TOTAL); // guaranteed closed loop, no gaps
  for (let i = 0; i < TOTAL; i++) {
    for (let j = i + 1; j < TOTAL; j++) {
      const dx = basePositions[i * 3] - basePositions[j * 3];
      const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
      const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) addEdge(i, j);
    }
  }
  const edgeCount = edges.length / 2;
  const edgeLength = new Float32Array(edgeCount);
  for (let e = 0; e < edgeCount; e++) {
    const a = edges[e * 2];
    const b = edges[e * 2 + 1];
    const dx = basePositions[a * 3] - basePositions[b * 3];
    const dy = basePositions[a * 3 + 1] - basePositions[b * 3 + 1];
    const dz = basePositions[a * 3 + 2] - basePositions[b * 3 + 2];
    edgeLength[e] = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
  }

  const adjacency = Array.from({ length: TOTAL }, () => []);
  for (let e = 0; e < edgeCount; e++) {
    const a = edges[e * 2];
    const b = edges[e * 2 + 1];
    adjacency[a].push({ node: b, edge: e });
    adjacency[b].push({ node: a, edge: e });
  }

  const linePositions = new Float32Array(edges.length * 3);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineColors = new Float32Array(edges.length * 3);
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: 0.55,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  // ---- Hover: a soft, light glow that follows the nearest node under the cursor ----
  function createGlowTexture() {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }
  const hoverColor = new THREE.Color(1, 1, 1);
  const hoverSpriteMaterial = new THREE.SpriteMaterial({
    map: createGlowTexture(),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const hoverSprite = new THREE.Sprite(hoverSpriteMaterial);
  const hoverSpriteBaseScale = isSmall ? 0.9 : 1.1;
  hoverSprite.scale.set(hoverSpriteBaseScale, hoverSpriteBaseScale, 1);
  // Added to the scene directly (not the group): the group's scale is non-uniform once resize()
  // stretches it to the viewport aspect, which would otherwise squash this sprite into an ellipse.
  scene.add(hoverSprite);
  const hoverWorldPos = new THREE.Vector3();

  let hoverIndex = -1;
  let hoverAmount = 0;

  // ---- Theme-aware base colors ----
  const accentColor = new THREE.Color();
  const accent2Color = new THREE.Color();
  // A vivid, warm color for the click pulse — deliberately not white, so it reads as a
  // distinct spark of energy against the cool indigo/cyan field.
  const pulseColor = new THREE.Color('#ff9d3c');

  function readThemeColors() {
    const cs = getComputedStyle(document.documentElement);
    accentColor.set(cs.getPropertyValue('--accent').trim() || '#818cf8');
    accent2Color.set(cs.getPropertyValue('--accent-2').trim() || '#22d3ee');
    hoverColor.copy(accent2Color).lerp(new THREE.Color(1, 1, 1), 0.55);
    hoverSpriteMaterial.color.copy(hoverColor);
  }
  readThemeColors();

  function resize() {
    const rect = hero.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Rescale the field so its ellipse keeps hugging the viewport edges at the new size...
    const nowVisible = visibleSizeAt(0);
    group.scale.set(nowVisible.width / baseVisible.width, nowVisible.height / baseVisible.height, 1);

    // ...and recenter it on the title, not the geometric middle of the canvas — the hero's
    // padding-top and flex centering mean those aren't quite the same point.
    if (titleEl) {
      const tRect = titleEl.getBoundingClientRect();
      const cx = tRect.left + tRect.width / 2 - rect.left;
      const cy = tRect.top + tRect.height / 2 - rect.top;
      const ndcX = (cx / width) * 2 - 1;
      const ndcY = -(cy / height) * 2 + 1;
      group.position.set(ndcX * (nowVisible.width / 2), ndcY * (nowVisible.height / 2), 0);
    }
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize).catch(() => {});

  let targetTiltX = 0;
  let targetTiltY = 0;
  let lastClientX = null;
  let lastClientY = null;
  window.addEventListener('pointermove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetTiltY = nx * 0.25;
    targetTiltX = ny * 0.15;
    lastClientX = e.clientX;
    lastClientY = e.clientY;
  });
  window.addEventListener('pointerleave', () => {
    lastClientX = null;
    lastClientY = null;
  });

  let heroVisible = true;
  new IntersectionObserver(
    (entries) => { heroVisible = entries[0].isIntersecting; },
    { threshold: 0 }
  ).observe(hero);

  // ---- Click-to-pulse: raycast against points, propagate a wave along the graph ----
  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 0.7;
  const ndc = new THREE.Vector2();
  const nodeGlow = new Float32Array(TOTAL);
  const PULSE_SPEED = 14;
  const FADE_DURATION = 0.9;
  const MAX_PULSES = 6;
  let activePulses = [];

  function dijkstra(startIdx) {
    const dist = new Float32Array(TOTAL).fill(Infinity);
    const visited = new Uint8Array(TOTAL);
    dist[startIdx] = 0;
    for (let iter = 0; iter < TOTAL; iter++) {
      let u = -1;
      let best = Infinity;
      for (let i = 0; i < TOTAL; i++) {
        if (!visited[i] && dist[i] < best) { best = dist[i]; u = i; }
      }
      if (u === -1) break;
      visited[u] = 1;
      for (const { node: v, edge } of adjacency[u]) {
        const d = dist[u] + edgeLength[edge];
        if (d < dist[v]) dist[v] = d;
      }
    }
    return dist;
  }

  function triggerPulse(startIdx, now) {
    const dist = dijkstra(startIdx);
    let maxFinite = 0;
    for (let i = 0; i < TOTAL; i++) if (isFinite(dist[i]) && dist[i] > maxFinite) maxFinite = dist[i];
    activePulses.push({
      startTime: now,
      dist,
      expires: now + maxFinite / PULSE_SPEED + FADE_DURATION,
    });
    if (activePulses.length > MAX_PULSES) activePulses.shift();
  }

  hero.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObject(points);
    if (hits.length && hits[0].index !== undefined) {
      triggerPulse(hits[0].index, clock.getElapsedTime());
    }
  });

  const clock = new THREE.Clock();

  function updateColors(now) {
    nodeGlow.fill(0);
    if (activePulses.length) {
      activePulses = activePulses.filter((p) => now < p.expires);
      for (const pulse of activePulses) {
        for (let i = 0; i < TOTAL; i++) {
          const d = pulse.dist[i];
          if (!isFinite(d)) continue;
          const age = now - pulse.startTime - d / PULSE_SPEED;
          if (age >= 0 && age < FADE_DURATION) {
            const g = 1 - age / FADE_DURATION;
            if (g > nodeGlow[i]) nodeGlow[i] = g;
          }
        }
      }
    }

    const pc = pointGeometry.attributes.color.array;
    for (let i = 0; i < TOTAL; i++) {
      const g = nodeGlow[i];
      // A light, subtle boost on hover — distinct from (and gentler than) the click pulse.
      const hg = i === hoverIndex ? hoverAmount * 0.5 : 0;
      const amt = g >= hg ? g : hg;
      const target = g >= hg ? pulseColor : hoverColor;
      pc[i * 3] = accentColor.r + (target.r - accentColor.r) * amt;
      pc[i * 3 + 1] = accentColor.g + (target.g - accentColor.g) * amt;
      pc[i * 3 + 2] = accentColor.b + (target.b - accentColor.b) * amt;
    }
    pointGeometry.attributes.color.needsUpdate = true;

    const lc = lineGeometry.attributes.color.array;
    for (let e = 0; e < edgeCount; e++) {
      const a = edges[e * 2];
      const b = edges[e * 2 + 1];
      const g = Math.max(nodeGlow[a], nodeGlow[b]);
      const r = accent2Color.r + (pulseColor.r - accent2Color.r) * g;
      const gg = accent2Color.g + (pulseColor.g - accent2Color.g) * g;
      const b2 = accent2Color.b + (pulseColor.b - accent2Color.b) * g;
      lc[e * 6] = r; lc[e * 6 + 1] = gg; lc[e * 6 + 2] = b2;
      lc[e * 6 + 3] = r; lc[e * 6 + 4] = gg; lc[e * 6 + 5] = b2;
    }
    lineGeometry.attributes.color.needsUpdate = true;
  }

  function renderStaticFrame() {
    resize();
    updateColors(0);
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!heroVisible) return;

    const t = clock.getElapsedTime();
    const pos = pointGeometry.attributes.position.array;
    for (let i = 0; i < TOTAL; i++) {
      const amt = bobAmount[i];
      pos[i * 3] = basePositions[i * 3] + Math.sin(t * 0.3 + phases[i]) * amt;
      pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 0.25 + phases[i]) * amt;
      pos[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 0.2 + phases[i]) * amt * 0.75;
    }
    pointGeometry.attributes.position.needsUpdate = true;

    const linePos = lineGeometry.attributes.position.array;
    for (let e = 0; e < edgeCount; e++) {
      const a = edges[e * 2];
      const b = edges[e * 2 + 1];
      linePos[e * 6] = pos[a * 3];
      linePos[e * 6 + 1] = pos[a * 3 + 1];
      linePos[e * 6 + 2] = pos[a * 3 + 2];
      linePos[e * 6 + 3] = pos[b * 3];
      linePos[e * 6 + 4] = pos[b * 3 + 1];
      linePos[e * 6 + 5] = pos[b * 3 + 2];
    }
    lineGeometry.attributes.position.needsUpdate = true;

    // Bounded sway (not a full spin) so no particle can ever swing close to the camera.
    group.rotation.y = Math.sin(t * 0.05) * 0.16;
    group.rotation.x += (targetTiltX - group.rotation.x) * 0.02;
    group.rotation.z += (targetTiltY * 0.3 - group.rotation.z) * 0.02;

    // Hover: raycast against this frame's (already-updated) positions/transform.
    if (lastClientX !== null) {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((lastClientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((lastClientY - rect.top) / rect.height) * 2 + 1;
      group.updateMatrixWorld(true);
      raycaster.setFromCamera(ndc, camera);
      const hoverHits = raycaster.intersectObject(points);
      hoverIndex = hoverHits.length && hoverHits[0].index !== undefined ? hoverHits[0].index : -1;
    } else {
      hoverIndex = -1;
    }
    hoverAmount += ((hoverIndex >= 0 ? 1 : 0) - hoverAmount) * 0.15;
    if (hoverIndex >= 0) {
      hoverWorldPos.set(pos[hoverIndex * 3], pos[hoverIndex * 3 + 1], pos[hoverIndex * 3 + 2]);
      group.localToWorld(hoverWorldPos);
      hoverSprite.position.copy(hoverWorldPos);
    }
    hoverSpriteMaterial.opacity = hoverAmount * 0.55;
    const hoverScale = hoverSpriteBaseScale * (0.85 + 0.15 * hoverAmount);
    hoverSprite.scale.set(hoverScale, hoverScale, 1);

    updateColors(t);
    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    renderStaticFrame();
    window.addEventListener('resize', renderStaticFrame);
  } else {
    animate();
  }
})();
