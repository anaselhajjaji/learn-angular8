Angular app can be split in several modules (application building blocks of feature module) but at least one module should be defined, in general AppModule.

Fonctionnaly there are two types of modules:
- Feature module
- Shared module (for example: FormsModule, CommonModule)

In a module we can find:
- Declarations: components, directives and custom pipes
- Imports: to import other modules
- Providers: for services and interceptors
- Bootsrap: the component provided in index.html that starts the app
- entryComponents: for the components that we need to create programmatically in code

The idea behind lazy loading is to load and download only the visited module route.

Services usage in modules:
- Services available app-wide: general usage, the default behavior and we use root injector (Injectable provided in root directly in service or in providers in AppModule)
- Services available in component scope, we use component injector and we should pay attention about the usage because it can create strange behavior
- Services available eager-loaded modules: to be avoided (we use root injector or providers in Module)
- Services available in lazy loaded modules: to be used only if the service is really scoped to that module (we use child injector, add it in providers of module / pay attention we can finish by using two different instances of the same service: one app wide and the other scoped to the module)
