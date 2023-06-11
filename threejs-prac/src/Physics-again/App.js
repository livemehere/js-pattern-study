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

        this.camera.position.set(0, 2, 2);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;


        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/images/star.png');

        const geometry = new THREE.BufferGeometry();
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
            colors[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            map: texture,
            size: 0.1,
            alphaMap: texture,
            transparent: true,
            vertexColors: true,
            depthWrite: false,

        });
        const sphere = new THREE.Points(geometry, material);
        this.scene.add(sphere);

        addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.animate();
        this.setLight();
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // animate code here

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

}