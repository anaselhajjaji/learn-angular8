import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { // Should use the same key for the reducer function in app module and the payload type
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // no need to unsubscribe, will be done automatically by ngrx
    /* The above line replaces the following lines:
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    }); */
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onEditItem(id: number) {
    this.slService.startedEditing.next(id);
  }
}
