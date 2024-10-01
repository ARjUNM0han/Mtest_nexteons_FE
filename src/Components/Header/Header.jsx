import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>

            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <a className="navbar-brand" href="#">
                            <i className="fa-solid fa-magnet me-2"
                                height={20} />
                            <small> User Blog Mng</small>
                        </a>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/home'} >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/my-blogs'}>
                                        My Blog Posts
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                {/* <button className='btn'>logout</button> */}
                            </div>
                        </div>
                    </div>
                </nav>

            </>

        </>

    )
}

export default Header