import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients:{
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for(let params of query.entries()){
            ingredients[params[0]] = +params[1];
        }
        this.setState({ingredients});
    }

    checkoutCancelHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCanceled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler}/>
        );
        
    }
}

export default Checkout;