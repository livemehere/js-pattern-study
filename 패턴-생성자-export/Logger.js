function Logger(name){
    /*if(!(this instanceof Logger)){ // new 키워드를 사용하지 않고, 호출할 경우 만들어서 반환
        return new Logger(name);
    }*/
    if(!new.target){ // ES5 문법. new 로 호출되었는지 아닌지
        return new Logger(name);
    }
    this.name = name;
}

Logger.prototype.log = function(message){
    console.log(`[${this.name}] ${message}`);
}

Logger.prototype.info = function(message){
    console.log(`[${this.name}] info: ${message}`);
}

module.exports = Logger;