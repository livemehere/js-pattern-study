import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function run(){
    const mesh = createMesh();
    const mesh2 = createMesh();
    mesh2.position.set(2,2,2);

    const scene = create(()=>{
        mesh.rotation.y += 0.01;
        mesh2.rotation.z += 0.01;
    });

    scene.add(mesh);
    scene.add(mesh2);

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

    // controls
    new OrbitControls(camera,canvas);

    // resize
    function resize(){
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth/innerHeight;
        camera.updateProjectionMatrix()
    }
    addEventListener('resize',resize);


    function animate(){
        requestAnimationFrame(animate);
        animateFn?.();
        renderer.render(scene, camera);
    }
    animate();

    return scene;
}
function createMesh(x =0,y =0,z =0){
    // geometry
    const geometry = new THREE.BoxGeometry(1,1,1); // Vector3 size

    // material
    const material = new THREE.MeshStandardMaterial({color:'#ffffff'});

    // mesh
    return new THREE.Mesh(geometry,material);
}