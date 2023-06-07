import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

export default function run(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(2,5,5)

    const light = new THREE.DirectionalLight('#ffffff');
    light.position.set(3,3,3);
    scene.add(light);

    const light2 = new THREE.AmbientLight('#ffffff',0.1);
    scene.add(light2)

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper)

    const controls = new OrbitControls(camera,document.querySelector('#three-canvas'));

    /* PlayGround */

    // material 기본 충돌 설정
    const defaultMaterial = new CANNON.Material('default');
    const defaultContactMaterial = new CANNON.ContactMaterial(
        defaultMaterial,
        defaultMaterial,
        {
            friction:0.5,
            restitution:0.3
    });

    const cannonWorld = new CANNON.World();
    cannonWorld.gravity.set(0,-9.82,0);
    cannonWorld.defaultContactMaterial = defaultContactMaterial;

    const groundBody = new CANNON.Body({
        mass:0,
        shape:new CANNON.Plane(),
        position:new CANNON.Vec3(0,0,0)
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    cannonWorld.addBody(groundBody);

    const boxBody = new CANNON.Body({
        mass:3,
        shape:new CANNON.Box(new CANNON.Vec3(0.25,2.5,0.5)),
        position:new CANNON.Vec3(0,10,0)
    })
    cannonWorld.addBody(boxBody);

    const planeGeometry = new THREE.PlaneGeometry(10,10);
    const planeMaterial = new THREE.MeshPhongMaterial({color:'gray'});
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x = -Math.PI/2;
    scene.add(plane);

    const boxGeometry = new THREE.BoxGeometry(0.5,5,1);
    const boxMaterial = new THREE.MeshPhongMaterial({color:'hotpink'});
    const box = new THREE.Mesh(boxGeometry,boxMaterial);
    box.position.set(0,0.5,0);
    scene.add(box);

    /* - */

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#three-canvas') });
    renderer.setSize(innerWidth, innerHeight);

    const clock = new THREE.Clock();
    function animate(){
        const delta = clock.getDelta();
        let cannonStep = 1/60;
        if(delta < 0.01){
            cannonStep = 1/120;
        }
        cannonWorld.step(cannonStep,delta,3);
        groundBody.position.copy(plane.position);
        box.position.copy(boxBody.position);
        box.quaternion.copy(boxBody.quaternion);

        renderer.render(scene,camera);
        requestAnimationFrame(animate);

    }
    animate();
}
