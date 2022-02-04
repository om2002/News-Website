import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">OP NEWS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item"><Link className={location.pathname === '/business' ? 'nav-link active' : 'nav-link'} to="/business">Business</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/entertainment' ? 'nav-link active' : 'nav-link'} to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/general' ? 'nav-link active' : 'nav-link'} to="/general">General</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/health' ? 'nav-link active' : 'nav-link'} to="/health">Health</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/science' ? 'nav-link active' : 'nav-link'} to="/science">Science</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/sports' ? 'nav-link active' : 'nav-link'} to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className={location.pathname === '/technology' ? 'nav-link active' : 'nav-link'} to="/technology">Technology</Link></li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
