import * as THREE from 'three';
import Plain from "./Plain";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import Ball from "./Ball";
import * as CANNON from "cannon-es";
import Domino from "./Domino";

export default class App {
    constructor() {


        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.canvas = document.querySelector('#three-canvas');

        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;

        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);

        this.plane = new Plain({scene: this.scene, world: this.world, width: 100, height: 100, color: 'gray'});

        this.dominos = [];
        for (let i = 0; i < 20; i++) {
            this.dominos.push(new Domino({
                scene: this.scene,
                world: this.world,
                z: -i * 0.5,
            }))
        }


        addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.animate();
        this.setLight();
        this.setDefaultContactMaterial();
        this.setMouseRayCaster();
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // animate code here

        this.dominos.forEach(domino => {
            if (!domino.mesh) return;
            domino.mesh.position.copy(domino.body.position);
            domino.mesh.quaternion.copy(domino.body.quaternion);
        })

        this.plane.plain.position.copy(this.plane.body.position);
        this.plane.plain.quaternion.copy(this.plane.body.quaternion);

        this.world.step(1 / 60);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    setLight() {
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(0, 8, 5);
        this.scene.add(this.light);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);
    }


    setDefaultContactMaterial() {
        const material = new CANNON.Material('default');
        this.world.defaultContactMaterial = new CANNON.ContactMaterial(material, material, {
            friction: 0.01,
            restitution: 1
        });
    }

    setMouseRayCaster() {
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        addEventListener('click', this.onClick.bind(this));
    }

    onClick(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length) {
            const obj = intersects[0].object;
            if (obj.name === 'DOMINO' && obj.body) {
                obj.body.applyForce(new CANNON.Vec3(0, 0, -100), obj.body.position);
            }
        }
    }
}