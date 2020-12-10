import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard.js";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: theme.spacing(2),
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

const FeaturedProducts = ({ products }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h4" className={classes.center}>
        Featured Collection
      </Typography>
      <br />
      {/* <Grid container justify="space-evenly">
          {randomProducts.length === 3
            ? randomProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            : products
                .slice(1, 3)
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
        </Grid> */}
      <Grid container justify="space-evenly">
        {products.slice(1, 4).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </Grid>
  );
};

const mapState = ({ user, products }) => {
  // let randomProducts = [];
  // let hash = {};
  // const randomNum = (array) => {
  //   let random = Math.floor(Math.random() * array.length);
  //   hash[random] ? randomNum() : (hash[random] = random);
  //   return random;
  // };
  // const featuredProducts = (products) => {
  //   if (products.length === 3) {
  //     randomProducts = products;
  //   } else {
  //     for (let i = 0; i < 3; i++) {
  //       let randomIdx = randomNum(products);
  //       let randomProd = products.find((product) => product.id === randomIdx);
  //       randomProducts.push(randomProd);
  //       console.log({ randomProducts: randomProducts });
  //     }
  //   }
  // };
  // featuredProducts(products);
  return {
    user,
    products,
    // randomProducts,
  };
};

export default connect(mapState)(FeaturedProducts);
