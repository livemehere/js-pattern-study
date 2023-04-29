/*
 * 팩토리 패턴
 * - 생성자를 숨김으로써 객체를 생성하는 패턴
 * - 장점으로는 객체 생성을 위한 별도의 함수를 제공함으로써 객체 생성을 캡슐화 할 수 있다.
 * - 단점으로는 생성자를 숨겨야 하기 때문에 생성자의 파라미터를 알 수 없다.
 * - 생성자를 숨기기 위해 클로저를 사용한다.
 * */

class JpgImage {}
class PngImage {}

function createImage(type) {
  switch (type) {
    case "jpg":
      return new JpgImage();
    case "png":
      return new PngImage();
  }
}

const jpgImage = createImage("jpg");
const pngImage = createImage("png");

console.log(jpgImage, pngImage);

/* 프라이빗 변수 문법 이전 방법 */

function createPerson(name) {
  const properties = {};

  const person = {
    setName: (name) => {
      properties.name = name;
    },
    getName: () => {
      return properties.name;
    },
  };

  person.setName(name);
  return person;
}

const p = createPerson("kong");
console.log(p.getName()); // kong
p.setName("Ha");
console.log(p.getName()); // Ha
