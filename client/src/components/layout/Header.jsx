import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header id="header" role="banner">
                <div className="header1">
                    <h1>Joy AI</h1>
                    <nav className="nav">
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/list">List</Link></li>
                            <li><Link to="/write">Wirte</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='header2'>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/join">join</Link></li>
                        <li><Link to="/logout">Logout</Link></li>

                    </ul>
                </div>
            </header>
            <div className="banner">
            </div>
        </>
    )
}

export default Header