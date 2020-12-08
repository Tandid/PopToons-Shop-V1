import React from "react";
import { connect } from "react-redux";
import { updateOrder } from "../store/orders";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/Button";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import theme from "../theme";
const columns = [
  { id: "id", label: "Order #", minWidth: 150 },
  {
    id: "firstName",
    label: "First Name",
    minWidth: 150,
  },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 150,
    align: "left",
  },
  {
    id: "email",
    label: "Email Address",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Order Status",
    minWidth: 150,
  },
  {
    id: "completeOrder",
    label: "Complete Order",
    minWidth: 150,
  },
  {
    id: "cancelOrder",
    label: "Cancel Order",
    minWidth: 150,
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
  green: {
    color: "green",
  },
});

const OrderListing = ({
  products,
  users,
  orders,
  orderItems,

  updateOrder,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          Manage Orders
        </Typography>
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  return (
                    <TableRow hover tabIndex={-1} key={order.id}>
                      {columns.map((column) => {
                        const value = order[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                            {column.id === "completeOrder" && (
                              <IconButton
                                className={classes.green}
                                disabled={order.status !== "processing"}
                                onClick={() =>
                                  updateOrder(
                                    {
                                      id: order.id,
                                      status: "completed",
                                    },
                                    () => {}
                                  )
                                }
                              >
                                <AssignmentTurnedInIcon />
                              </IconButton>
                            )}
                            {column.id === "cancelOrder" && (
                              <IconButton
                                color="primary"
                                disabled={order.status !== "processing"}
                                onClick={() =>
                                  updateOrder(
                                    {
                                      id: order.id,
                                      status: "canceled",
                                    },
                                    () => {}
                                  )
                                }
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ products, users, orders, orderItems }) => {
  return { products, users, orders, orderItems };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (order, push) => dispatch(updateOrder(order, push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListing);
