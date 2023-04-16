// 캐시되어 공유되는 다른 모듈을 수정할 수 있다.
require('./logger.js').error =(msg)=>{
    console.log('custom : ',msg)
}