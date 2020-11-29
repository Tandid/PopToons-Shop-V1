import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetails } from "../store/product";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createOrderItem, updateOrderItem } from "../store/orderItems";
import { updateOrder } from "../store/orders";
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

const ProductDetails = ({
  id,
  product,
  match,
  getProduct,
  orderItems,
  newOrderItem,
  incrementOrderItem,
  price,
  cart,
  updateTotalPrice,
}) => {
  const classes = useStyles();

  useEffect(() => {
    const productId = match.params.id;
    getProduct(productId);
  }, []);

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
        <Button variant="contained" color="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({
  products,
  product,
  user,
  users,
  orders,
  orderItems,
}) => {
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
    products,
    product,
    user,
    users,
    cart,
    orders,
    orderItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getDetails(id)),
    newOrderItem: (orderItem) => dispatch(createOrderItem(orderItem)),
    incrementOrderItem: (orderItem) => dispatch(updateOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
