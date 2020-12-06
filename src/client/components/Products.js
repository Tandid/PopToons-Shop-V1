import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store";
import ProductCard from "./ProductCard.js";
import { Typography, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  },
}));

const Products = ({ products }) => {
  // onChange(ev) {
  //   this.setState({
  //     category: ev.target.value,
  //   });
  // }
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Typography variant="h4" className={classes.center}>
          Products
        </Typography>
        <ul className="card-wrapper">
          {products.map((product) => {
            return <ProductCard key={product.id} {...product} />;
          })}
        </ul>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ products, user }) => {
  return { products, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
