/*
 * 프록시 패턴
 *
 * 프록시는 대리인이라는 뜻으로, 무언가를 대신해서 처리하는 것을 말한다.
 * 프록시 패턴은 프록시를 통해 대신 전달하는 형태로, 실제 객체는 숨기고 대신해서 처리하는 패턴이다.
 *
 * 전처리, 혹은 후처리를 진행한다.
 * 또한 데이터 유효성 검사, 보안, 캐싱, 지연 초기화, 로깅, 원격 객체 컨트롤 등을 하는데 사용된다.
 *
 * [구현방법 1]
 * 1. 오브젝트를 받고, 그 오브젝트의 프로토타입을 가져온다.
 * 2. 프록시 생성자를 만들고, 프록시 생성자의 프로토타입을 오브젝트의 프로토타입으로 설정한다.
 * 3. 프록시 생성자의 프로토타입에 추가적인 메서드를 정의한다.
 * 4. 프록시 생성자를 통해 프록시 객체를 생성한다.
 * 5. 프록시 객체를 반환한다.
 *
 * [구현방법 2]
 *
 * 1. Proxy 객체를 생성한다.
 * 2. Proxy 객체의 get 메서드를 정의한다.
 * 3. Proxy 객체의 set 메서드를 정의한다.
 * 4. Proxy 객체의 has 메서드를 정의한다.
 * 5. Proxy 객체에 커스텀한 메서드를 정의한다.
 * 6. Proxy 객체를 반환한다.
 * */

function createProxy(object) {
  const proto = Object.getPrototypeOf(object);
  console.log(proto);
  function Proxy(object) {
    this.object = object;
  }
  Proxy.prototype = proto;
  Proxy.prototype.getName = function () {
    return this.object.getName() + "!";
  };

  return new Proxy(object);
}

const person = {
  name: "Lee",
  getName() {
    return this.name;
  },
};

console.log(person.getName());

const proxy = createProxy(person);
console.log(proxy.getName());

/* Proxy 객체 사용하기 */

const person2 = {
  name: "kong",
  gender: "man",
};

const upperPerson2 = new Proxy(person2, {
  get: function (target, prop, receiver) {
    return target[prop].toUpperCase();
  },
  set: function (target, prop, value) {
    target[prop] = value.toUpperCase();
  },
});

console.log(upperPerson2.name + "!");
upperPerson2.gender = "woman";
console.log(upperPerson2.gender);

const eventNumberArray = new Proxy([], {
  get: function (target, index, receiver) {
    return target[index] * 2;
  },
  set: function (target, index, value) {
    target[index] = value * 2;
  },
  has: function (target, index) {
    return index % 2 === 0;
  },
  push: function (target, ...args) {
    args.forEach((v) => {
      target.push(v * 2);
    });
  },
});

console.log(2 in eventNumberArray);
console.log(5 in eventNumberArray);
console.log(eventNumberArray);
