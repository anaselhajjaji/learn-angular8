Angular offers two approaches for forms handling:
- Template Approach: form object directly created from the dom
- Reactive Approach: form is created programmatically and synchronized with the dom

## Template approach
Nothing special to do, we only need to make sure to have FormsModule imported in app.module.ts
When Angular detects a form element in the html, it will create automatically a javascript object representing it but it will not detect automatically the inputs, for this we need to register the controls using ngModel directive available in FormsModule as well as the html attribute 'name':
`<input type="text" ngModel name="theName">`

For submission,
```typescript
export class AppComponent {
    constructor() {}
    onSubmit(form: NgForm) {
    }
}
```
And in the html,
`<form (ngSubmit)="onSubmit(theForm)" #theForm="ngForm">`

Another approach to access the form object is to use @ViewChild:
```typescript
export class AppComponent {
    @ViewChild('theForm') theForm: NgForm;
    constructor() {}
    onSubmit() {
    }
}
```

## Reactive approach