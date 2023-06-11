import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default class House {
  static glbLoader = new GLTFLoader();

  constructor({ scene, x, z, height, src }) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.height = height;
    this.src = src;

    this.gltf = House.glbLoader.load(this.src, (gltf) => {
      this.mesh = gltf.scene.children[0];
      this.mesh.castShadow = true;

      this.mesh.position.set(this.x, this.height / 2, this.z);
      this.scene.add(this.mesh);
    });
  }
}
