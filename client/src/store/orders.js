import axios from "axios";

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDERS = "GET_ORDERS";
const GET_ORDER = "GET_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";
const CREATE_ORDER = "CREATE_ORDER";

/**
 * INITIAL STATE --------------------------------------------------
 */
// const initialState = {
//   userOrder: {}
// }

/**
 * ACTION CREATORS
 */
const _getOrders = (orders) => ({ type: GET_ORDERS, orders });
const _getOrder = (order) => ({ type: GET_ORDER, order });
const _updateOrder = (order) => ({ type: UPDATE_ORDER, order });
const _createOrder = (order) => ({ type: CREATE_ORDER, order });

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrders = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/orders`);
    dispatch(_getOrders(response.data));
  };
};

const getOrder = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/orders/${id}`);
    dispatch(_getOrder(response.data));
  };
};

const updateOrder = (order, push) => {
  return async (dispatch) => {
    const { data: updatedOrder } = await axios.put(
      `/api/orders/${order.id}`,
      order
    );
    dispatch(_updateOrder(updatedOrder));
    push(`/confirmation/${order.id}`);
  };
};

const createOrder = (order) => {
  return async (dispatch) => {
    const response = await axios.post("/api/orders", order);
    dispatch(_createOrder(response.data));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const orders = function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;

    case UPDATE_ORDER:
      state = state.map((order) =>
        order.id === action.order.id ? action.order : order
      );
      return state;

    case CREATE_ORDER:
      state = [...state, action.order];
      return state;

    default:
      return state;
  }
};

const order = function (state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;

    default:
      return state;
  }
};

export { orders, order, getOrders, getOrder, updateOrder, createOrder };
