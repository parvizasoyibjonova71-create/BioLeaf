// ── INTRO ──
setTimeout(() => document.getElementById('intro').classList.add('gone'), 2700);

// ── PAGE ROUTING ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active','visible'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  const nav  = document.getElementById('n-' + id);
  page.classList.add('active');
  if (nav) nav.classList.add('active');
  requestAnimationFrame(() => requestAnimationFrame(() => page.classList.add('visible')));
  window.scrollTo({top:0, behavior:'smooth'});
  document.getElementById('main-nav').classList.remove('open');
  setTimeout(triggerReveal, 80);
}

// ── ARTICLE TOGGLE ──
function toggleArt(id) {
  const expand = document.getElementById('expand-' + id);
  const isOpen = expand.classList.contains('open');
  // Close all
  document.querySelectorAll('.art-expand').forEach(e => e.classList.remove('open'));
  if (!isOpen) {
    expand.classList.add('open');
    setTimeout(() => expand.scrollIntoView({behavior:'smooth', block:'nearest'}), 100);
  }
}

// ── SCROLL REVEAL ──
function triggerReveal() {
  const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: 0.08});
  els.forEach(el => io.observe(el));
}
window.addEventListener('load', () => setTimeout(triggerReveal, 2900));

// ── THREE.JS DNA on home ──
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0, 7);
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  function resize() {
    const hero = document.querySelector('.h-hero');
    if (!hero) return;
    const w = hero.offsetWidth, h = hero.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const group = new THREE.Group();
  scene.add(group);
  const m1 = new THREE.MeshBasicMaterial({color:0x4ade80, transparent:true, opacity:.7});
  const m2 = new THREE.MeshBasicMaterial({color:0x2dd4bf, transparent:true, opacity:.7});
  const mr = new THREE.MeshBasicMaterial({color:0x86efac, transparent:true, opacity:.3});
  const sg = new THREE.SphereGeometry(.08, 8, 8);
  const rg = new THREE.CylinderGeometry(.016,.016,1,6);
  const N = 38;
  for (let i = 0; i < N; i++) {
    const t = i/N, ang = t*Math.PI*4.2, y = (t-.5)*9.5, r = .95;
    const s1 = new THREE.Mesh(sg, m1.clone());
    s1.position.set(Math.cos(ang)*r, y, Math.sin(ang)*r);
    group.add(s1);
    const s2 = new THREE.Mesh(sg, m2.clone());
    s2.position.set(Math.cos(ang+Math.PI)*r, y, Math.sin(ang+Math.PI)*r);
    group.add(s2);
    if (i%3===0) {
      const rung = new THREE.Mesh(rg, mr);
      const p1 = new THREE.Vector3(Math.cos(ang)*r,y,Math.sin(ang)*r);
      const p2 = new THREE.Vector3(Math.cos(ang+Math.PI)*r,y,Math.sin(ang+Math.PI)*r);
      const mid = p1.clone().add(p2).multiplyScalar(.5);
      rung.position.copy(mid);
      rung.lookAt(p2); rung.rotateX(Math.PI/2);
      rung.scale.y = p1.distanceTo(p2);
      group.add(rung);
    }
  }
  const pg = new THREE.BufferGeometry();
  const pc = 140, pos = new Float32Array(pc*3);
  for (let i=0;i<pc;i++) {
    pos[i*3]=(Math.random()-.5)*14; pos[i*3+1]=(Math.random()-.5)*12; pos[i*3+2]=(Math.random()-.5)*8-2;
  }
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({color:0x4ade80,size:.035,transparent:true,opacity:.4})));

  let t=0;
  (function animate() {
    requestAnimationFrame(animate); t+=.006;
    group.rotation.y = t*.38;
    group.position.y = Math.sin(t*.5)*.28;
    renderer.render(scene, camera);
  })();
})();

// ── BOOK STARS ──
['stars1','stars2'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  for (let i=0;i<28;i++) {
    const s = document.createElement('div');
    s.className = 'bstar';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*3}s;`;
    el.appendChild(s);
  }
});