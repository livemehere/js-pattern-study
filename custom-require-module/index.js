const fs = require('fs');
const path = require("path");

function loadModule(modulePath){
  // 캐시가 있다면 바로 반환
  if(loadModule.cache[modulePath]){
    return modulePath.cache[modulePath].exports;
  }

  const contents = fs.readFileSync(modulePath,{ encoding:'utf8'});
  const fn = eval(`(function(exports,require, module, __filename, __dirname){${contents}})`); // eval 로 text 를 js 함수로 재정의
  const module = {exports:{}}
  fn(module.exports, loadModule, module, modulePath, path.dirname(modulePath))
  loadModule.cache[modulePath] = module; // 한번 load 하면 캐시에 저장
  return module.exports;
}

// 캐시 저장소 정의
loadModule.cache = {};

const {sayHello} = loadModule('./my-module.js')
const {sayHello:h2} = loadModule('./my-module.js')

console.log(loadModule)