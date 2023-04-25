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
