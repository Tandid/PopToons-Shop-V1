import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from "@material-ui/core/Tab";
import {ThemeProvider} from '@material-ui/styles'
import theme from '../theme'



const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0
    },

}));

 
const Navbar = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <AppBar style={{ margin: 0 }} position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        <NavLink to="/"> Funko Pop Shop </NavLink>
                    </Typography>
                    <Tab label="Products" component={Link} to="products" />
                    <Tab label="Cart #" component={Link} to="/cart" />
                    <Tab label="Order History" component={Link} to="/orders" />
                </Toolbar>
            </AppBar>    
        </ThemeProvider>
    )
    
}

export default Navbar