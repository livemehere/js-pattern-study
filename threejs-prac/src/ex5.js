import * as THREE from 'three';

/*
* 안개 Fog
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

    const fog = new THREE.Fog('#000000', 1, 10);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.y = 1;
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color:'red'});

    const meshes = [];
    for(let i = 0; i < 10; i++){
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() * 5) -2.5;
        mesh.position.z = (Math.random() * 5) -2.5;

        scene.add(mesh);
        meshes.push(mesh);

    }

    setSize();

    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // width, height, css 처리까지 해줌 (1 혹은 2로 하는 것이 성능면에서 유리하다)
        renderer.render(scene, camera)

    }

    window.addEventListener('resize', setSize);

    const clock = new THREE.Clock();
    function animate(){
        const delta = clock.getDelta();

        meshes.forEach(mesh => {
            mesh.rotation.y += delta * 1;
            mesh.rotation.x += delta * 0.5;
        })


        renderer.render(scene, camera)
        // requestAnimationFrame(animate);
        renderer.setAnimationLoop(animate);
    }
    animate();

}