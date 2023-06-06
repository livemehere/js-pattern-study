export default class KeyController {
    constructor() {
        this.keys = {};


        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            console.log(this.keys)
        })

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        })

    }
}