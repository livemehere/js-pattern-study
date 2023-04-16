class Observer {
    constructor() {
        this.observers = new Set();
    }

    subscribe(fn) {
        if(typeof fn !== 'function') throw new Error('fn must be a function');
        console.log(this.observers.has(fn))
        if(this.observers.has(fn)) return;
        this.observers.add(fn);
        console.log(this.observers, 'add')
    }

    unsubscribe(fn) {
        this.observers.delete(fn);
        console.log(this.observers, 'delete')
    }

    notify() {
        this.observers.forEach(fn => fn());
        console.log(this.observers, 'notify')
    }

}


class TextModel extends Observer {
    constructor(text) {
        super();
        this.text = text || '';
        this.notify(this.text);
    }

    setText(text) {
        this.text = text;
        this.notify();
    }

    getText() {
        return this.text;
    }
}

class TextView {
    constructor(model) {
        this.model = model;
        this.model.subscribe(this.render.bind(this));

        this.element = document.createElement('div');
        document.body.appendChild(this.element);
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.border = '1px solid white';
        this.element.style.margin = '10px';
        this.element.style.padding = '10px';
        this.element.style.color = 'white';
    }

    render() {
        this.element.innerText = this.model.getText();
    }

}
const model = new TextModel('hello');
const tv = new TextView(model)
tv.render();

document.querySelector('button').addEventListener('click', () => {
    const v = document.querySelector('input').value;
    model.setText(v);
    tv.sub();
})