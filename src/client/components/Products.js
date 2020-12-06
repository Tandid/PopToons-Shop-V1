import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store";
import ProductCard from "./ProductCard.js";
import { Typography, Grid } from "@material-ui/core/";
import Pagination from "@material-ui/lab/Pagination";
import Footer from "./Footer";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  },
}));

const Products = ({ products }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {}, [page, productsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Grid>
        <Typography variant="h4" className={classes.center}>
          Products
        </Typography>
        <Pagination
          className={classes.center}
          count={3}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          size="large"
        />
        <ul className="card-wrapper">
          {products
            .slice(
              (page - 1) * productsPerPage,
              (page - 1) * productsPerPage + productsPerPage
            )
            .map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })}
        </ul>
        <Pagination
          className={classes.center}
          count={3}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          size="large"
        />
        <br />
      </Grid>
      <Footer title="Contact" description="Check out my portfolio here!" />
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
