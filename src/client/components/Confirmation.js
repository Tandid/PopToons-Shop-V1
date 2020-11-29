import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { getOrder } from "../store/orders";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "600px",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
    padding: "2%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  receipt: {
    padding: "2%",
  },
});

const Confirmation = ({ match, products, order, orderItems, loadOrder }) => {
  const classes = useStyles();
  useEffect(() => {
    const orderId = match.params.id;
    loadOrder(orderId);
  }, []);

  if (!products.length || !order.id || !orderItems.length) {
    return <h1>Loading...</h1>;
  } else {
    const thisOrderItems = orderItems.filter(
      (orderItem) => orderItem.orderId === order.id
    );
    return (
      <Paper className={classes.root}>
        <Grid>
          <Typography variant="h5" className={classes.center}>
            Thank you for shopping with us!
          </Typography>
          <Typography variant="h5" className={classes.center}>
            You will receive an email confirmation soon with shipping and
            tracking details 😊
          </Typography>
          <Typography variant="h5" className={classes.center}>
            Here is a summary of your order:
          </Typography>
          <br />
        </Grid>
        <Paper className={classes.receipt} key={Math.random()}>
          <Grid>
            <Typography>Order #: {order.id}</Typography>
            <Typography>Status: {order.status.toUpperCase()}</Typography>
          </Grid>
          <Grid>
            <ul>
              {thisOrderItems.map((orderItem) => (
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  key={Math.random()}
                >
                  {/* <img
                    className="orderItems"
                    alt="product img"
                    src={
                      products.find(
                        (product) => product.id === orderItem.productId
                      ).imageURL
                    }
                  /> */}
                  <Typography>X{orderItem.quantity}</Typography>
                  <Typography>
                    {
                      products.find(
                        (product) => product.id === orderItem.productId
                      ).title
                    }
                  </Typography>

                  <Typography>
                    $
                    {
                      products.find(
                        (product) => product.id === orderItem.productId
                      ).price
                    }
                  </Typography>
                </Grid>
              ))}
            </ul>
            <Typography>
              Total Price: ${parseFloat(order.totalPrice).toFixed(2)}
            </Typography>
          </Grid>
        </Paper>
        <br />
        <Button variant="outlined" className={classes.center} href="/">
          Continue Shopping
        </Button>
      </Paper>
    );
  }
};

const mapStateToProps = ({ match, products, order, orderItems }) => {
  return {
    products,
    order,
    orderItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrder: (id) => dispatch(getOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
