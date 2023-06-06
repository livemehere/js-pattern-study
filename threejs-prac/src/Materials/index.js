import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';

export default function run(){

    const { scene,camera,canvas } = create(()=>{
        // 애니메이션
    });

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
        console.log('로딩 시작')
    }
    loadingManager.onLoad = () => {
        console.log('로딩 완료')
    }
    loadingManager.onProgress = (img) => {
        console.log(img+' 로딩중')
    }
    loadingManager.onError = () => {
        console.log('로딩 실패')
    }

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const baseTexture = textureLoader.load('/Brick_Wall_019_basecolor.jpg');
    const texture = textureLoader.load('/Brick_Wall_019_normal.jpg');
    const roughTex = textureLoader.load('/Brick_Wall_019_roughness.jpg');
    const geometry = new THREE.BoxGeometry( 2,2,2);
    const material = new THREE.MeshStandardMaterial( {
        map:baseTexture,
        roughness:0.5,
        metalness:0.3,
        normalMap:texture,
        roughnessMap:roughTex,

    });
    const cone = new THREE.Mesh(geometry, material );
    scene.add(cone)


}

function create(animateFn){
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(3,3,3)

    // light (태양 빛)
    const light = new THREE.DirectionalLight('#ffffff',2);
    light.position.set(5,5,5);
    scene.add(light);

    // light2 (전반적인 빛)
    const light2 = new THREE.AmbientLight('#ffffff',0.1);
    scene.add(light2);

    // renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(innerWidth, innerHeight);

    // helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper)

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
