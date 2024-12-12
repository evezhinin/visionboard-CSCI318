import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToken } from '../../context/TokenContext';
import './NavBar.css';

const NavBar = () => {
  const { tokenContext, setTokenContext } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  // Set active tab based on current location
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setTokenContext(''); 
    setActiveTab(''); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-text">
          <Link to={'/'} onClick={() => setActiveTab('/')}>
            <h1>VisionScape</h1>
          </Link>
        </div>
        <div className="nav-content">
          <div className="tabs">
            <Link to={'/'} onClick={() => setActiveTab('/')}>
              <div className={activeTab === '/' ? 'active-tab' : ''}>Home</div>
            </Link>
            <Link to={'/communityhub'} onClick={() => setActiveTab('/communityhub')}>
              <div className={activeTab === '/communityhub' ? 'active-tab' : ''}>CommunityHub</div>
            </Link>
            <Link to={'/vision-board'} onClick={() => setActiveTab('/vision-board')}>
              <div className={activeTab === '/vision-board' ? 'active-tab' : ''}>Vision Board</div>
            </Link>
            <Link to={'/make-it-happen'} onClick={() => setActiveTab('/make-it-happen')}>
              <div className={activeTab === '/make-it-happen' ? 'active-tab' : ''}>MakeItHappen</div>
            </Link>
            <Link to={'/visionbuddy'} onClick={() => setActiveTab('/visionbuddy')}>
              <div className={activeTab === '/visionbuddy' ? 'active-tab' : ''}>VisionBuddies</div>
            </Link>
         

          </div>
          <div className="buttons">
            {!tokenContext ? (
              <>
                <Link to={'/login'}>
                  <button onClick={() => setActiveTab('/login')}>Log in</button>
                </Link>
                <Link to={'/register'}>
                  <button onClick={() => setActiveTab('/register')}>Register</button>
                </Link>
              </>
            ) : (
              <div className="logged-in">
                <button className="logout" onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
