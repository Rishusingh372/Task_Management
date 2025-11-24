import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    // Don't show header on login page
    if (location.pathname === '/login') {
        return null;
    }

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="logo-section" onClick={handleLogoClick}>
                    <div className="logo-icon">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <div className="logo-text">
                        <h1>TaskFlow</h1>
                        <span>Management System</span>
                    </div>
                </div>

                {/* Login Button - Only show if not on login page */}
                {location.pathname !== '/login' && (
                    <div className="header-actions">
                        <button 
                            className="login-btn"
                            onClick={handleLoginClick}
                        >
                            <i className="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;