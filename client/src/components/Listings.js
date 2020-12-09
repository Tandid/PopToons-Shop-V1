import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, removeProduct } from "../store";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import EditIcon from "@material-ui/icons/Edit";
import theme from "../theme";
const columns = [
  { id: "id", label: "Product ID", minWidth: 170 },
  { id: "title", label: "Product Title", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price ($)",
    minWidth: 170,
    align: "left",
  },
  {
    id: "edit",
    label: "Edit Product",
    minWidth: 170,
    align: "right",
  },
  {
    id: "remove",
    label: "Remove Product",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
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
  container: {
    maxHeight: 520,
  },
});

const Listings = ({ products, removeProduct }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {}, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Typography className={classes.center} variant="h4">
          Manage Products
        </Typography>
        <br />
        <Button
          className={classes.center}
          color="secondary"
          href="/newProduct"
          variant="contained"
        >
          {/* <AddCircleIcon /> */}Add New Listing
        </Button>
        <br />
        <TableContainer className={classes.container}>
          <Table Listings>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((prod) => {
                  return (
                    <TableRow hover tabIndex={-1} key={prod.id}>
                      {columns.map((column) => {
                        const value = prod[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                            {column.id === "edit" && (
                              <IconButton
                                color="secondary"
                                href={`/products/${prod.id}/edit`}
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                            {column.id === "remove" && (
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  removeProduct(prod.id);
                                }}
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ products }) => {
  return { products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (id) => dispatch(removeProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
