import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cube from './cube.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const materials = {
    [Cube.PieceColor.GREEN]: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    [Cube.PieceColor.BLUE]: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    [Cube.PieceColor.RED]: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    [Cube.PieceColor.ORANGE]: new THREE.MeshBasicMaterial({ color: 0xffa500 }),
    [Cube.PieceColor.YELLOW]: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    [Cube.PieceColor.WHITE]: new THREE.MeshBasicMaterial({ color: 0xffffff }),
}

var cube = new Cube(3);
console.log(cube);

cube.pieces.forEach(piece => {
    const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const cubeMaterials = [
        materials[piece.Color.Right],
        materials[piece.Color.Left],
        materials[piece.Color.Top],
        materials[piece.Color.Bottom],
        materials[piece.Color.Back],
        materials[piece.Color.Front]
    ];

    const mesh = new THREE.Mesh(geometry, cubeMaterials);
    mesh.position.set(piece.X, piece.Y, piece.Z);
    scene.add(mesh);
    console.log(mesh);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
