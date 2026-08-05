/* Scène 3D du Hero ("GR." en three.js r115) + champ d'étoiles canvas 2D.
   Les deux boucles d'animation sont mises en pause quand le hero sort du viewport. */

function initHeroScene() {
  const canvas3d = document.getElementById("gr-canvas");
  const canvasStars = document.getElementById("star-canvas");
  const heroSection = document.querySelector(".hero-sec");
  if (!canvas3d || !canvasStars || !heroSection) return;

  /* ---------- Champ d'étoiles (canvas 2D indépendant) ---------- */
  const starCtx = canvasStars.getContext("2d");
  let stars = [];
  let sparks = [];
  let starRAF = null;
  let starW = 0;
  let starH = 0;

  function seedStars(w, h) {
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
    }));
    sparks = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 2,
    }));
  }

  function resizeStars() {
    const rect = heroSection.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    starW = canvasStars.width = Math.round(rect.width * dpr);
    starH = canvasStars.height = Math.round(rect.height * dpr);
    canvasStars.style.width = rect.width + "px";
    canvasStars.style.height = rect.height + "px";
    seedStars(rect.width, rect.height);
  }

  function drawStars(t) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    starCtx.clearRect(0, 0, starW, starH);
    for (const s of stars) {
      const a = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.0012 * s.speed + s.phase));
      starCtx.fillStyle = `rgba(17,17,17,${a * 0.35})`;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fill();
    }
    for (const s of sparks) {
      const a = 0.2 + 0.8 * Math.abs(Math.sin(t * 0.0015 * s.speed + s.phase));
      starCtx.fillStyle = `rgba(17,17,17,${a * 0.5})`;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fill();
    }
    starRAF = requestAnimationFrame(drawStars);
  }

  function startStars() {
    if (!starRAF) starRAF = requestAnimationFrame(drawStars);
  }
  function stopStars() {
    if (starRAF) cancelAnimationFrame(starRAF);
    starRAF = null;
  }

  /* ---------- Scène three.js ---------- */
  let renderer = null;
  let scene = null;
  let camera = null;
  let textMesh = null;
  let particles = null;
  let threeRAF = null;
  let autoRotate = true;
  let targetRotX = 0;
  let targetRotY = 0;
  let autoAngle = 0;

  function initThree() {
    if (typeof THREE === "undefined") return;

    renderer = new THREE.WebGLRenderer({ canvas: canvas3d, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1000);
    camera.position.z = 62;

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    const keyLight = new THREE.PointLight(0xfff2e0, 1.2, 320);
    keyLight.position.set(60, 60, 90);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xd8d8d8, 0.55, 320);
    fillLight.position.set(-60, -40, 60);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 0, 120);
    scene.add(rimLight);

    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 55 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x111111, size: 1.1, transparent: true, opacity: 0.35 });
    particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const loader = new THREE.FontLoader();
    loader.load(
      "https://cdn.jsdelivr.net/npm/three@0.115.0/examples/fonts/helvetiker_bold.typeface.json",
      (font) => {
        const geo = new THREE.TextGeometry("GR.", {
          font,
          size: 9,
          height: 2.6,
          curveSegments: 8,
          bevelEnabled: true,
          bevelThickness: 0.4,
          bevelSize: 0.25,
          bevelSegments: 3,
        });
        geo.center();
        const mat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.88, roughness: 0.18 });
        textMesh = new THREE.Mesh(geo, mat);
        textMesh.rotation.y = 1.1;
        scene.add(textMesh);
      }
    );

    resizeThree();
    canvas3d.addEventListener("mouseenter", () => { autoRotate = false; });
    canvas3d.addEventListener("mouseleave", () => { autoRotate = true; });
    canvas3d.addEventListener("mousemove", onMouseMove);
  }

  function onMouseMove(e) {
    const rect = canvas3d.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = 260;
    const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / radius));
    const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / radius));
    targetRotY = nx * 0.7;
    targetRotX = ny * 0.4;
  }

  function resizeThree() {
    if (!renderer || !camera) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function animateThree() {
    threeRAF = requestAnimationFrame(animateThree);
    if (textMesh) {
      if (autoRotate) {
        autoAngle += 0.003;
        textMesh.rotation.y = 1.1 + Math.sin(autoAngle) * 0.35;
        textMesh.rotation.x = Math.cos(autoAngle * 0.7) * 0.08;
      } else {
        textMesh.rotation.y += (1.1 + targetRotY - textMesh.rotation.y) * 0.08;
        textMesh.rotation.x += (targetRotX - textMesh.rotation.x) * 0.08;
      }
    }
    if (particles) particles.rotation.y += 0.0006;
    renderer.render(scene, camera);
  }

  function startThree() {
    if (renderer && !threeRAF) animateThree();
  }
  function stopThree() {
    if (threeRAF) cancelAnimationFrame(threeRAF);
    threeRAF = null;
  }

  /* ---------- Cycle de vie : actif seulement quand le hero est visible ---------- */
  initThree();
  resizeStars();

  const resizeObserver = new ResizeObserver(() => {
    resizeStars();
    resizeThree();
  });
  resizeObserver.observe(heroSection);

  const heroVisibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startStars();
        startThree();
      } else {
        stopStars();
        stopThree();
      }
    },
    { threshold: 0 }
  );
  heroVisibilityObserver.observe(heroSection);
}
