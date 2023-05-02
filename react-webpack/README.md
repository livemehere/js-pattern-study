# Webpack 의 사실

- presets 의 배열의 순서는 중요하다. 먼저 실행되는 것이 나중에 실행되는 것을 덮어쓴다.
- presets 의 순서는 뒤에서부터 적용된다.
- plugins 의 순서는 앞에서부터 적용된다.

## 궁금증들

### @babel/preset-typescript vs ts-loader

- ts-loader 는 타입체크를 하고, @babel/preset-typescript 는 타입체크를 하지 않는다.
- ts-loader 는 웹팩에서 타입체크를 하고, @babel/preset-typescript 는 바벨에서 타입체크를 한다.
- ts-loader 는 웹팩에서 타입체크를 하기 때문에 웹팩의 watch 모드를 사용할 수 있다.
- @babel/preset-typescript 는 바벨에서 타입체크를 하기 때문에 웹팩의 watch 모드를 사용할 수 없다.
- **핵심적으로 babel 의 다른 설정들과 호환하기 위해서는, 타입스크립트도 바벨에서 처리하는 것이 좋다.**

### .ts 확장자에서 jsx 문법 파싱하도록 할 수 없나요?

```js
"@babel/preset-typescript",
{
  allExtensions: true,
  isTSX: true,
}
```

위와 같이 설정하면 되긴하지만, 타입스크립트에서 `var foo = <string>bar;` 와 같은 문법을 사용할 수 없다.  
레거시 문법이긴 하지만 충돌이 발생하는 경우이기 때문이다.  
결론적으로 `.tsx` 확장자를 사용하자.

### React from 'react' 자동 입력

```js
["@babel/preset-react", { runtime: "automatic" }]
```

위 설정을 해주면 jsx 파싱시 필요한 `import React from 'react';` 를 자동으로 추가해준다.

### import 구분에서 확장자 생략하기

```js
resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
}
```

위 구분에 추가하면 해당 확장자를 생략해서 import 할 수 있다.

### 실험적 혹은 최신 기능들을 사용하고싶다면 (topLevelAwait 예시)

```js
experiments: {
 topLevelAwait: true
}
```

webpack 설정에서 위와 같이 추가하면 된다.

### tsconfig.json

이 파일이 프로젝트에 존재하는 순간, 에디터의 ts 파일에는 모두 적용 되고있다.  
예를 들면 lib:[] 을 선언해주지 않고 Promise 를 사용하면, Promise 가 존재하지 않는다고 에러가 발생한다.