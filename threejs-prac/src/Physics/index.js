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

    const sphereBody = new CANNON.Body({
        mass:3,
        shape:new CANNON.Sphere(1),
        position:new CANNON.Vec3(0,5,0)
    })
    cannonWorld.addBody(sphereBody);

    const planeGeometry = new THREE.PlaneGeometry(10,10);
    const planeMaterial = new THREE.MeshPhongMaterial({color:'gray'});
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x = -Math.PI/2;
    scene.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(1,64,64);
    const boxMaterial = new THREE.MeshPhongMaterial({color:'hotpink'});
    const sphere = new THREE.Mesh(sphereGeometry,boxMaterial);
    sphere.position.set(0,0.5,0);
    scene.add(sphere);

    addEventListener('click',()=>{
        sphereBody.applyForce(new CANNON.Vec3(100,0,0),sphereBody.position);
    })

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
        sphere.position.copy(sphereBody.position);
        sphere.quaternion.copy(sphereBody.quaternion);

        // sphere velocity miuus
        sphereBody.velocity.x *= 0.99;
        sphereBody.velocity.y *= 0.99;
        sphereBody.velocity.z *= 0.99;
        sphereBody.angularVelocity.x *= 0.99;
        sphereBody.angularVelocity.y *= 0.99;
        sphereBody.angularVelocity.z *= 0.99;

        renderer.render(scene,camera);
        requestAnimationFrame(animate);

    }
    animate();
}
