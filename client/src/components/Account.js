import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";
import { Paper, Typography, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
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
  profileImage: {
    height: "500px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "flex-end",
  },
  profileInfo: {
    width: "70%",
  },
}));

const Account = ({ user, update, history }) => {
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [imageURL, setImageURL] = useState(user.imageURL ? user.imageURL : "");
  const [setError] = useState("");

  const classes = useStyles();

  useEffect(() => {
    console.log(firstName, lastName, email, imageURL);
  }, [firstName, lastName, email, imageURL]);
  async function onSubmit(event) {
    event.preventDefault();
    try {
      update(
        {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageURL: imageURL,
        },
        history.push
      );
    } catch (exception) {
      setError({ error: exception.response.data.message });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Typography className={classes.center} variant="h4">
          User Profile
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <img className={classes.profileImage} src={imageURL} alt={imageURL} />
          <br />
          <Grid className="profile">
            {user.admin === true && (
              <Grid container justify="space-evenly">
                <Button
                  variant="contained"
                  className="link-button"
                  href="/listings"
                  color="primary"
                >
                  Manage Products
                </Button>
                <Button
                  variant="contained"
                  className="link-button"
                  href="/userlist"
                >
                  Manage Users
                </Button>
                <Button
                  variant="contained"
                  className="link-button"
                  href="/orderlist"
                  color="primary"
                >
                  Manage Orders
                </Button>
              </Grid>
            )}
            <br />
            <Grid container direction="column" alignItems="center">
              <Typography variant="subtitle1" className={classes.text}>
                Status: {user.admin === true ? "Admin" : "User"}
              </Typography>
              <br />
              <Grid
                container
                justify="space-between"
                alignItem="center"
                className={classes.profileInfo}
              >
                <Typography variant="subtitle1" className={classes.text}>
                  First Name:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid
                container
                justify="space-between"
                className={classes.profileInfo}
              >
                <Typography variant="subtitle1" className={classes.text}>
                  Last Name:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid
                container
                justify="space-between"
                className={classes.profileInfo}
              >
                <Typography variant="subtitle1" className={classes.text}>
                  Email:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid
                container
                justify="space-between"
                className={classes.profileInfo}
              >
                <Typography variant="subtitle1" className={classes.text}>
                  imageURL:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={imageURL}
                  onChange={(event) => setImageURL(event.target.value)}
                />
              </Grid>
              <br />
              <Button
                variant="contained"
                onClick={onSubmit}
                color="secondary"
                disabled={
                  firstName === user.firstName &&
                  lastName === user.lastName &&
                  email === user.email &&
                  imageURL === user.imageURL
                }
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Footer title="Contact" description="Check out my portfolio here!" />
    </ThemeProvider>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (user, push) => dispatch(updateProfile(user, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
