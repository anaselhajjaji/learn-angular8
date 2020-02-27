NgRX solves the application state (data or information) that we don't want to store in a backand and that we loose when we reload/refresh the application.

Normally we store the application state in a backend.

NgRx helps avoinding state management nightmare in complex applications.

RxJS solves partially the state management problem by using subjects and publish/subscribe mechanism.

NgRx is an implementation of the Redux pattern which is a state management pattern, the idea behind redux is:
- to have a central store (application store) that holdes the application state
- the services and components can still interact with each other but receive their states from that redux store
- Actions are dispathed to the reducers that creates a copy of the state and then saves it immutabely in the store

The differences between Redux and NgRx are:
- NgRx uses RxJS
- NgRX is well integrated with Angular
- typescript usage
- NgRx solved the side effects question: http requests

To install:
- `npm install --save @ngrx/store`