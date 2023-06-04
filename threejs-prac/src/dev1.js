import * as THREE from 'three';
import gsap from 'gsap';

/*
* 개발 도구
* 1. AxesHelper : 축을 보여줌
* 2. GridHelper : 격자를 보여줌
* */
export default function run(){
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias:true,
    });

    const scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.z = 5;
    light.position.x = 2;
    scene.add(light);

    // 전반적으로 빛을 줄 때 사용
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.y = 5;
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color:'red'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.lookAt(mesh.position);

    // 개발 도구 추가
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper);



    setSize();
    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // width, height, css 처리까지 해줌 (1 혹은 2로 하는 것이 성능면에서 유리하다)
        renderer.render(scene, camera)

    }

    window.addEventListener('resize', setSize);

    function animate(){
        renderer.render(scene, camera)

        mesh.rotation.y += 0.01;

        renderer.setAnimationLoop(animate);
    }
    animate();

}