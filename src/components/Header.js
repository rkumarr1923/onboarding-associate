import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';

/**
 * application header code
 */

const Header = ({ }) => {
    return (
        <header className='app-header'>
            <div>
                <Link to="/">
                    <span className='app-title'>
                        Onboarding Application
                    </span>
                </Link>

            </div>
            <div>
                <span className='logout'>
                    Logout
                </span>
            </div>
        </header>
    )
}

export default Header;