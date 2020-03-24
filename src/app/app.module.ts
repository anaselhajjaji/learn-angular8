import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [ // this is where app components should be declared
    AppComponent,
    HeaderComponent
  ],
  imports: [ // to add other modules to be used within the app
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer), // add here all the reducer funtions
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent], // the startup component
})
export class AppModule { }
