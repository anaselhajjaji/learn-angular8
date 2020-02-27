import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions /* action that triggered the reducer */) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return { // should not change the current state, we should create a new one
                ...state, // copy the current state properties then we can override what we need after
                ingredients: [
                    ...state.ingredients, // copy the current ingredients
                    action.payload
                ]    
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]    
            };
        default:
            return state; // return the unchanged state, will be used for initialization
    }
}