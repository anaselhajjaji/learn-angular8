## Send POST request to Firebase

First, import HttpClientModule in AppModule.

```typescript
constructor(private http: HttpClient) {}

postData(data: { name: string; lastName: string }) {
    this.http.post<{ name: string}>( // If not subscribing, the request won't be sent
        'https://learn-angular-2a595.firebaseio.com/datas.json',
        data
    ).subscribe(response => {
        console.log(response);
    }, error => {
        // error occured
    });
}
```

## Send GET to Firebase

```typescript
constructor(private http: HttpClient) {}

getData() {
    this.http.get<{[key: string]: {name: string; lastName: string; id?: string}}>( // If not subscribing, the request won't be sent, it's recommended to type everything...
        'https://learn-angular-2a595.firebaseio.com/datas.json'
    )
    .pipe(map(response => { // Use rxjs to tranform the received data
        const datasArray = [];
        for (const key in response) {
            datasArray.push({ ...response[key], id: key }); // explode the data and add the id to the object
        }
        return datasArray;
    }), catchError(error => { /* Do something */ 
        return throwError(error);
    })) // catchError and throwError are an rxjs operator 
    .subscribe(datas => {
        console.log(datas);
    });
}
```

## Send DELETE to Firebase

```typescript
deleteData() {
    this.http.delete('https://learn-angular-2a595.firebaseio.com/datas.json')
        .subscribe(() => {
            console.log('done');
        });
}
```

## Having a loading indicator for http request

```typescript
loading = false;
getData() {
    this.loading = true;

    this.http.get(...)
        .subscribe(datas => {
            this.loading = false;
            console.log(datas);
        });
}
```

And in the template,
```html
<p *ngIf="loading">Loading</p>
```

## Using a Service for http requests

We can outsource the http requests in a dedicated service and to return the results to the component we can do it like below:

```typescript
getData() {
    return this.http.get(...); // subscribe in the component, we can use subject as well in case where we might have multiple subscribers.
}
```

## Passing headers and query params

```typescript
getData() {
    this.http.get('url',
    {
        headers: new HttpHeaders({'key', 'value'}),
        params: new HttpParams().set('key', 'value') // or append
        observe: 'response' // to receive all the response, body is the default. We can use events to receive only http events.
        responseType: 'json' // to specify to angular in which format we want the response: angular will do the transformation
    });
}
```

