The service is normally automatically injected by angular in a hierarchical manneer, it meens that if a service is injected in the parent, the children (only components and not the service) will receive the same instance of the service. Note that in this case the service should not be present in the providers list of the children.
To do that, in the component we should have the following pieces:
```typescript
@Component({
    ...
    providers: [NameOfService]
})
export class TheComponent {
    constructor(private service: NameOfService) {}
}
```
And for injecting a service into a service:
```typescript
@Injectable()
export class TheService {
    constructor(private service: NameOfService) {}
}
```
We can use EventEmitter in the services: `this.service.theCreatedEvent.emit(theData)` to send the event and `this.service.theCreatedEvent.subscribe(theData => {})`.

In Angular 6+:
Instead of adding a service class to the providers[]  array in AppModule , we can set the following config in @Injectable():
```typescript
@Injectable({providedIn: 'root'})
export class MyService { ... }
```