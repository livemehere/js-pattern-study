import * as THREE from 'three';

export default class Ball {
    constructor({scene, radius, color, x,y,z}) {
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color, roughness: 0, metalness: 0.415});
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.sphere.position.set(x,y,z);
        scene.add(this.sphere);
    }
}