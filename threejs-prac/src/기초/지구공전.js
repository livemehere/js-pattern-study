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

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color:'hotpink', side:THREE.DoubleSide});

    const g1 = new THREE.Group();
    const g2 = new THREE.Group();
    const g3 = new THREE.Group();

    const mesh = new THREE.Mesh(geometry,material);
    const mesh2 = mesh.clone();
    const mesh3 = mesh.clone();

    mesh2.scale.set(0.5,0.5,0.5);
    mesh3.scale.set(0.2,0.2,0.2);

    g2.position.x = -2;
    g3.position.x = -1


    g1.add(mesh,g2);
    g2.add(mesh2, g3);
    g3.add(mesh3);

    scene.add(g1);

    function animate(){
        renderer.setAnimationLoop(animate);

        g1.rotation.y += 0.01;
        g2.rotation.y += 0.01;
        g3.rotation.y += 0.01;

        camera.lookAt(mesh.position)
        renderer.render(scene,camera);
    }
    animate();







}