Can be used to transform the output in the template.

Documentation: https://angular.io/api?query=pipe

Examples: 

`{{ aName | uppercase }}`

Passing parameter: `{{ aDate | date:'fullDate' }}`

Combine pipes: `{{ aDate | date:'fullDate' | uppercase }}`

## Create a custom pipe

Command can be used: `ng g p ShortenText`

```typescript
@Pipe({
    name: short
})
export class ShortTextPipe implements PipeTransform /* Implements not necessary */ {
    transform(value: any, size: number) { // the size is a pipe parameter, we can have multiple
        return value.substr(0, number);
    }
}
```

The pipe should be added in AppModule declarations like components and directives.

Then it can be used: `{{ aName | short:5 }}`

In ngFor loop: `*ngFor="let item of items | myCustomPipe:param"` please note that changing the param value will trigger the pipe but changing the items (data) won't trigger the pipe and that's the correct Angular behavior but can be changed by: 
```typescript
@Pipe({
    name: short
    pure: false
})
```

## async pipe

`{{ aValueFromPromise | async }}` will write the value once is available.