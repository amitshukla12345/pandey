import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import './Navbar.css';
import WhatsAppIcon from './WhatsAppIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar-wrapper">
      {/* Top Bar */}
      <div className="top-bar desktop-only">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <Clock size={16} className="text-primary" />
              <span>24/7 Customer Support</span>
            </div>
            <div className="top-bar-item">
              <Mail size={16} className="text-primary" />
              <a href="mailto:info@shuklatravels.in">info@shuklatravels.in</a>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-item font-bold">
              <Phone size={16} className="text-primary" />
              <a href="tel:+918369469197">+91 83694 69197</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon-premium">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2.5"/>
                <path d="M9.5 17h5"/>
                <circle cx="17" cy="17" r="2.5"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-primary">PANDEY</span>
              <span className="logo-secondary">TRAVELS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="nav-links desktop-only">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
            <Link to="/cars" className={`nav-link ${isActive('/cars') ? 'active' : ''}`}>Our Cars</Link>
            <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
            <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>Gallery</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact Us</Link>
          </nav>

          {/* CTA Button */}
          <div className="navbar-cta desktop-only">
            <a href="https://wa.me/918369469197" target="_blank" rel="noreferrer" className="btn btn-primary btn-booking">
              Book Now <WhatsAppIcon size={18} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle mobile-only" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav className="mobile-nav-links">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>About Us</Link>
            <Link to="/cars" className={`mobile-nav-link ${isActive('/cars') ? 'active' : ''}`} onClick={closeMenu}>Our Cars</Link>
            <Link to="/services" className={`mobile-nav-link ${isActive('/services') ? 'active' : ''}`} onClick={closeMenu}>Services</Link>
            <Link to="/gallery" className={`mobile-nav-link ${isActive('/gallery') ? 'active' : ''}`} onClick={closeMenu}>Gallery</Link>
            <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>Contact Us</Link>
          </nav>
          <div className="mobile-menu-footer">
            <a href="https://wa.me/918369469197" target="_blank" rel="noreferrer" className="btn btn-primary justify-center">
              Book on WhatsApp <WhatsAppIcon size={20} />
            </a>
            <a href="tel:+918369469197" className="btn btn-outline justify-center">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
