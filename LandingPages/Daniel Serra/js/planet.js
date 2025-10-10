let loaded = false;
function reveal() {
  if (loaded) return;
  loaded = true;
  document.body.classList.add("loaded");
  console.log("WebGL carregado");
}
window.webglLoaded = reveal;
setTimeout(reveal, 6000);

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("hero-globe-canvas");
if (!canvas) throw new Error("Canvas #hero-globe-canvas não encontrado");

const config = {
  model: "assets/models/earth.glb",
  radius: 2.8,
  cameraZ: 8,
  autoRotate: 0.04,
  drag: 0.0035,
  clamp: Math.PI / 2.8,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  36,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0.3, config.cameraZ);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

scene.add(new THREE.RectAreaLight(0xffffff, 0.95));
const dir = new THREE.RectAreaLight(0xffffff, 0.65);
dir.position.set(3, 2, 3);
scene.add(dir);

const root = new THREE.Group();
scene.add(root);
let modelGroup = new THREE.Group();
root.add(modelGroup);

const loader = new GLTFLoader();
loader.load(
  config.model,
  (gltf) => {
    const model = gltf.scene;
    centerModel(model);
    modelGroup.add(model);
    reveal();
  },
  undefined,
  (err) => {
    console.error("Erro ao carregar modelo:", err);
    reveal();
  }
);

function centerModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  model.position.sub(center);
  const scale = (config.radius * 2) / Math.max(size.x, size.y, size.z);
  model.scale.setScalar(scale);
}

let dragging = false,
  lastX = 0,
  lastY = 0;
const velocity = { x: 0, y: 0 };

canvas.addEventListener("pointerdown", (e) => {
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  canvas.style.cursor = "grabbing";
});

window.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  modelGroup.rotation.y += dx * config.drag;
  modelGroup.rotation.x = THREE.MathUtils.clamp(
    modelGroup.rotation.x + dy * config.drag,
    -config.clamp,
    config.clamp
  );
  velocity.x = dx * config.drag;
  velocity.y = dy * config.drag;
});

window.addEventListener("pointerup", () => {
  dragging = false;
  canvas.style.cursor = "grab";
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  if (!dragging) modelGroup.rotation.y += config.autoRotate * 0.016;
  modelGroup.rotation.y += velocity.x;
  velocity.x *= 0.9;

  renderer.render(scene, camera);
}
animate();
