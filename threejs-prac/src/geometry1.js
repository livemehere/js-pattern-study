import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function run(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1,1000);
    camera.position.z = 15;
    camera.position.y = 3;

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, side:THREE.DoubleSide});

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
    const geometry = new THREE.SphereGeometry(5,64,64);
    // const geometry = new THREE.PlaneGeometry(10,10,64,64);
    const material = new THREE.MeshStandardMaterial({ color:'hotpink', flatShading:true });
    const sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);

    const positions = sphere.geometry.attributes.position.array;
    for( let i = 0; i < positions.length; i+=3){
        positions[i] += (Math.random() - 0.5)*0.3;
        positions[i+1] += (Math.random() - 0.5)*0.3;
        positions[i+2] += (Math.random() - 0.5)*0.3;
    }
    const randoms = positions.slice();
    const clock = new THREE.Clock();
    console.log(randoms)

    function animate(){
        renderer.setAnimationLoop(animate);
        // animate here
        const time = clock.getElapsedTime() * 10;

        for( let i = 0; i < positions.length; i+=3){
            positions[i] += Math.sin(time+randoms[i]*100)*0.005;
            positions[i+1] += Math.sin(time+randoms[i+1]*100)*0.005;
            positions[i+2] += Math.sin(time+randoms[i+2]*100)*0.005;
        }

        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene,camera);
    }
    animate();







}