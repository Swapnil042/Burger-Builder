import React from 'react';

import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div style={{margin: '30px'}}>
                <Button 
                    btnType="Danger"
                    clicked={props.checkoutCanceled}>CANCEl</Button>
                <Button 
                    btnType="Success"
                    clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
            
        </div>
    );
}

export default checkoutSummary;