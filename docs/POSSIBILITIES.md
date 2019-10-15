Possibilities are presented below:
- String interpolation (has to use the string): '{{ variableFromTsFile }}'
- Property binding: `<button disabled /> ==> <button [disabled]="diabledBoolVarFromTs" />`
- Event binding: `<button (click)="methodFromTsFile()" />`
- Event binding (passing data): `<input type="text" (input)="onInputClickMethod($event)" />` and in ts file:
`onInputClickMethod(event: Event) {}`
- Two way binding (requires FormsModule to be added to imports): `<input type="text" [(ngModel)]="varFromTs" />`
ngModel is a directive (directives are instructions in the DOM), components are directives.
- Another way in case we don't want to use Two Binding isthe use of 'reference elements' in the template: `<input type="text" #theElementRef>` and in the component and this can be used everywhere in the template for example calling a method: `(click)="onButtonClicked(theElementRef)"` and to access this in the typescript we need to declare a property: `@ViewChild('theElementRef') theElementRefProperty: ElementRef` and to get access to the native element we should call: `theElementRefProperty.nativeElement`

The MDN (Mozilla Developer Network) offers nice lists of all properties and events of 
the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  
should yield nice results.