import { Ingredient } from '../shared/ingredient.model';
import { Action } from '@ngrx/store';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
}

export function shoppingListReducer(state = initialState, action: Action /* action that triggered the reducer */) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return { // should not change the current state, we should create a new one
                ...state, // copy the current state properties then we can override what we need after
                ingredients: [
                    ...state.ingredients, // copy the current ingredients
                    action
                ]    
            };
    }
}