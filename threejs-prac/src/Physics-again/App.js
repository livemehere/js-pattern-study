import * as THREE from 'three';
import Plain from "./Plain";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export default class App {
    constructor() {
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
        this.resize();
        this.animate();

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
}