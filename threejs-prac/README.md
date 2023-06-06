# THREE-JS

[fundamental](https://threejs.org/manual/#ko/fundamentals)

## 나만의 정의

- 출발점은 Scene(장면) 이다.
 
## 용어 정리

- Geometry : 형상
- Material : 재료
- Mesh : 특정 입자의 크기를 분류할 수 있는 망(입자라고 생각하면 될듯)
- 종횡비 : `종` 분의 `횡` = `횡/종` = `가로/세로` = `너비/높이`

## 알아낸 사실..

- glTF 확장자 3D 모델 포맷이 가장 로딩이 빠르고, 추천한다. 하지만 threeJS 는 정말 다양한 로더를 지원하고있다.
- PerspectiveCamera(원근 카메라) 는 `fov`, `aspect`, `near`, `far` 를 인자로 받는다.
- OrthographicCamera(직교 카메라) 는 `left`, `right`, `top`, `bottom`, `near`, `far` 를 인자로 받는다.
- 배경색의 우선순위는 `scene.background` > `renderer.setClearColor` 이다.
- 각도는 라디안 값을 기본으로 사용하고, `THREE.MathUtils.degToRad` 를 사용하여 각도를 라디안 값으로 변환하는 유틸을 제공한다.
- requestAnimationFrame 과 비슷한 동작을 하는 renderer.setAnimationLoop() 를 사용하는 것이 좋다.
  - XR(VR) 환경에서는 필수 요소이다.
- 애니메이션에서 수치는 화면 주사율에 따라 다르게 적용될 수 있기 때문에 보정이 필요하다
  - `clock.getDelta()` 를 사용하여 보정
  - `clock.getElapsedTime()` 를 사용하여 보정
  - 혹은 Date.now() 를 사용해 직접 delta 값을 구하여 보정
- material 에서 wireframe 을 사용하면 선으로만 그려져, 형태 파악하기 용이하다.
- material 에서 `side: THREE.DoubleSide` 를 사용하면 양면을 모두 그린다.

### Geometry

- `Geometry` 는 `뼈대`이다.
- `Geometry` 는 `BufferGeometry` 로 만들어진다.

### Material

- `Material` 은 Vertex(점) 와 Edge(선), Face(면) 으로 구성된다.

## gLTF

- glTF 는 3D 모델 포맷이다.
- glTF 는 JSON 포맷이다.
- glb 는 glTF 포맷을 바이너리로 압축한 포맷이다.(블랜더)