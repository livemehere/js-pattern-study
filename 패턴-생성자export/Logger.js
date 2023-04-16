function Logger(name){
    this.name = name;
}

Logger.prototype.log = function(message){
    console.log(`[${this.name}] ${message}`);
}

Logger.prototype.info = function(message){
    console.log(`[${this.name}] info: ${message}`);
}

module.exports = Logger;