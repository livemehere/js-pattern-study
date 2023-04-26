function createProxy(object) {
  const proto = Object.getPrototypeOf(object);
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
