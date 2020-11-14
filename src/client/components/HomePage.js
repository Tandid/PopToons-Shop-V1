import React from "react";
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
    imgPath: "images/funko_banner.jpg",
  },
  {
    imgPath: "images/funko_banner.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(2),
  },
  banner: {
    width: theme.spacing(170),
    height: theme.spacing(50),
    marginBottom: theme.spacing(4),
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

const HomePage = () => {
  const classes = useStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container justify="center" className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
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
        <Paper
          className={classes.banner}
          style={{ backgroundImage: "url(images/funko_banner.jpg)" }}
        />
        {/* <Button className={classes.button} variant="contained" color="primary">
            SHOP NOW
            </Button> */}
        <Grid container justify="center">
          <Paper
            className={classes.largePost}
            style={{ backgroundImage: "url(images/pop_dbz_banner.jpg)" }}
          />
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/dbz_funko_pops.jpg)" }}
          />
        </Grid>
        <Grid container justify="space-around">
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/naruto_vs_sasuke.jpg)" }}
          />
          <Paper
            className={classes.miniPost}
            style={{ backgroundImage: "url(images/thor_vs_thanos.jpg)" }}
          />
        </Grid>
        <Paper
          className={classes.banner}
          style={{ backgroundImage: "url(images/streetfighter_banner.jpg)" }}
        />
      </Grid>
      <Footer title="Contact" description="Check out my portfolio here!" />
    </ThemeProvider>
  );
};

export default HomePage;
