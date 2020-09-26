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
        {controls.map(ctrl=>{
            return <BuildControl 
                        label={ctrl.label} 
                        key={ctrl.label}
                        add={()=> props.ingredientAdd(ctrl.type)}
                        remove={()=>props.ingredientRemove(ctrl.type)}/>
        })}
    </div>
)

export default buildControls;

