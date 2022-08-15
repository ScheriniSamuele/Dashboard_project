import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const NavbarLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='user-main-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default NavbarLayout;
