import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { deleteOrderItem, getOrderItems } from "../store/orderItems";
import { updateOrder } from "../store/orders";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles/";

import theme from "../theme";

import Footer from "./Footer";

const useStyles = makeStyles({
  root: {
    minHeight: "600px",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
    padding: "2%",
  },
  cartItems: {
    overflow: "scroll",
    maxHeight: "400px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cart = ({
  orderItems,
  loadOrderItems,
  cart,
  cartOrderItems,
  products,
  updateTotalPrice,
}) => {
  const classes = useStyles();

  async function clearCart(event) {
    event.preventDefault();
    const cartOrderItems = await orderItems.filter(
      (orderItem) => orderItem.orderId === cart.id
    );
    try {
      let orderItemsPrice = 0;
      await cartOrderItems.forEach((orderItem) => {
        orderItemsPrice =
          orderItemsPrice +
          parseFloat(
            products.find((product) => product.id === orderItem.productId).price
          ).toFixed(2) *
            orderItem.quantity;
      });
      await updateTotalPrice(
        {
          id: cart.id,
          totalPrice: parseFloat(cart.totalPrice).toFixed(2) - orderItemsPrice,
        },
        () => {}
      );
      await cartOrderItems.forEach((orderItem) => {
        this.props.removeFromCart(orderItem);
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  useEffect(() => {
    loadOrderItems();
  }, []);

  if (!cart || !orderItems) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Typography className={classes.center} variant="h4">
            Cart
          </Typography>
          <Grid className={classes.cartItems}>
            {cartOrderItems.map((orderItem) => (
              <ProductList key={Math.random()} {...orderItem} />
            ))}
          </Grid>
          <Typography className={classes.center} variant="h6">
            Total Price: ${Math.abs(parseFloat(cart.totalPrice).toFixed(2))}{" "}
          </Typography>
          <br />
          <br />
          <Grid className={classes.center}>
            <Button onClick={clearCart} variant="contained">
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="/checkout"
              disabled={!cartOrderItems.length}
            >
              Checkout
            </Button>
          </Grid>
        </Paper>
        <Footer title="Contact" description="Check out my portfolio here!" />
      </ThemeProvider>
    );
  }
};

const mapStateToProps = ({ orders, orderItems, user, products }) => {
  const cart = user.id
    ? orders.find(
        (order) => order.status === "cart" && order.userId === user.id
      )
    : orders.find(
        (order) =>
          order.status === "cart" &&
          order.userId === localStorage.getItem("guestId")
      );

  const cartOrderItems = orderItems.filter(
    (orderItem) => orderItem.orderId === cart.id
  );
  return {
    orderItems,
    user,
    products,
    orders,
    cart,
    cartOrderItems,
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
