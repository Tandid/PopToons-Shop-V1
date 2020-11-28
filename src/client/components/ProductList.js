import React from "react";
import { connect } from "react-redux";
import {
  deleteOrderItem,
  updateOrderItem,
  getOrderItems,
} from "../store/orderItems";
import { updateOrder } from "../store/orders";
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const ProductList = ({
  orderId,
  productId,
  quantity,
  products,
  orderItem,
  updateTotalPrice,
  addOrSubtract,
  removeFromCart,
  loadOrderItems,
  cart,
}) => {
  async function add(event) {
    event.preventDefault();
    const product = products.find((product) => product.id === productId);
    try {
      await updateTotalPrice(
        {
          id: orderId,
          totalPrice: parseFloat(cart.totalPrice) + parseFloat(product.price),
        },
        () => {}
      );
      await addOrSubtract({
        orderId: orderId,
        productId: productId,
        quantity: quantity + 1,
      });
      await loadOrderItems();
    } catch (exception) {
      console.log(exception);
    }
  }

  async function subtract(event) {
    event.preventDefault();
    const product = products.find((product) => product.id === productId);
    try {
      if (quantity > 1) {
        await updateTotalPrice(
          {
            id: orderId,
            totalPrice: parseFloat(cart.totalPrice) - parseFloat(product.price),
          },
          () => {}
        );
        await addOrSubtract({
          orderId: orderId,
          productId: productId,
          quantity: quantity - 1,
        });
      } else {
        await updateTotalPrice(
          {
            id: orderId,
            totalPrice: parseFloat(cart.totalPrice) - parseFloat(product.price),
          },
          () => {}
        );
        removeFromCart({
          orderId: orderId,
          productId: productId,
        });
      }
      await loadOrderItems();
    } catch (exception) {
      console.log(exception);
    }
  }

  async function destroy(event) {
    event.preventDefault();
    const product = products.find((product) => product.id === productId);
    try {
      await updateTotalPrice(
        {
          id: orderId,
          totalPrice:
            parseFloat(cart.totalPrice) - parseFloat(product.price * quantity),
        },
        () => {}
      );
      await removeFromCart({
        orderId: orderId,
        productId: productId,
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  const product = products.find((product) => product.id === productId);
  if (!product) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <Grid container justify="space-around" alignItems="center">
          <img className="cartItems" src={product.imageURL} />
          <Grid>
            <Typography variant="h6">{product.title}</Typography>
          </Grid>
          <Typography variant="h6">x {quantity}</Typography>
          <Grid>
            <Button variant="outlined" onClick={subtract} value="-">
              -
            </Button>
            <Button variant="outlined" onClick={add} value="+">
              +
            </Button>
          </Grid>
          <Typography variant="h6">${product.price * quantity}</Typography>
          <IconButton>
            <DeleteIcon onClick={destroy} />
          </IconButton>
        </Grid>
        <br />
      </div>
    );
  }
};

const mapStateToProps = ({ products, orderItems, orderItem, orders, user }) => {
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
    orderItems,
    orderItem,
    cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    addOrSubtract: (orderItem) => dispatch(updateOrderItem(orderItem)),
    removeFromCart: (orderItem) => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
