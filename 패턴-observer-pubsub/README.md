# Observer 패턴과 Publisher/Subscriber 패턴

## Observer 패턴

- 객체의 상태 변화를 관찰하는 관찰자(Observer)들에게 통지하는 패턴
- nofity() 가 되면 등록된 함수를 실행한다.

> watch(관찰) 하다가 자동으로 함수를 실행하는 개념


## Publisher/Subscriber 패턴

- Publisher와 Subscriber가 1:N 관계를 가지는 패턴
- 특정 이벤트 이름을 substribe 하여 callback 을 등록한다. 이벤트가 발생하면 이벤트와 payload 를 publish 한다.

> callback 을 등록해두고, 원할 떄 트리거해서 등록한 함수를 모두 실행하는 개념


