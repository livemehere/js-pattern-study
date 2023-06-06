import * as THREE from 'three';

/*
* 1. 가장 기초
* 2. 렌더러, 씬, 카메라, 메쉬
* 3. 원근 카메라, 직교 카메라
* */
export default function run(){
    // 렌더러(캔버스)
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

// 씬(맵)
    const scene = new THREE.Scene();

// 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.y = 1;
    camera.position.z = 5;
    camera.position.x = 1;


// 직교 카메라 (는 깊이를 zoom 으로 조절함)
    const orthoCamera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight),
        window.innerWidth / window.innerHeight,
        1,
        -1,
        0.1,
        1000
    );
    orthoCamera.position.y = 1;
    orthoCamera.position.z = 5;
    orthoCamera.position.x = 1;
    orthoCamera.lookAt(0,0,0);

    orthoCamera.zoom = 0.5;
    orthoCamera.updateProjectionMatrix(); // 카메라 속성을 업데이트하고서 적용하기 위해 호출해야함



// Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color:'red'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

// 렌더링
    renderer.render(scene, camera)
}