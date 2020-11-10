import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {HomePage, Products, Cart, Orders} from './client/components/index'

class Routes extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
      </Switch>
    )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)