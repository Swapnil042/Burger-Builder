import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false});
    }
    
    sideDrawerToggleHandler=()=>{
        
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    clicked = {this.sideDrawerToggleHandler}
                    isAuth = {this.props.isAunthenticated}/>
                <SideDrawer
                    isAuth = {this.props.isAunthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAunthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);