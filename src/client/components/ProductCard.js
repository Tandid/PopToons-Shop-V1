import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createOrderItem, updateOrderItem } from "../store/orderItems";
import { updateOrder } from "../store/orders";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "23%",
    textAlign: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "80%",
    backgroundSize: "contain",
    backgroundPosition: "center",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const ProductCard = ({
  id,
  title,
  imageURL,
  description,
  price,
  orderItems,
  newOrderItem,
  incrementOrderItem,
  updateTotalPrice,
  cart,
}) => {
  const classes = useStyles();

  async function addToCart(event) {
    event.preventDefault();
    try {
      const existingOrderItem = orderItems.find(
        (orderItem) =>
          orderItem.productId === id && orderItem.orderId === cart.id
      );
      if (!existingOrderItem) {
        await newOrderItem({
          productId: id,
          orderId: cart.id,
        });
      } else {
        await incrementOrderItem({
          productId: id,
          orderId: cart.id,
          quantity: existingOrderItem.quantity + 1,
        });
      }
      await updateTotalPrice(
        {
          id: cart.id,
          totalPrice: parseFloat(cart.totalPrice) + parseFloat(price),
        },
        () => {}
      );
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Card key={id} className={classes.root}>
        <CardMedia className={classes.media} image={imageURL} title={title} />
        <CardHeader title={title} subheader={description} />
        <Typography variant="h6">${price}.00</Typography>
        <CardContent>
          <Button variant="contained" color="black" href={`/products/${id}`}>
            View Product
          </Button>
          <Button onClick={addToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ user, orders, orderItems }) => {
  const cart = user.id
    ? orders.find(
        (order) => order.status === "cart" && order.userId === user.id
      )
    : orders.find(
        (order) =>
          order.status === "cart" &&
          order.userId === localStorage.getItem("guestId")
      );
  return {
    user,
    cart,
    orderItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newOrderItem: (orderItem) => dispatch(createOrderItem(orderItem)),
    incrementOrderItem: (orderItem) => dispatch(updateOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
