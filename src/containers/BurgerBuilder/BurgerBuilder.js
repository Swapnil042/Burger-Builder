import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE={
    salad: 30,
    bacon: 50,
    cheese: 50,
    meat: 80
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice: 80,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-bc634.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
                this.updatePurchaseState(response.data);
            }).catch(error =>{
                this.setState({error: true});
            });    
    }

    updatePurchaseState=(ingredients)=>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el)=>{
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients={
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const price = this.state.totalPrice+priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: price});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0){
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const price = this.state.totalPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: price});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Swapnil',
        //         address:{
        //             street: 'Teststreet 1',
        //             zipCode: '123456',
        //             country: 'Bangladesh'
        //         },
        //         email:'test@test.com'    
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing:false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing:false});
        //     });

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients cant be loaded</p>:<Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        ordered = {this.purchaseHandler}
                        price={this.state.totalPrice}
                        purchasable = {this.state.purchasable}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients = {this.state.ingredients} 
                                        purchaseCancelled={this.purchaseCancelHandler}
                                        purchaseContinued={this.purchaseContinueHandler}
                                        price={this.state.totalPrice}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
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

export default withErrorHandler(BurgerBuilder, axios);