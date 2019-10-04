import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // this is where app components should be declared
    AppComponent
  ],
  imports: [ // to add other modules to be used within the app
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // the startup component
})
export class AppModule { }
