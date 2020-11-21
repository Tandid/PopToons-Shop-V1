import React from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";

class Cart extends React.Component {
  constructor() {
    super();
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount() {
    this.props.loadOrderItems();
  }

  render() {
    const { clearCart } = this;
    const { cart, orderItems } = this.props;
    if (!cart || !orderItems) {
      return <h1>Loading...</h1>;
    } else {
      const cartOrderItems = orderItems.filter(
        (orderItem) => orderItem.orderId === cart.id
      );

      return (
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <ul>
            {cartOrderItems.map((orderItem) => (
              <ProductList key={Math.random()} {...orderItem} />
            ))}
          </ul>
          <p>
            {" "}
            Total Price: ${Math.abs(
              parseFloat(cart.totalPrice).toFixed(2)
            )}{" "}
          </p>

          <button
            className="cart-button"
            onClick={clearCart}
            disabled={!cartOrderItems.length}
          >
            Clear Cart
          </button>
          <a href="/checkout">
            <button disabled={!cartOrderItems.length}>Checkout Page</button>
          </a>
        </div>
      );
    }
  }
}

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
  return {
    cart,
    orderItems,
    user,
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    removeFromCart: (orderItem) => dispatch(deleteOrderItem(orderItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
