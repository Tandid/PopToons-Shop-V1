import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetails } from "../store/product";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    marginBottom: "2%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2%",
  },
  media: {
    backgroundPosition: "center",
    height: "600px",
    width: "30%",
    backgroundSize: "contain",
  },
});

const ProductDetails = ({ product, match, getProduct }) => {
  const classes = useStyles();

  useEffect(() => {
    const productId = match.params.id;
    getProduct(productId);
  }, []);

  return (
    <Card className={classes.root}>
      {/* <CardMedia
        className={classes.media}
        alt={product.imageURL}
        image="/images/civil_war.jpg"
        title={product.title}
      /> */}
      <CardMedia
        className={classes.media}
        height={0}
        image="/images/product_images/aang.png"
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price ${product.price}
        </Typography>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ products, product, user, users }) => {
  return {
    products,
    product,
    user,
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
