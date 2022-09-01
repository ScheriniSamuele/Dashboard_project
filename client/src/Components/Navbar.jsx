import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import '../Styles/Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <ul className='navbar-menu'>
                <span className='invisible'>
                    <li className='logo'>Poli Dash</li>
                </span>
                <Link to='/' className='navbar-menu-link'>
                    <li className='navbar-menu-item'>
                        <Icon className='navbar-menu-icon' icon='bxs:dashboard' color='white' />
                        <span className='invisible'>Dashboard</span>
                    </li>
                </Link>
                <Link to='/cost' className='navbar-menu-link'>
                    <li className='navbar-menu-item'>
                        <Icon className='navbar-menu-icon' icon='bi:currency-dollar' color='white' />
                        <span className='invisible'>Costs</span>
                    </li>
                </Link>
                <Link to='/contracts' className='navbar-menu-link'>
                    <li className='navbar-menu-item'>
                        <Icon className='navbar-menu-icon' icon='teenyicons:contract-outline' color='white' />
                        <span className='invisible'>Contracts</span>
                    </li>
                </Link>
                <Link to='/documentation' className='navbar-menu-link'>
                    <li className='navbar-menu-item'>
                        <Icon className='navbar-menu-icon' icon='fluent:document-16-filled' color='white' />
                        <span className='invisible'>Documentation</span>
                    </li>
                </Link>
                <Link to='/settings' className='navbar-menu-link'>
                    <li className='navbar-menu-item'>
                        <Icon className='navbar-menu-icon' icon='akar-icons:settings-horizontal' color='white' />
                        <span className='invisible'>Settings</span>
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
