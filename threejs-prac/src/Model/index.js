import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import {TrackballControls} from "three/addons/controls/TrackballControls";
import {FlyControls} from "three/addons/controls/FlyControls";
import {PointerLockControls} from "three/addons/controls/PointerLockControls";
import {DragControls} from "three/addons/controls/DragControls";
import KeyController from "../기초/KeyController";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";

export default function run(){

    let mixer;
    const clock = new THREE.Clock();
    const { scene,camera,canvas } = create(()=>{
        // 애니메이션
        mixer?.update(clock.getDelta());

    });


    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/man.glb', (gltf)=>{
        const manMesh = gltf.scene.children[0];
        scene.add(manMesh)

        mixer = new THREE.AnimationMixer(manMesh);
        const actions = [];
        gltf.animations.forEach((animation)=>{
            actions.push(mixer.clipAction(animation))
        })
        console.log(actions)
        actions[1].repetitions = 1; // 기본은 무한반복인데, 1번만 실행하도록
        actions[1].clampWhenFinished = true; // 원위치가 기본인데, 애니메이션 시작위치로 종료하기
        actions[1].play();
    })
}

function create(animateFn){
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(2,5,5)

    // light (태양 빛)
    const light = new THREE.DirectionalLight('#ffffff');
    light.position.set(3,3,3);
    scene.add(light);

    // light2 (전반적인 빛)
    const light2 = new THREE.AmbientLight('#ffffff',0.1);
    scene.add(light2)

    // renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(innerWidth, innerHeight);

    // helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper)

    // FPS 표시
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // controls
    const controls = new OrbitControls(camera, canvas);

    const keyController = new KeyController();
    function walk(){
        if(keyController.keys['w']){
            controls.moveForward(0.1);
        }
        if(keyController.keys['s']){
            controls.moveForward(-0.1);
        }

        if(keyController.keys['a']){
            controls.moveRight(-0.1);
        }

        if(keyController.keys['d']){
            controls.moveRight(0.1);
        }
    }


    // resize
    function resize(){
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth/innerHeight;
        camera.updateProjectionMatrix()
    }
    addEventListener('resize',resize);


    const clock = new THREE.Clock();
    function animate(){
        requestAnimationFrame(animate);
        stats.begin();
        animateFn?.();
        walk();
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