import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />

            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage Inventory </Link>
                <p
                    style={{
                        display: 'inline',
                        color: 'white',
                    }}
                >
                    Welcome, {loggedInUser.name}
                </p>
                <button onClick={() => setLoggedInUser({})}> Sign out</button>
            </nav>
        </div>
    );
};

export default Header;
