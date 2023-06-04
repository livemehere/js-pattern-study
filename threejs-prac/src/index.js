import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // canvasElement


const points = [];
points.push( new THREE.Vector3(-10, 0,0));
points.push( new THREE.Vector3(0, 10,0));
points.push( new THREE.Vector3(10, 0,0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color:0xffffff});
const line = new THREE.Line(geometry,material);

function init(){
    camera.position.set(0,0,100)
    camera.lookAt(0,0,0);
    scene.add(line);
}

function update(){

}

function animate(){
    requestAnimationFrame(animate);
    update();
    renderer.render(scene,camera);
}
init();
animate();