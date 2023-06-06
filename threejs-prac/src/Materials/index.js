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
    const rightTexture = textureLoader.load('/mcstyle/right.png');
    const leftTexture = textureLoader.load('/mcstyle/left.png');
    const topTexture = textureLoader.load('/mcstyle/top.png');
    const bottomTexture = textureLoader.load('/mcstyle/bottom.png');
    const frontTexture = textureLoader.load('/mcstyle/front.png');
    const backTexture = textureLoader.load('/mcstyle/back.png');

    rightTexture.magFilter = THREE.NearestFilter;
    leftTexture.magFilter = THREE.NearestFilter;
    topTexture.magFilter = THREE.NearestFilter;
    bottomTexture.magFilter = THREE.NearestFilter;
    frontTexture.magFilter = THREE.NearestFilter;
    backTexture.magFilter = THREE.NearestFilter;


    const materialArray = [
        new THREE.MeshBasicMaterial({map: rightTexture}),
        new THREE.MeshBasicMaterial({map: leftTexture}),
        new THREE.MeshBasicMaterial({map: topTexture}),
        new THREE.MeshBasicMaterial({map: bottomTexture}),
        new THREE.MeshBasicMaterial({map: frontTexture}),
        new THREE.MeshBasicMaterial({map: backTexture}),
    ]

    const geometry = new THREE.BoxGeometry(2,2,2);
    const mesh = new THREE.Mesh(geometry, materialArray);
    scene.add(mesh);

}

function create(animateFn){
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(0,0,5)

    // light (태양 빛)
    const light = new THREE.DirectionalLight('#ffffff',2);
    light.position.set(1,1,2);
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
