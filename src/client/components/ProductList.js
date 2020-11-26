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

class ProductList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { orderId, productId, quantity, products, orderItem } = this.props;
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
              <Button variant="outlined" value="-">
                -
              </Button>
              <Button variant="outlined" value="+">
                +
              </Button>
            </Grid>
            <Typography variant="h6">${product.price * quantity}</Typography>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <br />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ products, orderItems, orderItem }) => {
  return {
    products,
    orderItems,
    orderItem,
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
