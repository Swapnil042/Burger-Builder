import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state={
        purchasing: false
    }

    componentDidMount(){
        this.props.fetchIngredients();    
    }

    updatePurchaseHandler=(ingredients)=>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el)=>{
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients cant be loaded</p>:<Spinner/>;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdd={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        ordered = {this.purchaseHandler}
                        price={this.props.totalPrice}
                        purchasable = {this.updatePurchaseHandler(this.props.ings)}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients = {this.props.ings} 
                                        purchaseCancelled={this.purchaseCancelHandler}
                                        purchaseContinued={this.purchaseContinueHandler}
                                        price={this.state.totalPrice}/>;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (igName)=> dispatch(burgerBuilderActions.addIngredient(igName)),
        onIngredientRemoved: (igName)=> dispatch(burgerBuilderActions.removeIngredient(igName)),
        fetchIngredients: ()=> dispatch(burgerBuilderActions.initIngredients())
    };
};

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));