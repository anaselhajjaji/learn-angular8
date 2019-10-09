import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
          'This is a description',
          'https://www.bakedbyanintrovert.com/wp-content/uploads/2017/01/Basic-Vanilla-Cake_640-3.jpg'),
        new Recipe('Another Test Recipe',
          'This is a description',
          'https://www.bakedbyanintrovert.com/wp-content/uploads/2017/01/Basic-Vanilla-Cake_640-3.jpg')
      ];

    getRecipes() {
        return this.recipes.slice(); // to return a copy to avoid returning the reference to the recipe property.
    }
}