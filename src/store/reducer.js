import * as actionType from './actions';

const INGREDIENT_PRICE={
    salad: 30,
    bacon: 50,
    cheese: 50,
    meat: 80
}

const initialState = {
    ingredients: {
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
    },
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

        default:
            return state;
    }
};

export default reducer;