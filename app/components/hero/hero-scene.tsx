'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PINK = new THREE.Color('#DE1D8D');

function wireMat(opacity = 0.35) {
  return new THREE.MeshBasicMaterial({
    color: PINK,
    wireframe: true,
    transparent: true,
    opacity,
    depthWrite: false,
  });
}

const SHAPES: {
  geo: () => THREE.BufferGeometry;
  pos: [number, number, number];
  opacity: number;
  speed: number;
  initRot?: [number, number, number];
}[] = [
  {
    geo: () => new THREE.TorusKnotGeometry(1.1, 0.32, 128, 16),
    pos: [3.8, 0.3, -1.5],
    opacity: 0.28,
    speed: 0.004,
  },
  {
    geo: () => new THREE.IcosahedronGeometry(0.85, 1),
    pos: [-4.2, 1.8, -2],
    opacity: 0.36,
    speed: 0.006,
  },
  {
    geo: () => new THREE.OctahedronGeometry(0.55),
    pos: [2.2, 2.8, -2.5],
    opacity: 0.5,
    speed: 0.008,
  },
  {
    geo: () => new THREE.TorusGeometry(0.65, 0.18, 16, 64),
    pos: [-3.2, -2.0, -1.5],
    opacity: 0.3,
    speed: 0.005,
    initRot: [0.6, 0, 0.3],
  },
  {
    geo: () => new THREE.IcosahedronGeometry(0.28, 1),
    pos: [-1.5, 0.3, 0.5],
    opacity: 0.65,
    speed: 0.012,
  },
  {
    geo: () => new THREE.OctahedronGeometry(0.38),
    pos: [1.2, -2.2, 0.8],
    opacity: 0.55,
    speed: 0.01,
  },
  {
    geo: () => new THREE.TetrahedronGeometry(0.45),
    pos: [0.5, 3.0, -1.0],
    opacity: 0.46,
    speed: 0.007,
  },
  {
    geo: () => new THREE.IcosahedronGeometry(0.6, 1),
    pos: [-5.0, -0.5, -3],
    opacity: 0.22,
    speed: 0.005,
  },
];

function mount3DScene(container: HTMLDivElement): () => void {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 10;

  // Scattered particles
  const ptCount = 200;
  const ptPos = new Float32Array(ptCount * 3);
  for (let i = 0; i < ptCount; i++) {
    ptPos[i * 3] = (Math.random() - 0.5) * 44;
    ptPos[i * 3 + 1] = (Math.random() - 0.5) * 28;
    ptPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
  scene.add(
    new THREE.Points(
      ptGeo,
      new THREE.PointsMaterial({
        size: 0.028,
        color: PINK,
        transparent: true,
        opacity: 0.36,
        sizeAttenuation: true,
        depthWrite: false,
      })
    )
  );

  // Shapes group for parallax rotation
  const group = new THREE.Group();
  scene.add(group);

  const meshes = SHAPES.map((def) => {
    const mesh = new THREE.Mesh(def.geo(), wireMat(def.opacity));
    mesh.position.set(...def.pos);
    if (def.initRot) mesh.rotation.set(...def.initRot);
    group.add(mesh);
    return mesh;
  });

  // Smooth mouse parallax
  const mouse = { x: 0, y: 0, lx: 0, ly: 0 };
  const onMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', onMove);

  const clock = new THREE.Clock();
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    mouse.lx += (mouse.x - mouse.lx) * 0.04;
    mouse.ly += (mouse.y - mouse.ly) * 0.04;
    group.rotation.y = mouse.lx * 0.18;
    group.rotation.x = -mouse.ly * 0.1;

    meshes.forEach((mesh, i) => {
      mesh.rotation.x += SHAPES[i].speed;
      mesh.rotation.y += SHAPES[i].speed * 0.7;
      mesh.position.y = SHAPES[i].pos[1] + Math.sin(t * 0.8 + i * 1.1) * 0.15;
    });

    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
  };
}

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      const test = document.createElement('canvas');
      if (
        !window.WebGLRenderingContext ||
        (!test.getContext('webgl') && !test.getContext('experimental-webgl'))
      )
        return;
    } catch {
      return;
    }
    return mount3DScene(el);
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }} />;
}
