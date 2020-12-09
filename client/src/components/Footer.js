import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Iconbutton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import GitHubIcon from "@material-ui/icons/GitHub";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "lightgrey",
    padding: theme.spacing(6, 0),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <ThemeProvider theme={theme}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
          <Grid container justify="center">
            <IconButton
              component={Link}
              href="https://www.linkedin.com/in/tandidalam/"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton component={Link} href="https://github.com/Tandid">
              <GitHubIcon />
            </IconButton>
          </Grid>
        </Container>
      </footer>
    </ThemeProvider>
  );
}
