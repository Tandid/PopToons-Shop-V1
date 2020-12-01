import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import {
  HomePage,
  Products,
  Cart,
  Orders,
  LoginForm,
  SignupForm,
  Checkout,
  Confirmation,
  Account,
  Listings,
  UserList,
  OrderListing,
  AddProduct,
  EditProduct,
} from "./client/components/index";
import { me, getProducts, getUsers } from "./client/store";
import {
  getOrderItems,
  orderItems,
  deleteOrderItem,
  createOrderItem,
  updateOrderItem,
} from "./client/store/orderItems";
import { getOrders, createOrder, updateOrder } from "./client/store/orders";
import { useHistory } from "react-router-dom";
import { createUser } from "./client/store/user";
import { v4 as uuidv4 } from "uuid";

class Routes extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.id && !localStorage.guestId) {
      this.createGuestUser();
    }

    if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
      this.mergeCart();
    }
  }

  async createGuestUser() {
    const guestId = await uuidv4();
    await localStorage.setItem("guestId", guestId);
    await this.props.createUser({ id: guestId });
    await this.props.createGuestCart({ userId: guestId });
  }

  async mergeCart() {
    await this.props.loadUser();
    await this.props.loadOrders();

    const { orders, orderItems, user, products } = this.props;

    const userCart = await orders.find(
      (order) => order.userId === user.id && order.status === "cart"
    );

    const guestCart = await orders.find(
      (order) =>
        order.userId === localStorage.getItem("guestId") &&
        order.status === "cart"
    );

    const userOrderItems = await orderItems.filter(
      (orderItem) => orderItem.orderId === userCart.id
    );

    const guestOrderItems = await orderItems.filter(
      (orderItem) => orderItem.orderId === guestCart.id
    );

    let guestOrderItemsPrice = 0;
    await guestOrderItems.forEach((guestOrderItem) => {
      guestOrderItemsPrice =
        guestOrderItemsPrice +
        parseFloat(
          products.find((product) => product.id === guestOrderItem.productId)
            .price
        ) *
          guestOrderItem.quantity;

      const existingOrderItem = userOrderItems.find(
        (userOrderItem) =>
          userOrderItem.productId === guestOrderItem.productId &&
          userOrderItem.orderId === userCart.id
      );

      if (!existingOrderItem) {
        this.props.newOrderItem({
          productId: guestOrderItem.productId,
          orderId: userCart.id,
          quantity: guestOrderItem.quantity,
        });
      } else {
        this.props.incrementOrderItem({
          productId: guestOrderItem.productId,
          orderId: userCart.id,
          quantity: existingOrderItem.quantity + guestOrderItem.quantity,
        });
      }
    });

    await this.props.updateTotalPrice(
      {
        id: guestCart.id,
        totalPrice: 0,
      },
      () => {}
    );

    await this.props.updateTotalPrice(
      {
        id: userCart.id,
        totalPrice:
          parseFloat(userCart.totalPrice) + parseFloat(guestOrderItemsPrice),
      },
      () => {}
    );

    await guestOrderItems.forEach((orderItem) =>
      this.props.removeFromGuestCart(orderItem)
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    const { user } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route exact path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation/:id" component={Confirmation} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/account" component={Account} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/orderlist" component={OrderListing} />
            <Route exact path="/products/:id/edit" component={EditProduct} />
            <Route exact path="/newProduct" component={AddProduct} />
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* {user.admin == true && <Switch />} */}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    products: state.products,
    orders: state.orders,
    orderItems: state.orderItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getProducts());
      dispatch(getUsers());
      dispatch(getOrders());
      dispatch(getOrderItems());
    },
    createUser: (user) => dispatch(createUser(user)),
    createGuestCart: (order) => dispatch(createOrder(order)),
    removeFromGuestCart: (orderItem) => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
    newOrderItem: (orderItem) => dispatch(createOrderItem(orderItem)),
    incrementOrderItem: (orderItem) => dispatch(updateOrderItem(orderItem)),
    loadUser: () => dispatch(me()),
    loadOrders: () => dispatch(getOrders()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
