const Logger = require('./Logger.js');
const LoggerES = require('./Logger-es5.js');

const dbLogger = new Logger('DB');
dbLogger.info('Connected to the database');
dbLogger.log('Hello World');

const cacheLogger = new LoggerES('Cache');
cacheLogger.log('cache hit !')
cacheLogger.info('cache full !')

// 보호자(guard) 구현
const errLog = Logger('ERROR');
errLog.info('에러야')