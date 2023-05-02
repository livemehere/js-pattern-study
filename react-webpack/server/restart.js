const {spawn} = require('child_process');

function restart() {
    console.log('re')
    const args = process.argv.slice(1);
    const cmd = process.argv[0];
    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore',
    }).unref();
    process.exit();
}

module.exports = {
    restart
}