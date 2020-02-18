Angular app can be split in several modules (application building blocks of feature module) but at least one module should be defined, in general AppModule.

In a module we can find:
- Declarations: components, directives and custom pipes
- Imports: to import other modules
- Providers: for services and interceptors
- Bootsrap: the component provided in index.html that starts the app
- entryComponents: for the components that we need to create programmatically in code