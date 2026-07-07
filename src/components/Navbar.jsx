import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar desktop-only">
        <div className="container top-bar-content">
          <div className="top-bar-contact">
            <Mail size={16} />
            <a href="mailto:manojkumarpandey531@gmail.com">manojkumarpandey531@gmail.com</a>
          </div>
          <div className="top-bar-social">
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
          </div>
        </div>
      </div>

      <div className="navbar container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <Car className="logo-icon" size={32} />
          <span>Premium<span className="text-primary">Rides</span></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
          <Link to="/cars" className={`nav-link ${isActive('/cars') ? 'active' : ''}`}>Our Cars</Link>
          <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>Gallery</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
        </nav>

        <a href="tel:+918369469197" className="btn btn-primary desktop-only">
          Call Now
        </a>

        {/* Mobile Menu Button */}
        <button className="mobile-toggle mobile-only" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
          <Link to="/cars" className="nav-link" onClick={closeMenu}>Our Cars</Link>
          <Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link>
          <Link to="/gallery" className="nav-link" onClick={closeMenu}>Gallery</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          <a href="tel:+918369469197" className="btn btn-primary mobile-call-btn">
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
