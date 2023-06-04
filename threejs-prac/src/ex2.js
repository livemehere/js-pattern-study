import * as THREE from 'three';

export default function run(){
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:true
    });
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.y = 1;
    camera.position.z = 5;
    camera.position.x = 1;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color:'red'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    setSize();

    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)

    }

    window.addEventListener('resize', setSize);

}