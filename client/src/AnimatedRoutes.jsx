import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// import pages
import NavbarLayout from './Pages/NavbarLayout';
import Error404 from './Pages/Error404';
//import Dashboard from './Pages/Dashboard';
//import Cost from './Pages/Cost';
//import Documentation from './Pages/Documentation';
import Settings from './Pages/Settings';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<NavbarLayout />}>
                    <Route path='/settings' exact element={<Settings />} />
                </Route>
                <Route path='*' element={<Error404 />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
