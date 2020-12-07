import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { updateOrder, createOrder } from "../store/orders";
import axios from "axios";
import { me } from "../store";
import StripeCheckout from "react-stripe-checkout";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Footer from "./Footer";
import theme from "../theme";

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
  leftContainer: {
    padding: "2%",
    width: "60%",
  },
  overflow: {
    overflow: "scroll",
    maxHeight: "400px",
  },
  rightContainer: {
    minHeight: "500px",
    padding: "2%",
    width: "40%",
  },
}));

const Checkout = ({
  user,
  cart,
  orderItems,
  products,
  acceptOrder,
  createNewCart,
  handleChange,
  loadUser,
  history,
}) => {
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [address, setAddress] = useState(user.address ? user.address : "");

  const classes = useStyles();

  useEffect(
    (prevProps) => {
      loadUser();
      console.log(firstName, lastName, email, address);
    },
    [firstName, lastName, email, address]
  );

  async function onSubmit() {
    try {
      await acceptOrder(
        {
          id: cart.id,
          status: "processing",
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
        },
        history.push
      );
      await createNewCart({
        userId: user.id ? user.id : localStorage.getItem("guestId"),
        status: "in-cart",
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  // async function handleChange(ev) {
  //   this.setState({
  //     [ev.target.name]: ev.target.value,
  //   });
  // }

  async function handleToken(token) {
    const response = await axios.post("/api/stripe/checkout", {
      token,
      order: cart,
    });

    const { status } = response.data;

    console.log(status);

    if (status === "success") {
      onSubmit();
    }
  }

  if (!cart || !orderItems) {
    return <h1>Loading...</h1>;
  } else {
    const cartOrderItems = orderItems.filter(
      (orderItem) => orderItem.orderId === cart.id
    );
    return (
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          {/* <form onSubmit={onSubmit}> */}
          <Grid container direction="row" justify="space-evenly">
            <div className={classes.leftContainer}>
              <Typography className={classes.center} variant="h4">
                Items in Cart
              </Typography>
              <Grid className={classes.overflow}>
                {cartOrderItems.map((orderItem) => (
                  <ProductList key={Math.random()} {...orderItem} />
                ))}
              </Grid>
            </div>
            <Paper className={classes.rightContainer}>
              <Typography className={classes.center} variant="h4">
                Shipping/Billing
              </Typography>
              <br />
              <Grid container direction="column">
                <TextField
                  size="small"
                  variant="outlined"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  label="First Name"
                />
                <br />
                <TextField
                  size="small"
                  variant="outlined"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  label="Last Name"
                />
                <br />
                <TextField
                  size="small"
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  label="Email"
                />
                <br />
                <TextField
                  size="small"
                  variant="outlined"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  label="Address"
                />
                <br />
                <Typography className={classes.center} variant="h4">
                  Payment Method{" "}
                </Typography>
                <br />
                <Typography className={classes.center}>
                  Total Price: ${parseFloat(cart.totalPrice).toFixed(2)}
                </Typography>
                <br />
                <Grid align="center">
                  <Button color="primary" variant="contained" href="/cart">
                    Edit Cart
                  </Button>
                  <StripeCheckout
                    stripeKey="pk_test_E1dVa6505p5SZc6KIGv6yrQB00yOT20RJM"
                    token={handleToken}
                    email={email}
                    amount={parseFloat(cart.totalPrice).toFixed(2) * 100}
                    onSubmit={onSubmit}
                  >
                    <Button
                      disabled={!firstName || !lastName || !email || !address}
                      color="secondary"
                      variant="contained"
                    >
                      PAY WITH CARD
                    </Button>
                  </StripeCheckout>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* </form> */}
        </Paper>
        <Footer title="Contact" description="Check out my portfolio here!" />
      </ThemeProvider>
    );
  }
};

const mapStateToProps = ({ user, orders, orderItems, products }) => {
  const cart = user.id
    ? orders.find(
        (order) => order.status === "in-cart" && order.userId === user.id
      )
    : orders.find(
        (order) =>
          order.status === "in-cart" &&
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
