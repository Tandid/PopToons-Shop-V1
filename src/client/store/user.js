import axios from "axios";
import history from "../../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER"; //For user to access their own information
const GET_USERS = "GET_USERS"; //To keep track of all users
const REMOVE_USER = "REMOVE_USER"; //Allows admins to delete user profiles
const UPDATE_USER = "UPDATE_USER"; //Allows admins to update user's profiles, change them to admin etc
const CREATE_USER = "CREATE_USER"; //Allows admins to create new users
const UPDATE_PROFILE = "UPDATE_PROFILE"; //Allows users to update their own profiles

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const _getUser = (user) => ({ type: GET_USER, user });
const _getUsers = (user) => ({ type: GET_USERS, users });
const _removeUser = (id) => ({ type: REMOVE_USER, id });
const _updateUser = (user) => ({ type: UPDATE_USER, user });
const _createUser = (user) => ({ type: CREATE_USER, user });
const _updateProfile = (user) => ({ type: UPDATE_PROFILE, user });

/**
 * THUNK CREATORS
 */

const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(_getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("api/users");
    dispatch(_getUsers(response.data));
  };
};

const removeUser = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${id}`);
    dispatch(_removeUser(id));
  };
};

const updateUser = (user) => {
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(
      `/api/users/${user.id}`,
      user
    );
    dispatch(_updateUser(updatedUser));
  };
};

const updateProfile = (user, push) => {
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(
      `/api/users/${user.id}`,
      user
    );
    dispatch(_updateProfile(updatedUser));
    push("/account");
  };
};

const createUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post("/api/users", user);
    dispatch(_createUser(response.data));
  };
};

const authLogin = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("/auth/login", {
      email,
      password,
    });
  } catch (authError) {
    return dispatch(_getUser({ error: authError }));
  }

  try {
    dispatch(_getUser(res.data));
    history.push("/");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

const authSignup = (email, password, firstName, lastName, isTeacher) => async (
  dispatch
) => {
  let res;
  try {
    res = await axios.post("/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      isTeacher,
    });
  } catch (authError) {
    return dispatch(_getUser({ error: authError }));
  }

  try {
    dispatch(_getUser(res.data));
    history.push("/");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(_removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return state;
    case UPDATE_PROFILE:
      return action.user;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    case CREATE_USER:
      return [...state, action.user];

    case UPDATE_USER:
      state = state.map((user) =>
        user.id === action.user.id ? action.user : user
      );

    case REMOVE_USER:
      return state.filter((user) => user.id !== action.id);

    default:
      return state;
  }
};

export {
  me,
  getUsers,
  updateUser,
  removeUser,
  createUser,
  updateProfile,
  authLogin,
  authSignup,
  logout,
  user,
  users,
};
