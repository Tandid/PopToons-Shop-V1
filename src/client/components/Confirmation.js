import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOrder } from "../store/orders";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";

const useStyles = makeStyles({
  root: {
    minHeight: "600px",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: "3%",
    marginBottom: "3%",
    padding: "2%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  receipt: {
    padding: "2%",
  },
});

const Confirmation = ({ match, products, order, orderItems, loadOrder }) => {
  const classes = useStyles();
  useEffect(() => {
    const orderId = match.params.id;
    loadOrder(orderId);
  }, []);

  if (!products.length || !order.id || !orderItems.length) {
    return <h1>Loading...</h1>;
  } else {
    const thisOrderItems = orderItems.filter(
      (orderItem) => orderItem.orderId === order.id
    );
    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Grid>
            <Typography variant="h5" className={classes.center}>
              Thank you for shopping with us!
            </Typography>
            <br />
            <Typography variant="body1" className={classes.center}>
              Products are expected to start shipping within 3-5 business days.
              You will receive an email confirmation soon with shipping and
              tracking details 😊
            </Typography>
            <br />
            <Typography variant="h5" className={classes.center}>
              Here is a summary of your order:
            </Typography>
            <br />
          </Grid>
          <Paper className={classes.receipt} key={Math.random()}>
            <Grid>
              <Typography>Order #: {order.id}</Typography>
              <Typography>Status: {order.status.toUpperCase()}</Typography>
            </Grid>
            <Grid>
              <ul>
                {thisOrderItems.map((orderItem) => (
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    key={Math.random()}
                  >
                    <Typography>x{orderItem.quantity}</Typography>
                    <Typography>
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).title
                      }
                    </Typography>

                    <Typography>
                      $
                      {
                        products.find(
                          (product) => product.id === orderItem.productId
                        ).price
                      }
                    </Typography>
                  </Grid>
                ))}
              </ul>
              <Typography>
                Total Price: ${parseFloat(order.totalPrice).toFixed(2)}
              </Typography>
            </Grid>
          </Paper>
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.center}
            href="/"
          >
            Continue Shopping
          </Button>
        </Paper>
      </ThemeProvider>
    );
  }
};

const mapStateToProps = ({ match, products, order, orderItems }) => {
  return {
    products,
    order,
    orderItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrder: (id) => dispatch(getOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
