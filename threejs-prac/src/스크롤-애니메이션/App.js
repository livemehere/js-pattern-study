import * as THREE from "three";
import gsap from "gsap";
import Plane from "./Plane";
import House from "./House";

export default class App {
  currentSection = 0;

  constructor() {
    this.init();
    this.addPlane();
    this.addHouses();
    this.setScroll();
  }

  init() {
    this.canvas = document.querySelector("#three-canvas");
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("gray");

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.setLight();
    this.setHelper();

    this.animate();
  }

  setHelper() {
    this.scene.add(new THREE.AxesHelper(10));
    this.scene.add(new THREE.GridHelper(10, 10));
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
  }

  setLight() {
    this.light = new THREE.SpotLight(0xffffff, 1);
    this.light.castShadow = true;
    this.light.shadow.radius = 8;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;

    this.light.position.set(0, 10, 5);
    this.scene.add(this.light);

    this.light2 = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.light2);
  }

  addPlane() {
    new Plane({
      scene: this.scene,
      width: 100,
      height: 100,
      color: "#ffffff",
    });
  }

  addHouses() {
    this.houses = [];
    this.houses.push(
      new House({
        scene: this.scene,
        x: 0,
        z: 0,
        height: 2,
        src: "/models/house.glb",
      })
    );
    this.houses.push(
      new House({
        scene: this.scene,
        x: -4,
        z: -5,
        height: 2,
        src: "/models/house.glb",
      })
    );
    this.houses.push(
      new House({
        scene: this.scene,
        x: 4,
        z: -10,
        height: 2,
        src: "/models/house.glb",
      })
    );

    this.houses.push(
      new House({
        scene: this.scene,
        x: 7,
        z: -15,
        height: 2,
        src: "/models/house.glb",
      })
    );

    this.houses.push(
      new House({
        scene: this.scene,
        x: -7,
        z: -20,
        height: 2,
        src: "/models/house.glb",
      })
    );
  }

  setScroll() {
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll(e) {
    const newSection = Math.round(window.scrollY / window.innerHeight);

    if (this.currentSection !== newSection) {
      this.currentSection = newSection;
      this.scrollToSection();
    }
  }

  scrollToSection() {
    gsap.to(this.camera.position, {
      duration: 1,
      z: this.houses[this.currentSection].z + 5,
      x: this.houses[this.currentSection].x,
    });
  }
}
