const fs = require("fs");
const EventEmitter = require('events').EventEmitter;
class FindPattern extends EventEmitter{
    constructor(regex) {
        super();
        this.files = [];
        this.regex = regex;
    }

    addFile(file){
        this.files.push(file);
        return this;
    }

    find(){
        this.files.forEach(file=>{
            fs.readFile(file, 'utf-8',(err,data)=>{
                if(err){
                    this.emit('error',err)
                    return;
                }
                this.emit('read',file)
                let matches = [];
                if(matches = data.match(this.regex)){
                    matches.forEach(match => this.emit('found',file, match))
                }
            })
        })
        return this;
    }
}

const findPattern = new FindPattern(/hello\w*/g)
findPattern
    .addFile('./a.txt')
    .addFile('./day.json')
    .find()
    .on('read',(file)=> console.log('파일 읽음:',file))
    .on('found',(file,match)=> console.log('찾음:',file, '->', match))
    .on('error',(err)=> console.log('에러발생',err))