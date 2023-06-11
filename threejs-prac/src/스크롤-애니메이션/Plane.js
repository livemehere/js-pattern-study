import * as THREE from "three";

export default class Plane {
  constructor({ scene, width, height, color }) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.color = color;

    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }
}
