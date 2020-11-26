import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { deleteOrderItem, getOrderItems } from "../store/orderItems";
import { updateOrder } from "../store/orders";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "600px",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    padding: "2%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cart = ({ orderItems, loadOrderItems }) => {
  const classes = useStyles();

  useEffect(() => {
    loadOrderItems();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.center} variant="h4">
        Cart
      </Typography>
      <ul>
        {orderItems.map((orderItem) => (
          <ProductList key={Math.random()} {...orderItem} />
        ))}
      </ul>
      <Typography className={classes.center} variant="h6">
        Total Price:
      </Typography>
      <br />
      <br />
      <Grid className={classes.center}>
        <Button variant="outlined"> Clear Cart </Button>
        <Button variant="outlined"> Checkout </Button>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = ({ orders, orderItems, user, products }) => {
  return {
    orderItems,
    user,
    products,
    orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    removeFromCart: (orderItem) => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
