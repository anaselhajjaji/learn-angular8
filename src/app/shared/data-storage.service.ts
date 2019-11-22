import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://learn-angular-2a595.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://learn-angular-2a595.firebaseio.com/recipes.json')
        .pipe(map(recipes => { // all this map thing is to prevent from returning undefined ingredients
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }))
        .subscribe(
            recipes => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}