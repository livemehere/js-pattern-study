import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class Plain {
    constructor({scene,world, width, height,color}) {
        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
        this.plain = new THREE.Mesh(this.geometry, this.material);

        this.body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(0, 0, 0),
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
        });
        world.addBody(this.body);
        scene.add(this.plain);
    }
}