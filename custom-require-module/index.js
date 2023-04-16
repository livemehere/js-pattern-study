const fs = require('fs');
const path = require("path");

function loadModule(modulePath){
  const pth = path.resolve(modulePath) // 절대경로로 바꾸어줘야, 경로가 다른 같은 모듈이 캐시에 적중함
  // 캐시가 있다면 바로 반환
  if(loadModule.cache[pth]){
    return loadModule.cache[pth].exports;
  }


  const contents = fs.readFileSync(pth,{ encoding:'utf8'});
  const fn = eval(`(function(exports,require, module, __filename, __dirname){${contents}})`); // eval 로 text 를 js 함수로 재정의
  const module = {exports:{}};
  fn(module.exports, loadModule, module, pth, path.dirname(pth))
  loadModule.cache[pth] = module; // 한번 load 하면 캐시에 저장
  return module.exports;
}

// 캐시 저장소 정의
loadModule.cache = {};

const {sayHello} = loadModule('./my-module.js')
const {sayHello:h2} = loadModule('./my-module.js')

sayHello()
h2()