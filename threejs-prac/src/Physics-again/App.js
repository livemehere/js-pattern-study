import * as THREE from 'three';
import Plain from "./Plain";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {Sphere} from "three";
import Ball from "./Ball";

export default class App {
    constructor() {

        this.balls = [];

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.canvas = document.querySelector('#three-canvas');

        this.camera.position.set(0,5,10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);

        this.controls = new OrbitControls(this.camera, this.canvas);

        addEventListener('resize', this.resize.bind(this));
        addEventListener('click',this.addBall.bind(this));
        this.resize();
        this.animate();
        this.setLight();

        new Plain({scene: this.scene, width: 10, height: 10, color:'gray'});

    }


    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));

        // animate code here

        this.renderer.render(this.scene, this.camera);
    }

    setLight(){
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(0, 8, 5);
        this.scene.add(this.light);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);
    }

    addBall(){
        const radius = Math.random() + 0.2;
        const x = Math.random() * 4 - 2;
        const z = Math.random() * 4 - 2;
        const y = radius;

        const ball = new Ball({scene:this.scene, radius, color: 'red', x, y, z});
        this.balls.push(ball);
    }
}