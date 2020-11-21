// import React from "react";
// import { connect } from "react-redux";
// import { auth } from "../store";
// // import {createOrder} from '../store/orders'

// /**
//  * COMPONENT
//  */
// class AuthForm extends React.Component {
//   constructor() {
//     super();
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     const formName = event.target.name;
//     const email = event.target.email.value;
//     const password = event.target.password.value;
//     await this.props.loginOrSignup(email, password, formName);
//     // await this.props.loadUser()
//     // if (formName === "signup") {
//     //   await this.props.createCart({ userId: this.props.user.id });
//     // }
//   }

//   render() {
//     const { handleSubmit } = this;
//     const { name, displayName, error } = this.props;

//     return (
//       <div className="auth-form-wrapper">
//         <form className="auth-form" onSubmit={handleSubmit} name={name}>
//           <div>
//             <large>Email: </large>
//             <input name="email" type="text" />
//           </div>
//           <div>
//             <large>Password: </large>
//             <input name="password" type="password" />
//           </div>
//           <div>
//             <button type="submit">{displayName}</button>
//           </div>
//           {error && error.response && <div> {error.response.data} </div>}
//           <a className="Oauth" href="/auth/google">
//             {displayName} with Google
//           </a>
//         </form>
//       </div>
//     );
//   }
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = ({ user }) => {
//   return {
//     name: "login",
//     displayName: "Login",
//     error: user.error,
//   };
// };

// const mapSignup = ({ user }) => {
//   return {
//     name: "signup",
//     displayName: "Sign Up",
//     error: user.error,
//     user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // handleSubmit(evt) {
//     //   evt.preventDefault()
//     //   const formName = evt.target.name
//     //   const email = evt.target.email.value
//     //   const password = evt.target.password.value
//     // dispatch(auth(email, password, formName))
//     // },
//     loginOrSignup: (email, password, formName) =>
//       dispatch(auth(email, password, formName)),
//     // loadUser: () => dispatch(me()),
//     // createCart: order => dispatch(createOrder(order))
//   };
// };

// export const Login = connect(mapLogin, mapDispatchToProps)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatchToProps)(AuthForm);
