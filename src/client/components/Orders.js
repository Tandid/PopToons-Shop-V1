import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import OrderCard from "./OrderCard";
import { getOrders } from "../store/orders";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Grid } from "@material-ui/core/";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "600px",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "2%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Orders = ({ fetchOrders, orders, user }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Grid>
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.center}>
          Order History
        </Typography>
        <br />
        <Grid>
          {orders
            .filter(
              (order) => order.userId === user.id && order.status !== "cart"
            )
            .map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
        </Grid>
      </Paper>
      <Footer title="Contact" description="Check out my portfolio here!" />
    </Grid>
  );
};

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
