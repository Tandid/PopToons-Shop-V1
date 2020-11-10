import React from 'react'
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0
    },

}));

 
const Navbar = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        <NavLink to="/"> Funko Pop Shop </NavLink>
                    </Typography>
                    <Typography className={classes.title} variant="h6">
                        <NavLink to="/products"> Products </NavLink>
                    </Typography>
                    <Typography className={classes.title} variant="h6">
                        <NavLink to="/cart"> Cart # </NavLink>
                    </Typography>
                    <Typography className={classes.title} variant="h6">
                        <NavLink to="/orders"> Order History </NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>    
        </div>
    )
    
}

export default Navbar