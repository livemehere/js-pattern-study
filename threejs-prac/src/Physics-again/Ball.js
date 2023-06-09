import * as THREE from 'three';
import * as CANNON from "cannon-es";

export default class Ball {
    constructor({scene, world, radius, color, x,y,z}) {
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color, roughness: 0, metalness: 0.415});
        this.sphere = new THREE.Mesh(this.geometry, this.material);

        this.body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(x,y,z),
            shape: new CANNON.Sphere(radius)
        });
        world.addBody(this.body);
        scene.add(this.sphere);
    }
}