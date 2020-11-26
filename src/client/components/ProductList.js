import React from "react";
import { connect } from "react-redux";
import {
  deleteOrderItem,
  updateOrderItem,
  getOrderItems,
} from "../store/orderItems";
import { updateOrder } from "../store/orders";

class ProductList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div> OrderItem</div>;
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
