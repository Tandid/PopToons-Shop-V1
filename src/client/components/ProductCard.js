import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { id, title, imageURL, price } = this.props;

    return (
      <li key={id}>
        <h4>{title}</h4>
        <br />
        <img src={imageURL} />
        <p>${price}</p>
        <Link to={`/products/${id}`} className="productLink">
          More Details
        </Link>
      </li>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(ProductCard);
