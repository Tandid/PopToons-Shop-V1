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
                <NavLink to="/"> FunkoPop </NavLink>
                </nav>
            </div>
        )
    }
}

export default Navbar