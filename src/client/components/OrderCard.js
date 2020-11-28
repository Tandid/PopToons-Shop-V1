import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { product } from "../store/orders";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const OrderCard = ({ id, status, totalPrice, orderItems, products }) => {
  const classes = useStyles();

  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="order-card-wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Order #{id} / {status}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
};

const mapStateToProps = ({ orderItems, products }) => {
  return { orderItems, products };
};

export default connect(mapStateToProps)(OrderCard);
