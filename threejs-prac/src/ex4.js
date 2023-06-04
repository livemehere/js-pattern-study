import * as THREE from 'three';

/*
* 애니메이션
* - 보정
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

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.y = 1;
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color:'red'});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    setSize();

    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // width, height, css 처리까지 해줌 (1 혹은 2로 하는 것이 성능면에서 유리하다)
        renderer.render(scene, camera)

    }

    window.addEventListener('resize', setSize);

    let dy = 1;
    const clock = new THREE.Clock();
    function animate(){
        // const time = clock.getElapsedTime(); // 총 경과시간
        const delta = clock.getDelta(); // 마지막 프레임부터 경과시간  getElapsedTime()과 getDelta()는 같이 실행하면 꼬임. 같이사용x 호출 자체를 하면 안됨

        mesh.rotation.y += delta;
        mesh.position.y += (delta) * dy;
        if(mesh.position.y > 4 || mesh.position.y <= 0){
            dy = -dy;
        }
        renderer.render(scene, camera)
        // requestAnimationFrame(animate);
        renderer.setAnimationLoop(animate);
    }
    animate();

}