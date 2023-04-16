class Logger {
    #name;
    count=0;

    constructor(name) {
        this.#name = name;
    }

    log(msg){
        this.count++;
        console.log(`${this.#name} : ${msg}`)
    }
}

// 모듈 인스턴스를 반환하지만, 생성자도 객체에 포함하여, 자유도를 높인다.
module.exports = new Logger('DEFAULT');
module.exports.Logger = Logger;