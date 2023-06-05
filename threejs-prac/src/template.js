import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function run(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1,1000);
    camera.position.z = 5;
    camera.position.y = 3;

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({canvas});

    new OrbitControls(camera, renderer.domElement);


    function setSize(){
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
    }
    setSize();
    addEventListener('resize',setSize);

    const light = new THREE.DirectionalLight('#ffffff',1);
    light.position.set(3,3,4); // 빛 각도 주의 !
    scene.add(light);

    const light2 = new THREE.AmbientLightProbe('#ffffff',0.5);
    scene.add(light2);

    // create mesh here


    function animate(){
        renderer.setAnimationLoop(animate);

        // animate here

        renderer.render(scene,camera);
    }
    animate();







}