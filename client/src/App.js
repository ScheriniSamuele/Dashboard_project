import './Styles/App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import pages
import AnimatedRoutes from './AnimatedRoutes';

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
