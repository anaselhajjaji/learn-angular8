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
# Attribute directive creation

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
# Structural directive creation
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