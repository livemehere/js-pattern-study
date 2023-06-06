import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';

export default function run(){

    const points = [];
    points.push(new THREE.Vector3(0,0,100))
    points.push(new THREE.Vector3(0,0,-100))
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({color:'red'});
    const line = new THREE.Line(lineGeometry, lineMaterial);

    const cubeGeometry = new THREE.BoxGeometry(1,1,1);
    const cubeMaterial = new THREE.MeshStandardMaterial({color:'blue'});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = 'cube';

    const geometry = new THREE.TorusGeometry( 2, 0.5, 50, 50 );
    const material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
    const torus = new THREE.Mesh( geometry, material );
    torus.name = 'torus';

    const raycaster = new THREE.Raycaster();
    const origin = new THREE.Vector3(0,0,100);
    const direction = new THREE.Vector3(0,0,-100);
    direction.normalize();

    const meshes = [cube,torus];


    const clock = new THREE.Clock();
    const { scene,camera,canvas } = create(()=>{
        // 애니메이션
        cube.material.color.set('blue');
        torus.material.color.set('yellow');

        const elapsedTime = clock.getElapsedTime();
        raycaster.set(origin, direction);
        const intersects = raycaster.intersectObjects(meshes);
        intersects.forEach(intersect=>{
            intersect.object.material.color.set('red')
        })


        cube.position.y = Math.sin(elapsedTime*3) * 1.5;
        torus.position.y = Math.sin(elapsedTime*3) * 1.5;

    });

    scene.add(line);
    scene.add(cube);
    scene.add(torus);



}

function create(animateFn){
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(5,2,6)
    camera.lookAt(0,0,0);

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
    // scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    // scene.add(gridHelper)

    // FPS 표시
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // controls
    const controls = new OrbitControls(camera, canvas);

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
