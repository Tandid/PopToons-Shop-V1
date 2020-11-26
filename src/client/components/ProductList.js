import React from "react";
import { connect } from "react-redux";
import {
  deleteOrderItem,
  updateOrderItem,
  getOrderItems,
} from "../store/orderItems";
import { updateOrder } from "../store/orders";
import { Grid, Button } from "@material-ui/core";

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
              <p>{product.title}</p>
            </Grid>
            <p>x {quantity}</p>
            <Grid>
              <Button value="-">-</Button>
              <Button value="+">+</Button>
            </Grid>
            <p>${product.price * quantity}</p>
            <Button>Remove From Cart</Button>
          </Grid>
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
