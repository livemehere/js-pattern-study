import * as THREE from "three";

export default class Plain {
    constructor({scene, width, height,color}) {
        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
        this.plain = new THREE.Mesh(this.geometry, this.material);

        this.plain.rotation.x = Math.PI / 2;
        scene.add(this.plain);
    }
}