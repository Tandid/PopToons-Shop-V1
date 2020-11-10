import React from 'react'
import {NavLink} from 'react-router-dom'

class Navbar extends React.Component {
    constructor() {
     super()
    }

    render() {
        return (
            <div>
                <nav>
                <NavLink to="/"> Home Page </NavLink>
                <NavLink to="/products"> Products </NavLink>
                <NavLink to="/cart"> Cart # </NavLink>
                <NavLink to="/orders"> Order History </NavLink>
                </nav>
            </div>
        )
    }
}

export default Navbar