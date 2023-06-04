import * as THREE from 'three';


// 렌더러(캔버스)
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 씬(맵)
const scene = new THREE.Scene();

// 카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.y = 1;
camera.position.z = 5;
camera.position.x = 1;

// Mesh
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'red'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 렌더링
renderer.render(scene, camera)