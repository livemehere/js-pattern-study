class Logger{
    constructor(name) {
        this.name = name;
    }

    log(message){
        console.log(`[${this.name}] ${message}`)
    }

    info(message){
        console.log(`[${this.name}] info: ${message}`)
    }

}

module.exports = Logger;