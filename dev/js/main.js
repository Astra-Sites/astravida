// =======================
// 1. 3Dmol.js Molecule Viewer
// =======================

// Create the 3Dmol viewer inside the container
let viewer = $3Dmol.createViewer("mol-container", {
  backgroundColor: "#0c0f1c" // Match dark site theme
});

// Custom PDB data (Alanine molecule)
let pdbData = `
ATOM      1  N   ALA A   1       1.204  -0.947   0.000  1.00  0.00           N
ATOM      2  CA  ALA A   1       0.000   0.000   0.000  1.00  0.00           C
ATOM      3  C   ALA A   1      -1.204  -0.947   0.000  1.00  0.00           C
ATOM      4  O   ALA A   1      -2.204  -0.367   0.000  1.00  0.00           O
ATOM      5  CB  ALA A   1       0.000   1.250   1.000  1.00  0.00           C
END
`;

// Load model and apply cartoon + stick style
viewer.addModel(pdbData, "pdb");
viewer.setStyle({}, {
  cartoon: { color: 'spectrum' }, // colorful protein-style ribbons
  stick: {} // show bonds
});
viewer.zoomTo();
viewer.render();
viewer.resize();


// =======================
// 2. Three.js Animated Background
// =======================

const canvas = document.getElementById("bg-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
camera.position.z = 5;

// Torus Knot Shape (floating in background)
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  metalness: 0.6,
  roughness: 0.4
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
