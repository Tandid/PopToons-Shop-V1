import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { product } from "../store/orders";

const OrderCard = ({ id, status, totalPrice, orderItems, products }) => {
  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="order-card-wrapper">
        <h4>
          Order #{id} / {status}
        </h4>
        <ul className="order-card" key={Math.random()}>
          <div>
            <ul>
              {orderItems
                .filter((orderItem) => orderItem.orderId === id)
                .map((orderItem) => (
                  <div className="order-card-items" key={Math.random()}>
                    <li>X{orderItem.quantity}</li>
                    <li>
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).title
                      }
                    </li>

                    <li>
                      $
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).price
                      }
                    </li>
                  </div>
                ))}
            </ul>
            <div className="total">
              Total Price: ${parseFloat(totalPrice).toFixed(2)}
            </div>
          </div>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = ({ orderItems, products }) => {
  return { orderItems, products };
};

export default connect(mapStateToProps)(OrderCard);
