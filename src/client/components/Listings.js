import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, removeProduct } from "../store";

// class Listings extends React.Component {
//   constructor() {
//     super();
//   }

// componentDidUpdate(prevProps) {
//   if (this.props.products.length !== prevProps.products.length) {
//     this.props.loadProducts()
//   }
// }

//   render() {
//     const { products } = this.props;
//     return (
//       <div className="wrapper">
//         <h2>Product Listings</h2>
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Inventory</th>
//                 <th>Edit Product</th>
//                 <th>Delete Product</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products &&
//                 products.map((product) => (
//                   <tr key={product.id}>
//                     <td>{product.id}</td>
//                     <td>
//                       <Link to={`/products/${product.id}`}>
//                         {product.title}
//                       </Link>
//                     </td>
//                     <td>{product.price}</td>
//                     <td>{product.inventory}</td>
//                     <td>
//                       <Link to={`/products/${product.id}/edit`}>Edit</Link>
//                     </td>
//                     <td>
//                       <button onClick={() => this.props.delete(product.id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div>
//           <Link className="link-button" to="/newProduct">
//             Add Product
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

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
  { id: "title", label: "Product Title", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
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

const Listings = ({ products }) => {
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
        Manage Products
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
                            <IconButton>
                              <AddCircleIcon />
                            </IconButton>
                          )}
                          {column.id === "remove" && (
                            <IconButton>
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
  );
};

const mapStateToProps = ({ products }) => {
  return { products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (id) => dispatch(removeProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
