import * as THREE from 'three';
import Plain from "./Plain";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import Ball from "./Ball";
import * as CANNON from "cannon-es";

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
        this.controls.enableDamping = true;

        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);

        this.plane = new Plain({scene: this.scene,world:this.world, width: 10, height: 10, color:'gray'});
        this.balls = [];

        addEventListener('resize', this.resize.bind(this));
        this.canvas.addEventListener('click',this.addBall.bind(this));
        this.resize();
        this.animate();
        this.setLight();
        this.setDefaultContactMaterial();
        this.addRemoveBtn();
    }

    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));

        // animate code here

        this.balls.forEach(ball => {
            ball.sphere.position.copy(ball.body.position);
            ball.sphere.quaternion.copy(ball.body.quaternion);
        })
        this.plane.plain.position.copy(this.plane.body.position);
        this.plane.plain.quaternion.copy(this.plane.body.quaternion);

        this.world.step(1/60);
        this.controls.update();
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
        const radius = Math.random() * 0.5 + 0.2;
        const x = Math.random() * 4 - 2;
        const z = Math.random() * 4 - 2;
        const y = radius + Math.random()*3;
        const color = `hsl(${Math.random()*360}, 100%, 50%)`;

        const ball = new Ball({scene:this.scene,world:this.world, radius, color, x, y, z});
        this.balls.push(ball);
    }

    setDefaultContactMaterial(){
        const material = new CANNON.Material('default');
        this.world.defaultContactMaterial = new CANNON.ContactMaterial(material, material, {
            friction: 1,
            restitution: 0.5
        });
    }

    addRemoveBtn(){
        const btn = document.createElement('button');
        btn.innerText = 'Add Ball';
        btn.style.position = 'absolute';
        btn.style.top = '10px';
        btn.style.left = '10px';
        btn.style.zIndex = '999';
        document.body.appendChild(btn);
        btn.addEventListener('click', ()=>{
            this.balls.forEach(ball => ball.remove());
        });

    }
}