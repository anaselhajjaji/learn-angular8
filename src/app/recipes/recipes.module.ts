import { NgModule } from '@angular/core';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
    declarations: [
        RecipesComponent, 
        RecipeListComponent, 
        RecipeDetailComponent, 
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    exports: [ // List the components that can be used outside this module
        RecipesComponent, 
        RecipeListComponent, 
        RecipeDetailComponent, 
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]
})
export class RecipesModule {
}