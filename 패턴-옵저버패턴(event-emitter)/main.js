const fs = require("fs");
const EventEmitter = require('events').EventEmitter;

function findPattern(files, regex){
    const emitter = new EventEmitter();

    files.forEach(file=>{
        fs.readFile(file, 'utf-8', (err, data)=>{
            if(err){
                emitter.emit('error',err)
                return;
            }
            emitter.emit('read',file)
            let matches = [];
            if(matches = data.match(regex)){
                matches.forEach(match => emitter.emit('found',file, match))
            }
        })
    })

    return emitter;
}


findPattern(['./a.txt','./day.json'],/hello\w*/g)
    .on('read',(file)=> console.log('파일 읽음:',file))
    .on('found',(file,match)=> console.log('찾음:',file, '->', match))
    .on('error',(err)=> console.log('에러발생',err))


