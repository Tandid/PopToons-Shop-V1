import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { ThemeProvider } from "@material-ui/styles";
import FeaturedProducts from "./FeaturedProducts.js";

import Footer from "./Footer";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath: "images/funko_banner.jpg",
  },
  // {
  //   imgPath: "images/funko.jpg",
  // },

  {
    imgPath: "images/one_piece.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: theme.spacing(2),
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  banner: {
    width: "95%",
    height: "500px",
    margin: theme.spacing(3),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // objectFit: "contain",
  },
  largePost: {
    width: "90%",
    height: theme.spacing(60),
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  miniPost: {
    width: theme.spacing(70),
    height: theme.spacing(100),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

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
                key={index}
                className={classes.banner}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <FeaturedProducts />
      <br />
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
      <Footer title="Contact" description="Check out my portfolio here!" />
    </ThemeProvider>
  );
};

const mapState = ({ user, products }) => {
  return {
    email: user.email,
    products,
  };
};

export default connect(mapState)(HomePage);
