Angular uses observables a lot.
Observable (is a data source) ======STREAM====> Observer that handles actions (Handle Data, Handle Error, Handle Completion.)
## Examples
Interval will emit an event every x milliseconds.
```typescript
import { interval, Subscription } from 'rxjs';

private subscription: Subscription;

ngOnInit() {
    this.subscription = interval(1000).subscribe(count => {
        console.log(count);
    });
}

ngOnDestroy() {
    subscription.unsubscribe(); // IMPORTANT
}
```
## Custom observable
It's rare where we need to write our own observables, in general we use existing ones that come with libraries.
```typescript
import { Observable } from 'rxjs';

const customIntervaleObservable = Observable.create(observer => {
    let count = 0;
    setInterval(() => {
        // next() to emit data, error(new Error(message)) to emit an error and cancels the observable, 
        // observer.complete() to complete
        observer.next(count);
        count++;
    }, 1000);
});
customIntervaleObservable.subscribe(count => {
        console.log(count);
}, error => {
    // handle the error case
}, () => {
    // handle the completion
});
```
## Operators
Built-in operators can be used to transform, filter datas ...
Example (map to transform streamed data):
```typescript

this.customIntervaleObservable.pipe(map((data: number) => {
    return 'Round: ' + (data + 1);
})).subscribe(/* add the logic here*/);
```
Example (filter, the operators can be chained):
```typescript
import { map, filter } from 'rxjs/operators';
this.customIntervaleObservable.pipe(filter(data => {
    return data > 0;
}), map((data: number) => {
    return 'Round: ' + (data + 1);
})).subscribe(/* add the logic here*/);
```
## Subjects
Subject is an Observable, teh difference is the next() in observable is called inside and for subject it can be called directly on the subject.
Better to use subjects instead of EventEmitter, example:
```typescript
theEvent = new Subject<boolean>(); // instead of theEvent = new EventEmitter<boolean>();

// for the call!
theEvent.next(data);
```
TO BE NOTED: the subject is the recommended way (more efficient and we can have access to operators), don't use EventEmitter. 
However, EventEmitter still should be used in @Output case.

## Useful Resources
Official Docs: https://rxjs-dev.firebaseapp.com/
RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/
Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/