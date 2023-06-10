import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import * as CANNON from "cannon-es";

export default class Domino{
    static gltfLoader = new GLTFLoader();

    constructor({scene, world,z}) {
        this.scene = scene;
        this.world = world;

        Domino.gltfLoader.load('/models/domino.glb', (gltf) => {
            this.mesh = gltf.scene.children[0];
            this.mesh.name = 'DOMINO'
            this.scene.add(this.mesh);

            this.body = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(0, 0.5, z),
                shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.1))
            });
            this.world.addBody(this.body);
            this.mesh.body = this.body;

        });
    }

}