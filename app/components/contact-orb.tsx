'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PINK = new THREE.Color('#DE1D8D');

function mountOrb(container: HTMLDivElement): () => void {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 9;

  // Morphing sphere — deform vertices each frame
  const sphereGeo = new THREE.SphereGeometry(1.8, 64, 64);
  const basePositions = sphereGeo.attributes.position.array.slice() as Float32Array;
  const sphereMat = new THREE.MeshBasicMaterial({
    color: PINK,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  // Orbit rings
  const ringDefs: [number, number, [number, number, number], number, number][] = [
    [2.5, 0.012, [0.3, 0, 0], 0.12, 0.18],
    [2.9, 0.009, [0, 0.5, 0.8], 0.09, 0.12],
    [3.3, 0.007, [1.0, 0, 0.3], 0.07, 0.08],
  ];

  const rings = ringDefs.map(([r, tube, rot, speed, opacity]) => {
    const geo = new THREE.TorusGeometry(r, tube, 8, 128);
    const mat = new THREE.MeshBasicMaterial({
      color: PINK,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.set(...rot);
    scene.add(mesh);
    return { mesh, speed };
  });

  const clock = new THREE.Clock();
  let frameId = 0;

  const posAttr = sphereGeo.attributes.position;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Morph sphere vertices
    for (let i = 0; i < posAttr.count; i++) {
      const ox = basePositions[i * 3];
      const oy = basePositions[i * 3 + 1];
      const oz = basePositions[i * 3 + 2];
      const noise = 1 + 0.18 * Math.sin(t * 1.8 + ox * 2.1) * Math.cos(t * 1.4 + oy * 1.9);
      posAttr.setXYZ(i, ox * noise, oy * noise, oz * noise);
    }
    posAttr.needsUpdate = true;
    sphereGeo.computeVertexNormals();

    sphere.rotation.x = t * 0.07;
    sphere.rotation.y = t * 0.11;

    rings[0].mesh.rotation.y = t * rings[0].speed;
    rings[1].mesh.rotation.x = t * rings[1].speed;
    rings[2].mesh.rotation.z = t * rings[2].speed;

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
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
  };
}

export default function ContactOrb() {
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
    return mountOrb(el);
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0" />;
}
