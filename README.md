# Notes

## General notes
- Before starting an app, components and data model should be designed to define the application structure
- The CSS only applies to the component and doesn't affect other components because of Encapsulation by default set to Emulated and this behavior can be changed in the component by adding `@Component({encapsulation: ViewEncapsulation.None})`
- injecting content inside a component (`<app-component>HERE</app-component>`): by default Angular deletes all the content injected inside a component. To achieve this: just call `<ng-content></ng-content>` inside the template of the app-component, the content will be added automatically, the content can have a reference using '#' and can be accessed using `@ContentChild('theContentReference')`
- components lifecycle hooks: ngOnChanges -> called whenever a bound input property is changed, ngOnInit -> called once the component is initialized, ngDoCheck -> called every change detection run (every change on the template), ngAfterContentInit -> called after content (ng-content) has been projected into the view, ngAfterContentChecked -> called everytime the projected content is checked, ngAfterViewInit -> called after the components view has been initialized, ngAfterViewChecked -> called  everytime the view has been checked, ngOnDestroy -> the view has been destroyed. 

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

The MDN (Mozilla Developer Network) offers nice lists of all properties and events of 
the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  
should yield nice results.

## Passing Data and events between components

We can pass data / events between components using binding:
- For data: elements in a component are not exposed by default, to expose an element we should define it this way: `@Input element: TheType;` or `@Input('theAlias') element: TheType;`
It will be available outside using bindig, example: `<app-the-component [element]= "theElement" />` or `<app-the-component [theAlias]= "theElement" />`
- For events: first define the `onSomethingHappened(eventData: EventDataType)` on the parent component and in the component we can have: `<app-the-component (somethingHappened)="onSomethingHappened($event)" />`, the event declararion: `@Output() somethingHappened = new EventEmitter<EventDataType>()` (or using Alias `@Output('theAliasName') somethingHappened = new EventEmitter<EventDataType>()`) then the event can be called using: `somethingHappened.emit(theObjectData)`

## Directives

- Two types: attribute directive and structural directives (that changes the DOM content / they have '*' )
- We can't have more than one structural directive
- conditions: ngIf `<p *ngIf="boolInTsFile; else somElse">Something</p><ng-template #somElse><p>Something else</p></ng-template>`
Note that: `<ng-template [ngIf]="condition">` is the same as `<div *ngIf="condition">`
- ngStyle directive: `<p [ngStyle]={backgroundColor: getColorFromTsMethod()}>Something</p>`
- ngClass directive: `<p [ngClass]={classFromCSS: getBoolFromTsMethod()}>Something</p>`
- ngFor directive: `<app-server *ngFor="let server of servers; let i = index"></app-server>`
- ngSwitch: 
```html
<div> [ngSwitch]="value">
    <p *ngSwitchCase="5">Value is 5</p>
    <p *ngSwitchCase="10">Value is 10</p>
    <p *ngSwitchCase="100">Value is 100</p>
    <p *ngSwitchDefault>Value is Default</p>
</div>
```
### Attribute directive creation

we can create our directive using CLI: `ng generate directive the-name`
```typescript
@Directive({
    selector: '[appMyDirective]'
})
export class MyDirective implements OnInit {
    /*  the element is injected by Angular.
    *  Also, private is added in the constructor to add the elementRef as property automatically.
    */
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        // not the best solution to get access directly to the element but it's possible
        this.elementRef.nativeElement.style.backgroundColor = 'red';
    }
}
```
The best solution is:
```typescript
@Directive({
    selector: '[appMyBestDirective]'
})
export class MyBestDirective implements OnInit {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    // using the renderer is better practice: https://angular.io/api/core/Renderer2
    ngOnInit() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    }
}
```
To be used, first it should be added in declarations (app.module.ts). Example: `<p appMyDirective>TEXT</p>`
We can listen to the events by using the HostListener:
```typescript
@Directive({
    selector: '[appMyDirective]'
})
export class MyBestDirective implements OnInit {
    
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    }
}
```
We can use also host binding to use host element attributes and we can also expose attributes.
```typescript
@Directive({
    selector: '[appMyDirective]'
})
export class MyBestDirective implements OnInit {
    
    @Input() defaultColor: string = 'transparent';
    @Input() overColor: string = 'red';
    @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = this.overColor;
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = this.defaultColor;
    }
}
```
### Structural directive creation
```typescript
@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {
    @Input() set appUnless(condition: boolean) { // syntaxe to create a property and its setter at the same time
        if (!condition) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else {
            this.vcRef.clear();
        }
    }

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {} // To inject the template
}
```
The usage: `<div *appUnless="condition">`

## Services and dependency injection
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

## Routing
To register the routes we can add an array in app.module.ts as follows:
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent }
];
@NgModule({
...
imports: [RouterModule.forRoot(appRoutes)]
```
And in the page, call the router: `<router-outlet></router-outlet>`.
And to add a link for navigation use: `<a routerLink="/theLink">The Link</a>` of `[routerLink]="['/theLink', 'id']"` instead of href because href reloads the entire app.
Note that `routerLink="/theLink"` is absolute path and `routerLink="theLink"` is a relative path.
For styling we can use: `<a routerLink="/theLink" routerLinkActive="active">The Link</a>`
For the root path it won't work and we need the following code: `<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>`
### Programmaticaly 
```typescript
constructor(private router: Router) {} // inject the router

onButtonClick() {
    this.router.navigate(['/newLink']);
}
```
And also,
```typescript
constructor(private router: Router, private route: ActivatedRoute) {} // inject the router and the current route

onButtonClick() {
    this.router.navigate(['/newLink'], {relativeTo: this.route});
}
```
### Passing parameters
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users/:id', component: UserComponent }
];
```
And in the UserComponent,
```typescript
constructor(private route: ActivatedRoute) {}
ngOnInit() {
    this.id = this.route.snapshot.params['id'];
}
```

## Interesting tools

Augury (https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=en)
Augury is a Google Chrome Dev Tool extension for debugging and visualizing Angular applications at runtime (injections, routes, components and their states ...)