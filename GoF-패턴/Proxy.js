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
