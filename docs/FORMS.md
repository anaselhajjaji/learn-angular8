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

### User input validation
Required: `<input type="text" ngModel name="theName" required>`
Email validator: `<input type="text" ngModel name="theName" required email>`
The validation result can be seen in form object as well as in the control: 'valid' field.
To disable a button if form not valid: `<button [disabled]="!theForm.valid">`
To change styles for example:
```css
input.ng_invalid.ng-touched {
    border: 1px solid red;
}
```
To output the error message:
```html
<input ngModel required email #email="ngModel">
<p *ngIf="!email.valid && email.touched">Please enter a valid email</p>
```
To set a default value for input use: `[ngModel]="propInTypescript"`
Two way binding can be used as well: `[(ngModel)]="propInTypescript"`
Form groups can be defined using: `<div id="a-group" ngModelGroup="aGroup">` and this group can be found inside the form object in form of FormGroup, the validity can be checked using css on the group and can be treated as previously done on FormControl.
We can change the form programmatically by calling: `this.theForm.setValue({...})` that sets all the form and the better approach is: `this.theForm.form.patchValue({...})` that doesn't override the other values.
To reset a form: `this.theForm.reset()`.

## Reactive approach

To objective is to create the form programmatically in typescript.

First, import: ReactiveFormsModule in app.module.ts

Then,
```typescript
theForm: FormGroup;
testProp: string;
ngOnInit() { 
    // NOTE THAT: we can have a nested Form, create a FormGroup inside the FormGroup and in html we need to use: <div formGroupName='nestedFormGroupName'>
    // Also if we want to have dynamic forms, we need to use FormArray and add ngFor in html to create and synchronize html control with FormControl.
    this.theForm = new FormGroup({
        'username': new FormControl('Default value', [Validators.required, this.customValidator.bind(this)]), // bind(this) because in the validator we are using class property and the validator is called from the outside.
        'email': new FormControl(null, [Validators.required, Validators.email], this.customAsyncValidator)
    });

    // We can subscrive to value changes event
    this.theForm.valueChanges.subscribe((value) => console.log(value));

    // We can subscrive to status changes event
    this.theForm.statusChanges.subscribe((status) => console.log(status));

    // We can also call: this.theForm.setValue({}); and this.theForm.patchValue({});
}

onSubmit() {
}

customValidator(control: FormControl): {[s: string]: boolean} {
    // check on control.value
    if (this.testProp != null) {}
    return {'ErrorCode', true};
    // return null, if correct
}

customAsyncValidator(control: FormControl): Promise<Any> | Observable<Any> {
    const promise = new Promise<Any>((resolve, reject) => {
        setTimeout(() => {
            if (control.value === 'something...') {
                resolve({'IncorrectValue': true});
            }
            else {
                resolve(null);
            }
        }, 2000);
    });
    return promise;
}

```
And to sync with html,
```html
<form [formGroup]='theForm' (ngSubmit)='onSubmit()'>
    <input type='text' id='username' formControlName='username'>
    <span *ngIf="!theForm.get('username').valid && theForm.get('username').touched">
        Please choose a valid username!</span>
    <span *ngIf="theForm.get('username').errors['ErrorCode']">
        Error related to ErrorCode!</span>
    <button type="submit">Submit</button>
</form>
```
