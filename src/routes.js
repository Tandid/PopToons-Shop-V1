import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter, Route, Switch } from "react-router-dom";
import { HomePage, Products, Cart, Orders } from "./client/components/index";
// import { Login, Signup, UserHome } from "./components";
import { me, getProducts } from "./client/store";

class Routes extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getProducts());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
