import React from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { deleteOrderItem, getOrderItems } from "../store/orderItems";
import { updateOrder } from "../store/orders";

class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadOrderItems();
  }

  render() {
    const { orderItems } = this.props;
    return (
      <div className="cart-wrapper">
        <h1>Cart</h1>
        <ul>
          {orderItems.map((orderItem) => (
            <ProductList key={Math.random()} {...orderItem} />
          ))}
        </ul>
      </div>
    );
  }
}

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
