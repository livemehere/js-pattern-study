class PubSub {
    constructor() {
        this.subscribers = {};
    }

    publish(event,data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(handler => handler(data));
    }

    subscribe(event, handler) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(handler);
    }
}

const pubsub = new PubSub();
pubsub.subscribe('click', (data) => {
    console.log(data);
})

pubsub.subscribe('click', (data) => {
    alert(data);
})

document.querySelector('button').addEventListener('click', () => {
    const v = document.querySelector('input').value;
    pubsub.publish('click', v)
})