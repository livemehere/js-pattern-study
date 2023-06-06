import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import {TrackballControls} from "three/addons/controls/TrackballControls";

export default function run(){
    const circle = createCircle();
    const arr = circle.geometry.attributes.position.array;
    for(let i=0; i< arr.length; i+=3){
        arr[i] += (Math.random() - 0.5)*0.2;
        arr[i+1] += (Math.random() - 0.5)*0.2;
        arr[i+2] += (Math.random() - 0.5)*0.2;
    }
    const clone = arr.slice();
    const clock = new THREE.Clock();

    const { scene } = create(()=>{
        // 애니메이션
        const delta = clock.getElapsedTime() * 10;
        for(let i=0; i< clone.length; i+=3){
            arr[i] += Math.sin(delta+clone[i]*10) * 0.003;
            arr[i+1] += Math.sin(delta+clone[i+1]*10) * 0.003;
            arr[i+2] += Math.sin(delta+clone[i+1]*10) * 0.003;
        }
        circle.geometry.attributes.position.needsUpdate = true;
    });

    scene.add(circle)


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

    // Fog (안개)
    const fog = new THREE.Fog('#ffffff',1,15);
    scene.fog = fog;

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
    const controls = new TrackballControls(camera,canvas);

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
        renderer.render(scene, camera);
        controls.update();
        stats.end();
    }
    animate();

    return {
        scene,
        camera,
        renderer,
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