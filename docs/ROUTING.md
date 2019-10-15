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
Or can be created in a separate module (to be added in app.module imports):
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
```
And in the page, call the router: `<router-outlet></router-outlet>`.
And to add a link for navigation use: `<a routerLink="/theLink">The Link</a>` of `[routerLink]="['/theLink', 'id']"` instead of href because href reloads the entire app.
Note that `routerLink="/theLink"` is absolute path and `routerLink="theLink"` is a relative path.
For styling we can use: `<a routerLink="/theLink" routerLinkActive="active">The Link</a>`
For the root path it won't work and we need the following code: `<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>`

# Programmaticaly 
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

# Passing parameters
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users/:id', component: UserComponent }
];
```
And in the UserComponent (this approach will work only the first time the component is instanciated),
```typescript
constructor(private route: ActivatedRoute) {}
ngOnInit() {
    this.id = this.route.snapshot.params['id'];
}
```
Approach that works everytime (using Observable):
```typescript
subscription: Subscription;
constructor(private route: ActivatedRoute) {}
ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
        this.id = params['id'];        
    });
}
ngOnDestroy() {
    this.subscription.unsubscribe(); // not needed, angular will do it for this case, but it's an interesting thing to do in case of observers.
}
```
## Query parameters
For query params: `<a routerLink="/theLink" [queryParams]="{key1: 'value1', key2: 'value2'}">The Link</a>`
For fragments: `<a routerLink="/theLink" fragment="loading">The Link</a>`
Programmatically:
```typescript
constructor(private router: Router) {} // inject the router

onButtonClick() {
    this.router.navigate(['/newLink'], {queryParams: {key1: 'value1', key2: 'value2'}, fragment: 'loading'});
}
```
To retrieve them (same as before):
```typescript
constructor(private route: ActivatedRoute) {}
ngOnInit() {
    this.route.snapshot.queryParams... // or this.route.snapshot.fragment
    // OR
    this.route.queryParams.subscribe((params: Params) => {
        ...
    });
}
```

To preserve the query parameters when navigating:
`this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});`

# Nested (Child) routing
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children : [
        { path: ':id', component: UserComponent },
        ...
    ]}
];
```
And in the users html file add, `<router-outlet></router-outlet>`.

# Wildcard routes
```typescript
const appRoutes: Routes = [
    ...
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' } // should be the last route
];
```