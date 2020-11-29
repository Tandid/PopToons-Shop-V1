import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, removeProduct } from "../store";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "id", label: "Product ID", minWidth: 170 },
  { id: "firstName", label: "First Name", minWidth: 150 },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 170,
  },
  {
    id: "email",
    label: "Email Address",
    minWidth: 170,
  },
  {
    id: "admin",
    label: "Admin Status",
    minWidth: 150,
  },
  {
    id: "updateStatus",
    label: "Admin Status",
    minWidth: 150,
  },
  {
    id: "remove",
    label: "Remove User",
    minWidth: 170,
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

const UserList = ({ users, removeProduct }) => {
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
    <Paper className={classes.root}>
      <Typography className={classes.center} variant="h4">
        Manage Users
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                          {/* {column.id === "admin" && user.admin === true
                            ? "Admin"
                            : "User"} */}
                          {column.id === "updateStatus" && (
                            <IconButton>
                              <AddCircleIcon />
                            </IconButton>
                          )}
                          {column.id === "remove" && (
                            <IconButton>
                              <HighlightOffIcon
                              // onClick={removeProduct(prod.id)}
                              />
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (id) => dispatch(removeProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
