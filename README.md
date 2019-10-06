# Notes

## General notes
- Before starting an app, components and data model should be designed to define the application structure
- The CSS only applies to the component and doesn't affect other components because of Encapsulation by default set to Emulated and this behavior can be changed in the component by adding `@Component({encapsulation: ViewEncapsulation.None})`

## Possibilities we can have in the Angular template

Possibilities are presented below:
- String interpolation (has to use the string): '{{ variableFromTsFile }}'
- Property binding: `<button disabled /> ==> <button [disabled]="diabledBoolVarFromTs" />`
- Event binding: `<button (click)="methodFromTsFile()" />`
- Event binding (passing data): `<input type="text" (input)="onInputClickMethod($event)" />` and in ts file:
`onInputClickMethod(event: Event) {}`
- Two way binding (requires FormsModule to be added to imports): `<input type="text" [(ngModel)]="varFromTs" />`
ngModel is a directive (directives are instructions in the DOM), components are directives.
- Another way in case we don't want to use Two Binding isthe use of 'reference elements' in the template: `<input type="text" #theElementRef>` and in the component and this can be used everywhere in the template for example calling a method: `(click)="onButtonClicked(theElementRef)"` and to access this in the typescript we need to declare a property: `@ViewChild('theElementRef') theElementRefProperty: ElementRef` and to get access to the native element we should call: `theElementRefProperty.nativeElement`
- conditions: ngIf has a * because its a structural directive (that changes the dom)
`<p *ngIf="boolInTsFile; else somElse">Something</p><ng-template #somElse><p>Something else</p></ng-template>`
- ngStyle directive: `<p [ngStyle]={backgroundColor: getColorFromTsMethod()}>Something</p>`
- ngClass directive: `<p [ngClass]={classFromCSS: getBoolFromTsMethod()}>Something</p>`
- ngFor directive: `<app-server *ngFor="let server of servers; let i = index"></app-server>`

The MDN (Mozilla Developer Network) offers nice lists of all properties and events of 
the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  
should yield nice results.

## Passing Data and events between components

We can pass data / events between components using binding:
- For data: elements in a component are not exposed by default, to expose an element we should define it this way: `@Input element: TheType;` or `@Input('theAlias') element: TheType;`
It will be available outside using bindig, example: `<app-the-component [element]= "theElement" />` or `<app-the-component [theAlias]= "theElement" />`
- For events: first define the `onSomethingHappened(eventData: EventDataType)` on the parent component and in the component we can have: `<app-the-component (somethingHappened)="onSomethingHappened($event)" />`, the event declararion: `@Output() somethingHappened = new EventEmitter<EventDataType>()` (or using Alias `@Output('theAliasName') somethingHappened = new EventEmitter<EventDataType>()`) then the event can be called using: `somethingHappened.emit(theObjectData)`

## Interesting tools

Augury (https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=en)
Augury is a Google Chrome Dev Tool extension for debugging and visualizing Angular applications at runtime (injections, routes, components and their states ...)