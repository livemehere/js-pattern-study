# CustomElement 와 Shadow DOM 을 사용한 웹 컴포넌트

## CustomElement

CustomElement 는 HTML 의 기본 태그를 확장하여 사용자가 직접 태그를 만들 수 있게 해주는 기능입니다.

```js

class MyElement extends HTMLElement {
  constructor() {
    super();
  }
}
```

```html
<my-element></my-element>
```

## 내부는 shadow DOM 으로 구성하기

> 왜 shadow DOM 으로 구성해야 하냐면, 외부에서 접근할 수 없기 때문에 절대적으로 격리된 환경을 만들 수 있습니다. (스타일까지)

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
            display: block;
            }
        </style>
        <div>hello world</div>
        `;
    }
    
}
```

## Attribute 받기

this.getAttribute(이름) 으로 가져와, DOM 구성에 사용할 수 있다.  
이때, static get observedAttributes() 에서 관찰할 attribute 를 배열로 정의하고, 여기에서 정의 된 attribute 가 변경되면 attributeChangedCallback 이 호출된다.  
attributeChangedCallback 에서는 DOM 을 수정해주는 것과 더불어 필요한 동작을 해주면 된다.


```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
            display: block;
            }
        </style>
        <div>hello world</div>
        `;
    }
    
    static get observedAttributes() {
        return ['name'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
    }
}
```