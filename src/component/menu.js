import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogin } from '../js/LoginHandler';
import '../css/menu.css';
import Profile from './profile';
import { useState, useEffect } from 'react';


function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    var storedUser = JSON.parse(localStorage.getItem('user'))
    var storedIsLoggedIn = false;
    var storedIsAdmin = false;


    const [buttonProfile, setProfile] = useState(true);

    if (storedUser) {
        if (storedUser.email || storedUser.name) {
            storedIsLoggedIn = true;
            if (storedUser.is_admin) storedIsAdmin = true
        }
    }

    const {isLoggedIn, isAdmin, userName, login, logout} = useLogin();
    
    // Function to determine if a menu item is active
    const isMenuActive = (menuName) => {
      return location.pathname === `/${menuName}`;
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        logout();
        navigate('/')
    }

    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-header" id="dynamic-nav">
                <div className="container-fluid menu-container">
                    {isAdmin || storedIsAdmin ? (
                        <Link to="/admin" className="navbar-brand" href="#"><b>
                            <span>
                                <span className='span-h1'> 
                                    <span className='span'>Trip</span> <span className='span'>Wallet</span>
                                </span>
                            </span>
                        </b></Link>
                    ) : (
                        <Link to="/" className="navbar-brand" href="#"><b>
                            <span>
                                <span className='span-h1'>
                                    <span className='user'><b>Trip</b></span> <span className='user'><b>Wallet</b></span>
                                </span>
                            </span>
                        </b></Link>
                    )}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${isMenuActive('') ? 'active-menu' : ''}`} aria-current="page">
                                    <span className={`menuitem ${isMenuActive('') ? 'active-menu-span' : ''}`} data-menu-name="home"><b>Home</b></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/budget_analysis" className={`nav-link ${isMenuActive('budget_analysis') ? 'active-menu' : ''}`} aria-current="page">
                                    <span className={`menuitem ${isMenuActive('budget_analysis') ? 'active-menu-span' : ''}`} data-menu-name="budget_analysis"><b>Budget Analysis</b></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/recommendation" className={`nav-link ${isMenuActive('recommendation') ? 'active-menu' : ''}`} aria-current="page">
                                    <span className={`menuitem ${isMenuActive('recommendation') ? 'active-menu-span' : ''}`} data-menu-name="recommendation"><b>Recommendations</b></span>
                                </Link>
                            </li>
                            <li className={`nav-item ${!isLoggedIn ? 'nav-LOGIN-REGISTER' : 'nav-LOGGED-IN'}`}>
                                {isLoggedIn || storedIsLoggedIn ? (
                                        <Dropdown style={{ backgroundColor: 'black' }}>
                                            <Dropdown.Toggle variant="success" id="user-dropdown">
                                                <i className="fa fa-user" style={{ marginRight: '5px' }} /> {userName || storedUser.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {/* Add dropdown menu items here */}
                                                <Profile trigger={buttonProfile} setTrigger={setProfile}></Profile>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={handleLogout} className='nest-profile-logout'>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        <Link to="/login" className="nav-link" aria-current="page">
                                            <span className="login"><b>Login / Register</b></span>
                                        </Link>
                                    )
                                }
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Menu;