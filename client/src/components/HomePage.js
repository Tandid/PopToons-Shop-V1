import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  {
    imgPath: "images/one_piece.jpg",
  },
  {
    imgPath: "images/pop_dbz_banner.jpg",
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
  },
  footer: {
    width: "95%",
    height: "200px",
    margin: theme.spacing(3),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  largePost: {
    objectFit: "contain",
    width: "95%",
    height: theme.spacing(17),
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  miniPostOne: {
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
      <div
        className={classes.footer}
        style={{ backgroundImage: "url(images/streetfighter.jpg)" }}
      />
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
