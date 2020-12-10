import React from "react";
import { connect } from "react-redux";

import { Grid, Typography, Paper } from "@material-ui/core/";
import { ThemeProvider, makeStyles } from "@material-ui/styles/";
import theme from "../theme";

const useStyles = makeStyles({
  root: {
    minHeight: "600px",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "2%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },

  productImage: {
    height: "400px",
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: "1",
    color: "#000",
  },
});

const ProductOverlay = ({ title, description, price, imageURL }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.center} variant="h4">
            {title}
          </Typography>
          <br />
          <img className={classes.productImage} src={imageURL} alt={imageURL} />
          <br />
          <Typography className={classes.center} variant="subtitle1">
            {description}
          </Typography>
          <Typography className={classes.center} variant="subtitle1">
            ${price}.00
          </Typography>
          <br />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(ProductOverlay);
