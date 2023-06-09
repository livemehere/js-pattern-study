import * as THREE from 'three';
import * as CANNON from "cannon-es";

export default class Ball {

    static sound = new Audio('/sounds/boing.mp3');

    constructor({scene, world, radius, color, x,y,z}) {
        this.world = world;
        this.scene = scene;
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color, roughness: 0, metalness: 0.415});
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(x,y,z),
            shape: new CANNON.Sphere(radius)
        });

        this.world.addBody(this.body);
        this.scene.add(this.sphere);

        this.body.addEventListener('collide', this.collide.bind(this));
    }

    collide(e){
        if(e.contact.getImpactVelocityAlongNormal() > 3){
            Ball.sound.volume = 0.3;
            Ball.sound.currentTime = 0;
            Ball.sound.play();
        }
    }

    remove(){
        this.body.removeEventListener('collide', this.collide);
        this.world.removeBody(this.body);
        this.scene.remove(this.sphere);
    }
}