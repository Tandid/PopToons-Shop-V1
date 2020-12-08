import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { product } from "../store/product";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
  },
  green: { color: "green" },
  red: { color: "red" },
  orange: { color: "orange" },
  orderCard: {
    transition: "all ease 500ms",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
}));

const OrderCard = ({ id, status, totalPrice, orderItems, products }) => {
  const classes = useStyles();

  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justify="space-between">
            <Typography variant="h6" className={classes.heading}>
              ORDER #{id}
            </Typography>
            <Typography
              variant="h6"
              className={
                (status === "completed" && classes.green) ||
                (status === "processing" && classes.orange)
              }
            >
              {" "}
              {status.toUpperCase()}
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          <Grid>
            {orderItems
              .filter((orderItem) => orderItem.orderId === id)
              .map((orderItem) => (
                <div>
                  <Grid
                    className={classes.orderCard}
                    container
                    justify="space-around"
                    alignItems="center"
                  >
                    <img
                      className="orderItems"
                      alt="product img"
                      src={
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).imageURL
                      }
                    />
                    <Typography variant="body1">
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).title
                      }
                    </Typography>
                    <Typography variant="body1">
                      x {orderItem.quantity}
                    </Typography>
                    <Typography variant="body1">
                      $
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).price
                      }
                      .00
                    </Typography>
                  </Grid>
                  <br />
                </div>
              ))}
          </Grid>
          <Typography className={classes.center} variant="h6">
            Total Price: ${parseFloat(totalPrice).toFixed(2)}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
};

const mapStateToProps = ({ orderItems, products }) => {
  return { orderItems, products };
};

export default connect(mapStateToProps)(OrderCard);
