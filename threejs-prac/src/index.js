import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // canvasElement


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x42bcf5})
const cube = new THREE.Mesh(geometry,material) // Mesh extends Object3D

scene.add(cube) // Object3D 를 추가할 수 있음.

function init(){
    camera.position.z = 5;
}

function update(){
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    cube.rotation.z += 0.01;
}

function animate(){
    requestAnimationFrame(animate);
    update();
    renderer.render(scene,camera);
}
init();
animate();