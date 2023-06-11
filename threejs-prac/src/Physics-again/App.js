import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import gsap from 'gsap';

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

        /* 이미지 패널 */

        const pannels = [];
        const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
        const positionArray = sphereGeometry.attributes.position.array;
        const randomArray = [];
        for (let i = 0; i < positionArray.length; i++) {
            const random = (Math.random() - 0.5) * 10;
            randomArray.push(random);
        }

        const textureLoader = new THREE.TextureLoader();
        for (let i = 0; i < positionArray.length; i += 3) {
            const texture = textureLoader.load(`/images/0${Math.ceil(Math.random() * 5)}.jpg`);
            const planeMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(0.3, 0.3),
                new THREE.MeshPhongMaterial({color: '#ffffff', side: THREE.DoubleSide, map: texture})
            )

            planeMesh.position.set(positionArray[i], positionArray[i + 1], positionArray[i + 2]);
            planeMesh.lookAt(0, 0, 0);
            this.scene.add(planeMesh);
            pannels.push(planeMesh);
        }

        let status = 'sphere';
        const btn = document.createElement('button');
        btn.innerText = status;
        btn.addEventListener('click', () => {
            if (status === 'sphere') {
                pannels.forEach((mesh, i) => {
                    gsap.to(mesh.position, {
                        x: positionArray[i * 3],
                        y: positionArray[i * 3 + 1],
                        z: positionArray[i * 3 + 2],
                        duration: 1,
                    })
                })
            } else {
                pannels.forEach((mesh, i) => {
                    gsap.to(mesh.position, {
                        x: randomArray[i * 3],
                        y: randomArray[i * 3 + 1],
                        z: randomArray[i * 3 + 2],
                        duration: 1,
                    })

                    gsap.to(mesh.rotation, {
                        x: 0,
                        y: 0,
                        z: 0,
                    })
                })
            }


            status = status === 'sphere' ? 'random' : 'sphere';
            btn.innerText = status;
        })
        btn.style.cssText = 'position: absolute; top: 20px; left: 20px; z-index: 999;'
        document.body.appendChild(btn);

        /* -- */

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