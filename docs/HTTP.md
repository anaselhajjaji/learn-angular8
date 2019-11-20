## Send a POST request to Firebase

First, import HttpClientModule in AppModule.

```typescript
constructor(private http: HttpClient) {}

postData(data: { name: string; lastName: string }) {
    this.http.post<{ name: string}>( // If not subscribing, the request won't be sent
        'https://learn-angular-2a595.firebaseio.com/datas.json',
        data
    ).subscribe(response => {
        console.log(response);
    });
}
```

## Send a GET to Firebase

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
    })) 
    .subscribe(datas => {
        console.log(datas);
    });
}
```

