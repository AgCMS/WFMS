import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OfficerAuth from './components/OfficerAuth';
import OfficerDashboard from './components/OfficerDashboard';
import authService from './services/authService';
import Header from './components/Header';

function App() {
  const isAuthenticated = () => {
    const token = authService.getToken();
    return token ? true : false;
  };

  return (
    <div className="App">
     
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/auth" element={<OfficerAuth />} />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <OfficerDashboard /> : <Navigate to="/auth" />}
          />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
