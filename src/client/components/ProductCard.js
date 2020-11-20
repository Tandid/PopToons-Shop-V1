import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "23%",
    textAlign: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "80%",
    backgroundSize: "contain",
    backgroundPosition: "center",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const ProductCard = ({ id, title, imageURL, description, price }) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.root}>
      <CardMedia className={classes.media} image={imageURL} title={title} />
      <CardHeader title={title} subheader={description} />
      <CardContent>
        <Typography variant="body2" component="p">
          ${price}.00
        </Typography>
        <Button> View Product </Button>
        <Button> Add to Cart </Button>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(ProductCard);
