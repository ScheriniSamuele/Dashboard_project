import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// import pages
import NavbarLayout from './Pages/NavbarLayout';
import Error404 from './Pages/Error404';
import Dashboard from './Pages/Dashboard';
import Cost from './Pages/Cost';
import Contracts from './Pages/Contracts';
import Documentation from './Pages/Documentation';
import Settings from './Pages/Settings';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<NavbarLayout />}>
                    <Route path='/' exact element={<Dashboard />} />
                    <Route path='/cost' exact element={<Cost />} />
                    <Route path='/contracts' exact element={<Contracts />} />
                    <Route path='/documentation' exact element={<Documentation />} />
                    <Route path='/settings' exact element={<Settings />} />
                </Route>
                <Route path='*' element={<Error404 />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
