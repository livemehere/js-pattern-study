import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export default function run(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(2,5,5)

    const light = new THREE.DirectionalLight('#ffffff');
    light.position.set(3,3,3);
    scene.add(light);

    const light2 = new THREE.AmbientLight('#ffffff',0.1);
    scene.add(light2)

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper)

    const controls = new OrbitControls(camera,document.querySelector('#three-canvas'));

    /* PlayGround */



    /* - */

    function animate(){
        requestAnimationFrame(animate);
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#three-canvas') });
        renderer.setSize(innerWidth, innerHeight);
        renderer.render(scene,camera);
    }
    animate();
}
