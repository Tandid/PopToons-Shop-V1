import React from "react";
import { connect } from "react-redux";
import OrderCard from "./OrderCard";
import { getOrders } from "../store/orders";

class Orders extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, user } = this.props;
    return (
      <div>
        <h1>Order History</h1>
        {orders
          .filter(
            (order) => order.userId === user.id && order.status !== "cart"
          )
          .map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ orders, user }) => {
  return {
    orders,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => {
      dispatch(getOrders());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
