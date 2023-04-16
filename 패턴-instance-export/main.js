const logger = require('./logger.js');
logger.log('hello');
logger.log('hello2');


const customLogger = new logger.Logger('CUSTOM');
customLogger.log('yes')

console.log(logger.count) // 2
console.log(customLogger.count) // 1