# NodeJS 디자인 패턴 책 필기

- let 은 변수를 블록 스코프로 제한한다.

## 불변 객체

const 는 객체를 불변으로 만들지는 않기 때문에, 완전한 불변 객체를 만들기 위해서는 Object.freeze 를 사용해야 한다.

```js
const a= {}
Object.freeze(a)
a.name ='kong'

console.log(a) // {}
```

## 객체 리터럴 (getter, setter 가능)

일반 객체도 getter, setter 를 사용할 수 있다.

> 모든 setter 는 동일한 이름의 getter 를 반환하는 특징있다.(마치 post 요청 결과처럼)

```js
let a = {
         name: 'a',
         age: 10,
       get all(){
             return `${this.name} ${this.age}`
       }
   }
console.log(a.all)
```

## process.nextTick 과 setImmediate

- process.nextTick 은 현재 이벤트 루프의 끝에 콜백을 추가한다. (다른 I/O 이벤트들보다 먼저 실행된다.)
- setImmediate 는 현재 이벤트 루프의 다음 루프에서 콜백을 추가한다. (I/O 이벤트들보다 늦게 실행된다.)

## 에러

- 에러는 try catch 로 잡을 수 있다.
- 에러는 throw 로 던질 수 있다.
- 에러는 .catch() 로 잡을 수 있다.
- 에러가 이벤트 루프의 맨 마지막에 잡히면 프로세스가 종료된다.
