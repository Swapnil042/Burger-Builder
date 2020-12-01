import * as actionType from '../actions/actionTypes';

const INGREDIENT_PRICE={
    salad: 30,
    bacon: 50,
    cheese: 50,
    meat: 80
}

const initialState = {
    ingredients:null,
    loading: false,
    error: false,
    totalPrice: 80
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice  + INGREDIENT_PRICE[action.ingredientName]
            };

        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice  - INGREDIENT_PRICE[action.ingredientName]
            };
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;