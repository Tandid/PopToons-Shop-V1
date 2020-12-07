import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { me } from "../store/user";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
  },
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  blue: theme.palette.blue,
  nav: {
    zIndex: "9999",
  },
  tab: {
    color: "white",
    fontWeight: "bold",
    transition: "all ease 300ms",
    "&:hover": {
      transform: "scale(1.10)",
    },
  },
  logo: {
    color: "white",
    fontWeight: "bold",
    transition: "all ease 300ms",
    "&:hover": {
      transform: "scale(1.10)",
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 15,
    border: `2px solid ${theme.palette.blue}`,
    color: theme.palette.blue,
    padding: "0 4px",
  },
}))(Badge);

const Navbar = ({ handleClick, isLoggedIn, cartOrderItems, user }) => {
  const classes = useStyles();
  const cartTotal = cartOrderItems.length
    ? cartOrderItems.reduce((val, prod) => {
        return (val += prod.quantity);
      }, 0)
    : 0;

  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Grid container justify="space-between">
            <Link
              className={classes.logo}
              // label="Funko Pop Shop"
              // component={Link}
              to="/"
            >
              <img className="logo" src="images/logo.png" alt="logo" />
            </Link>
            <Grid className={classes.root} justify="space-around">
              <Tab
                className={classes.tab}
                label="Products"
                component={Link}
                to="/products"
                disableRipple="true"
              />
              {isLoggedIn && (
                <Tab
                  className={classes.tab}
                  label="Order History"
                  component={Link}
                  to="/orders"
                  disableRipple="true"
                />
              )}

              <IconButton
                className={classes.tab}
                component={Link}
                to="/cart"
                aria-label="cart"
                disableRipple="true"
              >
                <StyledBadge
                  badgeContent={cartTotal ? cartTotal : "0"}
                  color="secondary"
                >
                  <ShoppingCartIcon color="white" />
                </StyledBadge>
              </IconButton>
              <Tab
                disableRipple="true"
                className={classes.tab}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                label={isLoggedIn ? `Hello, ${user.firstName}` : `Hello, Guest`}
              />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    {isLoggedIn ? (
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            onKeyDown={handleListKeyDown}
                            className={classes.menuList}
                          >
                            <MenuItem
                              onClick={handleClose}
                              component="a"
                              href="/account"
                            >
                              Account
                            </MenuItem>
                            <MenuItem
                              onClick={handleClick}
                              component="a"
                              href="/login"
                            >
                              Log Out
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    ) : (
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={handleClose}
                              component="a"
                              href="/login"
                            >
                              Log In
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}
                              component="a"
                              href="/signup"
                            >
                              Sign Up
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    )}
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

const mapState = ({ user, orders, orderItems }) => {
  const cart = user.id
    ? orders.find(
        (order) => order.status === "cart" && order.userId === user.id
      )
    : orders.find(
        (order) =>
          order.status === "cart" &&
          order.userId === localStorage.getItem("guestId")
      );

  const cartOrderItems = cart
    ? orderItems.filter((orderItem) => orderItem.orderId === cart.id)
    : 0;

  return {
    isLoggedIn: !!user.id,
    name: user.name,
    cart,
    orderItems,
    user,
    cartOrderItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(me());
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
