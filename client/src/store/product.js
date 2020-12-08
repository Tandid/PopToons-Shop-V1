import axios from "axios";

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_DETAILS = "GET_DETAILS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({ type: GET_PRODUCTS, products });
const _getDetails = (product) => ({ type: GET_DETAILS, product });
const _createProduct = (product) => ({ type: CREATE_PRODUCT, product });
const _updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });
const _removeProduct = (id) => ({ type: REMOVE_PRODUCT, id });

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    dispatch(_getProducts(response.data));
  };
};

const getDetails = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/products/${id}`);
    dispatch(_getDetails(response.data));
  };
};

const createProduct = (product, push) => {
  return async (dispatch) => {
    const response = await axios.post("/api/products", product);
    dispatch(_createProduct(response.data));
    push("/listings");
  };
};

const updateProduct = (product, push) => {
  return async (dispatch) => {
    const { data: updatedProduct } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(_updateProduct(updatedProduct));
    push("/listings");
  };
};

const removeProduct = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${id}`);
    dispatch(_removeProduct(id));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const products = function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    case CREATE_PRODUCT:
      return [...state, action.product];

    case REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.id);

    case UPDATE_PRODUCT:
      state = state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
      return state;

    default:
      return state;
  }
};

const product = function (state = {}, action) {
  switch (action.type) {
    case GET_DETAILS:
      state = action.product;
      return state;

    case UPDATE_PRODUCT:
      state = action.product;
      return state;

    default:
      return state;
  }
};

export {
  products,
  product,
  getProducts,
  getDetails,
  createProduct,
  removeProduct,
  updateProduct,
};
