import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }, // Lazy loaded module
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }, // Lazy loaded module
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' } // Lazy loaded module
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes/*to configure preloading strategy , { preloadingStrategy: PreloadAllModules }*/)], // forRoot should be present only in the AppModule, for children we must use forChild()
    exports: [RouterModule]
})
export class AppRoutingModule {

}