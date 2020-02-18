import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], // forRoot should be present only in the AppModule, for children we must use forChild()
    exports: [RouterModule]
})
export class AppRoutingModule {

}