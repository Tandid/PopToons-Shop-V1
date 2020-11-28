import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { updateOrder, createOrder } from "../store/orders";
import axios from "axios";
import { me } from "../store";

class Checkout extends Component {
  constructor(props) {
    let firstName = "";
    let lastName = "";
    let email = "";
    let address = "";
    if (props.user) {
      if (props.user.firstName) {
        firstName = props.user.firstName;
      }
      if (props.user.lastName) {
        lastName = props.user.lastName;
      }
      if (props.user.email) {
        email = props.user.email;
      }
      if (props.user.address) {
        address = props.user.address;
      }
    }
    super();
    this.state = {
      firstName,
      lastName,
      email,
      address,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToken = this.handleToken.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.firstName !== this.props.user.firstName &&
      this.props.user.firstName
    ) {
      this.setState({ firstName: this.props.user.firstName });
    }
    if (
      prevProps.user.lastName !== this.props.user.lastName &&
      this.props.user.lastName
    ) {
      this.setState({ lastName: this.props.user.lastName });
    }
    if (
      prevProps.user.email !== this.props.user.email &&
      this.props.user.email
    ) {
      this.setState({ email: this.props.user.email });
    }
    if (
      prevProps.user.address !== this.props.user.address &&
      this.props.user.address
    ) {
      this.setState({ address: this.props.user.address });
    }
  }

  async onSubmit() {
    try {
      await this.props.acceptOrder(
        {
          id: this.props.cart.id,
          status: "accepted",
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          address: this.state.address,
        },
        this.props.history.push
      );
      await this.props.createNewCart({
        userId: this.props.user.id
          ? this.props.user.id
          : localStorage.getItem("guestId"),
        status: "cart",
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async handleToken(token) {
    const response = await axios.post("/api/stripe/checkout", {
      token,
      order: this.props.cart,
    });

    const { status } = response.data;

    console.log(status);

    if (status === "success") {
      this.onSubmit();
    }
  }

  render() {
    const { onSubmit, handleToken } = this;
    const { firstName, lastName, email, address } = this.state;
    const { user, cart, orderItems, products } = this.props;
    if (!cart || !orderItems) {
      return <h1>Loading...</h1>;
    } else {
      const cartOrderItems = orderItems.filter(
        (orderItem) => orderItem.orderId === cart.id
      );
      return (
        <div className="form-wrapper">
          <form className="split" onSubmit={this.handleSubmit}>
            <div className="checkout-form">
              <h1>Shipping/Billing Information</h1>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
                placeholder="Address"
              />
              <div>
                <h1> Payment Method </h1>
                <Link className="link-button" to="/cart">
                  Edit Cart
                </Link>
              </div>
            </div>
            <div className="checkout-form">
              <h1> Items in Cart </h1>
              <div className="cart-container">
                <ul>
                  {cartOrderItems.map((orderItem) => (
                    <ProductList key={Math.random()} {...orderItem} />
                  ))}
                </ul>
              </div>
              <p>Total Price: ${parseFloat(cart.totalPrice).toFixed(2)}</p>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ user, orders, orderItems, products }) => {
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
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptOrder: (order, push) => dispatch(updateOrder(order, push)),
    createNewCart: (order) => dispatch(createOrder(order)),
    loadUser: () => dispatch(me()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
