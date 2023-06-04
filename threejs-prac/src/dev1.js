import * as THREE from 'three';
import Stats from 'stats.js';
import {GUI} from 'dat.gui';
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

    mesh.rotation.reorder('YZX') // 회전축도 돌아가도록 한다.
    mesh.rotation.y = 1;
    mesh.rotation.x = 1;

    camera.lookAt(mesh.position);

    // 🔨개발 도구 추가
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper);

    // 초당 프레임 표시
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    const gui = new GUI();
    gui.add(mesh.position,'y',-5,5,0.01).name('메시 y 값') // 객체, 속성, 최소, 최대, 단계
    gui.add(camera.position,'y',-5,5,0.01).name('카메라 y 값')
    gui.add(camera.position,'z',-5,5,0.01).name('카메라 z 값')
    gui.add(camera.position,'x',-5,5,0.01).name('카메라 x 값')
    gui.add(light.position,'x',-5,5,0.01).name('빛 x 값')



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
        stats.begin();
        renderer.render(scene, camera)

        console.log(mesh.position.distanceTo(new THREE.Vector3(0,0,0))) // 백터의 거리 계산

        mesh.scale.x = 2;
        camera.lookAt(mesh.position)

        renderer.setAnimationLoop(animate);
        stats.end();
    }
    animate();

    window.addEventListener('keydown', (e)=>{
        // arrow up move mesh z position -1
        if(e.code === 'ArrowUp'){
            gsap.to(mesh.position, {duration: 1, z: mesh.position.z - 1})
        }else if(e.code === 'ArrowDown') {
            gsap.to(mesh.position, {duration: 1, z: mesh.position.z + 1})
        }else if(e.code === 'ArrowLeft') {
            gsap.to(mesh.position, {duration: 1, x: mesh.position.x - 1})
        }else if(e.code === 'ArrowRight') {
            gsap.to(mesh.position, {duration: 1, x: mesh.position.x + 1})
        }

    })

}