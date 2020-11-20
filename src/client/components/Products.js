import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store";
import ProductCard from "./ProductCard.js";

class Products extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({
      category: ev.target.value,
    });
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <div>
          <ul>
            {products.map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, user }) => {
  return { products, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
