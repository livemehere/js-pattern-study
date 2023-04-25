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
