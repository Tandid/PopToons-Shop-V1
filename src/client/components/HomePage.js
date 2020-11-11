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
            <Paper className={classes.banner} style={{backgroundImage: 'url(https://www.bemoregeek.co.uk/content/images/carousels/bmg-web-banners5-9927.jpg)'}}/>
            <Button className={classes.button} variant="contained" color="primary">
            SHOP NOW
            </Button>
            <Grid container justify="center">
            <Paper className={classes.largePost} style={{backgroundImage: 'url(https://cdn10.bigcommerce.com/s-6r10lz/product_images/uploaded_images/pop-dbz-banner.jpg?t=1488346408)'}}/>
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(https://www.tierragamer.com/wp-content/uploads/2020/09/Dragon-Ball-Z-Nuevos-Funko-Pop-01.jpg)'}}/>
            </Grid>
            <Grid container justify="space-around">
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(https://photos-us.bazaarvoice.com/photo/2/cGhvdG86Z2FtZXN0b3A/eaadf1af-a29a-5d69-9e31-692532e0f628)'}}/>
            <Paper className={classes.miniPost} style={{backgroundImage: 'url(https://media.comicbook.com/2018/11/funko-thor-vs-thanos-1143282.jpeg)'}}/>
            </Grid>
            <Paper className={classes.banner} style={{backgroundImage: 'url(https://cdn2.bigcommerce.com/server500/d90a4/product_images/theme_images/funkopop-sf-banner__89066.jpg?t=1482074497)'}}/>
            </Grid>
            <Footer title="Contact" description="Check out my portfolio here!" />
            </ThemeProvider>

        )
    
}

export default HomePage