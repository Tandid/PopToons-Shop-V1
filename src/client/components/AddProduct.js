import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/product";

import {
  Backdrop,
  Grid,
  Button,
  Typography,
  TextField,
} from "@material-ui/core/";
import { ThemeProvider, makeStyles } from "@material-ui/styles/";
import theme from "../theme";

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.white,
    padding: theme.spacing(5),
  },

  backdrop: {
    zIndex: "theme.zIndex.drawer + 1",
    color: "#000",
  },
});

const AddProduct = ({
  user,
  //   title,
  //   description,
  //   imageURL,
  //   price,
  save,
  history,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const classes = useStyles();
  async function onSubmit(event) {
    event.preventDefault();
    try {
      await save(
        {
          title: title,
          description: description,
          imageURL: imageURL,
          price: price,
        },
        history.push
      );
    } catch (exception) {
      setError({ error: exception.response.data.message });
    }
  }

  useEffect(() => {
    console.log(title, description, imageURL, price);
  }, [title, description, imageURL, price]);

  return (
    <ThemeProvider theme={theme}>
      <Backdrop className={classes.backdrop} open>
        <Grid container direction="column" alignItems="center">
          <Typography variant="subtitle1" className={classes.text}>
            Status: {user.admin === true ? "Admin" : "User"}
          </Typography>
          <br />
          <Grid
            container
            justify="space-between"
            alignItem="center"
            className={classes.profileInfo}
          >
            <Typography variant="subtitle1" className={classes.text}>
              First Name:
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.profileInfo}
          >
            <Typography variant="subtitle1" className={classes.text}>
              Last Name:
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.profileInfo}
          >
            <Typography variant="subtitle1" className={classes.text}>
              Email:
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.profileInfo}
          >
            <Typography variant="subtitle1" className={classes.text}>
              imageURL:
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
            />
          </Grid>
          <br />
          <Button
            variant="filled"
            onClick={onSubmit}
            disabled={
              title === "" &&
              description === "" &&
              imageURL === "" &&
              price === 0
            }
          >
            Create Product
          </Button>
        </Grid>
      </Backdrop>
    </ThemeProvider>
  );
};

const mapStateToProps = ({
  user,
  title,
  description,
  imageURL,
  price,
  history,
}) => {
  return {
    user,
    title,
    description,
    imageURL,
    price,
    history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (product, push) => dispatch(createProduct(product, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
