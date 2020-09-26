import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const price = this.state.totalPrice+priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: price})
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0){
            return
        }
        const updatedCount = oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const price = this.state.totalPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: price})
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;