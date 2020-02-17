import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://learn-angular-2a595.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(user => { // use take to automatically unsubscribe. exhaustMap will wait for the first observable to complete.
            return this.http.get<Recipe[]>('https://learn-angular-2a595.firebaseio.com/recipes.json', {
                params: new HttpParams().set('auth', user.token)
            });
        }), map(recipes => { // all this map thing is to prevent from returning undefined ingredients
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }), 
        tap(recipes => { 
            this.recipeService.setRecipes(recipes); 
        }));
    }
}