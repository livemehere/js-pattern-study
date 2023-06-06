import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import dat from "dat.gui";

export default function run(){


    const { scene,camera,canvas } = create(()=>{
        // 애니메이션
    });

    // geometry
    const boxGeometry = new THREE.BoxGeometry(1,1,1);
    const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
    const planeGeometry = new THREE.PlaneGeometry(10,10);

    // material
    const material = new THREE.MeshStandardMaterial({color:'tomato'});
    const material2 = new THREE.MeshStandardMaterial({color:'dodgerblue'});
    const material3 = new THREE.MeshStandardMaterial({color:'#ffffff'});

    // mesh
    const boxMesh = new THREE.Mesh(boxGeometry,material);
    const sphereMesh = new THREE.Mesh(sphereGeometry,material2);
    const planeMesh = new THREE.Mesh(planeGeometry,material3);

    boxMesh.castShadow = true; // 그림자
    sphereMesh.castShadow = true; // 그림자
    planeMesh.receiveShadow = true; // 그림자

    planeMesh.rotation.x = Math.PI/ 180 * -90;
    boxMesh.position.set(2,1,0);
    sphereMesh.position.set(-2,1,0);

    scene.add(boxMesh,sphereMesh,planeMesh);


}

function create(animateFn){
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(0,8,8)

    // light (태양 빛)
    const light = new THREE.DirectionalLight('#ffffff',0.8);
    light.position.set(0,5,0);
    light.castShadow = true; // 그림자
    light.shadow.mapSize.width = 1024; // 그림자 해상도
    light.shadow.mapSize.height = 1024; // 그림자 해상도
    light.shadow.radius = 10; // 그림자 부드럽게
    light.shadow.camera.near = 0.1; // 그림자 카메라 near (그림자를 표시할 범위)
    light.shadow.camera.far = 100; // 그림자 카메라 far (그림자를 표시할 범위)

    scene.add(light);

    // light2 (전반적인 빛)
    const light2 = new THREE.AmbientLight('#ffffff',0.05);
    scene.add(light2);

    // renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true; // 그림자

    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 그림자
    // renderer.shadowMap.type = THREE.BasicShadowMap; // 픽셀아트 느낌
    // renderer.shadowMap.type = THREE.PCFShadowMap; // 그림자
    // renderer.shadowMap.type = THREE.VSMShadowMap; // 그림자



    // helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper)

    const lightHelper = new THREE.DirectionalLightHelper(light);
    scene.add(lightHelper);

    const gui = new dat.GUI();
    gui.add(light.position,'x',-5,5).name('light x');
    gui.add(light.position,'y',-5,5).name('light y');
    gui.add(light.position,'z',-5,5).name('light z');

    // controls
    const controls = new OrbitControls(camera, canvas);

    // FPS 표시
    const stats = new Stats();
    document.body.appendChild(stats.dom);


    // resize
    function resize(){
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth/innerHeight;
        camera.updateProjectionMatrix()
    }
    addEventListener('resize',resize);


    function animate(){
        requestAnimationFrame(animate);
        stats.begin();
        animateFn?.();

        light.position.x = Math.sin(Date.now()/1000) * 5;
        light.position.z = Math.cos(Date.now()/1000) * 5;



        renderer.render(scene, camera);
        stats.end();
    }
    animate();

    return {
        scene,
        camera,
        renderer,
        canvas
    };
}


function createMesh(x =0,y =0,z =0){
    // geometry
    const geometry = new THREE.BoxGeometry(1,1,1); // Vector3 size

    // material
    const material = new THREE.MeshStandardMaterial({color:'#ffffff'});

    // mesh
    return new THREE.Mesh(geometry,material);
}
function createCircle(){
    const geometry = new THREE.SphereGeometry(3,64,64);
    const material = new THREE.MeshStandardMaterial({ color:'hotpink',flatShading:true });
    return new THREE.Mesh(geometry,material);
}