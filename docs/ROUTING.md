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

## Programmaticaly 
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

## Passing parameters
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
### Query parameters
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

## Nested (Child) routing
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

## Wildcard routes
```typescript
const appRoutes: Routes = [
    ...
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' } // should be the last route
];
```

## Guards
### CanActivate Guard
Used to protect routes, can be achieved using a service:
```typescript
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean // Can return either Observable, Promise or boolean synchronously
    {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                }
            }
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean // Can return either Observable, Promise or boolean synchronously
    {
        return this.canActivate(route, state);
    }
}
```
To use the this guard, in appRoutes: 'canActivate' protects the route and 'canActivateChild' protects the children
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', canActivate: [AuthGuard], canActivateChild: [AuthGuard], component: UsersComponent, children : [
        { path: ':id', component: UserComponent },
        ...
    ]}
];
```
### CanDeactivate Guard to prevent the user from accidentally leaving a route
First create an interface and a service:
```typescript
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, 
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }
}
```
In the route:
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', canDeactivate: [CanDeactivateGuard], component: UsersComponent, children : [
        { path: ':id', component: UserComponent },
        ...
    ]}
];
```
Then in the component:
```typescript
export class UsersComponent implements CanComponentDeactivate {
    canDeactivate: Observable<boolean> | Promise<boolean> | boolean {
        if (this.canLeave) {
            return true;
        }
        else {
            return confirm('Do you want to leave?');
        }
    }
}
```
### Passing static data to a route
```typescript
const appRoutes: Routes = [
    ...
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' } // should be the last route
];
```
And in the component:
```typescript
export class ErrorPageComponent implements OnInit {
    errorMessage: string;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.errorMessage = this.route.snapshot.data['message'];
        // Or use subscribe
        this.route.data.subscribe(
            (data: Data) => {
                this.errorMessage = data['message'];
            }
        );
    }
}
```
### Passing dynamic data to a route
Create a service:
```typescript
interface Server {
    id: number,
    name: string
}
@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private serverService: ServersService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server  {
        return this.serverService.getServer(+route.params['id']); // the '+' to cast the string to integer
    }
}
```
Add it to routing module:
```typescript
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'servers', component: ServersComponent, children : [
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
        ...
    ]}
];
```
And in the component:
```typescript
export class ServerComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.data.subscribe(
            (data: Data) => {
                this.server = data['server'];
            }
        );
    }
}
```
### Routing strategy
In real world this routing method wont work because the URL: localhost:4200/servers will force the server that hosts the app to look for the route /servers before Angular.
To fix this we need to use the hash method that will add a hash (example: localhost:4200/#/servers) that will tell the hosting server only care about what's before the '#': 
```typescript
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
```