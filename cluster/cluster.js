const cluster = require('cluster');
const os = require('os');

// console.log(os.cpus().length)

if(cluster.isMaster){
    const len = os.cpus().length;
    console.log(`Forking for ${len} CPUs`);
    for(let i=0;i<len;i++){
        cluster.fork();
    }
}else{
    require('./server.js');
}