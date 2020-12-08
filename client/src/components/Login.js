import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { authLogin } from "../store";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const LoginForm = ({
  handleSubmit,
  handleDemoUserLogin,
  handleDemoAdminLogin,
  error,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} name="login">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="space-evenly">
            <Button
              type="submit"
              onClick={handleDemoUserLogin}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Demo User Login
            </Button>
            <Button
              type="submit"
              onClick={handleDemoAdminLogin}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Demo Admin Login
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/google" variant="body2">
                Login with Google
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <Box mt={8} />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(ev) {
      ev.preventDefault();
      const email = ev.target.email.value;
      const password = ev.target.password.value;
      dispatch(authLogin(email, password));
    },

    handleDemoUserLogin(ev) {
      ev.preventDefault();
      const email = "jim@gmail.com";
      const password = "123";
      dispatch(authLogin(email, password));
    },

    handleDemoAdminLogin(ev) {
      ev.preventDefault();
      const email = "tandid@gmail.com";
      const password = "123";
      dispatch(authLogin(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
