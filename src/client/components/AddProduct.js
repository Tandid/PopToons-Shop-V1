import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/product";

import {
  Backdrop,
  Grid,
  Button,
  Typography,
  TextField,
  Paper,
} from "@material-ui/core/";
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
  text: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "flex-end",
  },
  profileInfo: {
    width: "70%",
  },
  productImage: {
    height: "200px",
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: "theme.zIndex.drawer + 1",
    color: "#000",
  },
});

const AddProduct = ({ user, save, history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("./images/default_image.jpg");
  const [price, setPrice] = useState(0);
  const [setError] = useState("");

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
        <Paper className={classes.root}>
          <form>
            <Grid container direction="row" alignItems="center">
              <Grid container direction="column" alignItems="center">
                <Typography className={classes.center} variant="h4">
                  Create New Product
                </Typography>
                <br />
                <img
                  className={classes.productImage}
                  src={imageURL}
                  alt={imageURL}
                />
                <br />
              </Grid>
              <Grid container direction="column" alignItems="center">
                <Grid
                  container
                  justify="space-between"
                  alignItem="center"
                  className={classes.profileInfo}
                >
                  <Typography variant="subtitle1" className={classes.text}>
                    Product Name:
                  </Typography>
                  <TextField
                    required
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
                    Description:
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
                    Price:
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
                    Image URL:
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
                  disabled={!title || !description || !imageURL || !price}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
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
