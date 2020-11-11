import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {ThemeProvider} from '@material-ui/styles'
import theme from '../theme'

import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        marginTop: theme.spacing(2)
        },
    banner: {
        width: theme.spacing(170),
        height: theme.spacing(50),
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
          },    
    largePost: {
        width: theme.spacing(120),
        height: theme.spacing(50),
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      miniPost: {
        width: theme.spacing(50),
        height: theme.spacing(50),
        marginBottom: theme.spacing(4),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      button: {
        position: 'absolute',
        height: theme.spacing(7),
        width: theme.spacing(26),
        top: '47%'
      }
  }));


const HomePage = () => {

    const classes = useStyles();

        return (
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container justify="center" className={classes.root}>
            <Paper className={classes.banner} style={{backgroundImage: 'url(images/funko_banner.jpg)'}}/>
            {/* <Button className={classes.button} variant="contained" color="primary">
            SHOP NOW
            </Button> */}
            <Grid container justify="center">
            <Paper className={classes.largePost} style={{backgroundImage: 'url(images/pop_dbz_banner.jpg)'}}/>
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(images/dbz_funko_pops.jpg)'}}/>
            </Grid>
            <Grid container justify="space-around">
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(images/naruto_vs_sasuke.jpg)'}}/>
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(images/thor_vs_thanos.jpg)'}}/>
            </Grid>
            <Paper className={classes.banner} style={{backgroundImage: 'url(images/streetfighter_banner.jpg)'}}/>
            </Grid>
            <Footer title="Contact" description="Check out my portfolio here!" />
            </ThemeProvider>

        )
    
}

export default HomePage