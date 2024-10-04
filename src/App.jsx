import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/ui/custom/Header.jsx';
import DashboardDetails from './dashboard/index.jsx';
import SalesDetails from './sales-details/index.jsx';
import Hero from './components/ui/custom/Hero.jsx';
function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Hero/>} /> 
                <Route path="/dashboard" element={<DashboardDetails />} />
                <Route path="/sales-details" element={<SalesDetails />} />
            </Routes>
        </div>
    );
}

export default App;
