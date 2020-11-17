import React from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

import Footer from "./Footer";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath: "images/funko_banner.jpg",
  },
  {
    imgPath: "images/funko.jpg",
  },

  {
    imgPath: "images/one_piece.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(2),
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  banner: {
    width: theme.spacing(170),
    height: theme.spacing(60),
    margin: theme.spacing(3),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  largePost: {
    width: theme.spacing(120),
    height: theme.spacing(50),
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  miniPost: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    marginBottom: theme.spacing(4),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { email } = props;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div className={classes.center} key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.banner}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Grid container justify="center" className={classes.root}>
        {/* <Paper
          className={classes.banner}
          style={{ backgroundImage: "url(images/funko_banner.jpg)" }}
        /> */}
        {/* <Button className={classes.button} variant="contained" color="primary">
            SHOP NOW
            </Button> */}
        {/* <Grid container justify="center">
          <Paper
            className={classes.largePost}
            style={{ backgroundImage: "url(images/pop_dbz_banner.jpg)" }}
          />
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/dbz_funko_pops.jpg)" }}
          />
        </Grid> */}
        <Grid container justify="space-around">
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/civil_war.jpg)" }}
          />
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/star_wars.jpg)" }}
          />
        </Grid>
        {/* <Paper
          className={classes.banner}
          style={{ backgroundImage: "url(images/streetfighter_banner.jpg)" }}
        /> */}
      </Grid>
      <Footer title="Contact" description="Check out my portfolio here!" />
    </ThemeProvider>
  );
};

const mapState = (state) => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(HomePage);
