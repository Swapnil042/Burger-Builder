import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label : 'Salad', type:'salad'},
    {label : 'Meat', type:'meat'},
    {label : 'Cheese', type:'cheese'},
    {label : 'Bacon', type:'bacon'}
];

const buildControls = (props)=>(
    <div className={classes.BuildControls}>
        <p><strong>Price : {props.price} BDT</strong> </p>
        {controls.map(ctrl=>{
            return <BuildControl 
                        label={ctrl.label} 
                        key={ctrl.label}
                        added={()=> props.ingredientAdd(ctrl.type)}
                        removed={()=>props.ingredientRemove(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}/>
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>
)

export default buildControls;

