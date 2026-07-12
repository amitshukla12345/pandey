import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Car } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Brand & Intro */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <Car className="text-primary" size={28} />
            <span>Premium<span className="text-primary">Rides</span></span>
          </Link>
          <p className="footer-description">
            Reliable Taxi & Car Rental Service Across India. Comfortable, Safe & Affordable Travel for everyone.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/cars">Our Cars</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/services">Airport Pickup & Drop</Link></li>
            <li><Link to="/services">Local Taxi</Link></li>
            <li><Link to="/services">Outstation Trips</Link></li>
            <li><Link to="/services">Wedding Car Rental</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <MapPin className="text-primary" size={20} />
              <span>Lodha crown orchid k911 khuni taloja road dombivali est pin 421204</span>
            </li>
            <li>
              <Phone className="text-primary" size={20} />
              <a href="tel:+918369469197">+91 836 946 9197</a>
            </li>
            <li>
              <Mail className="text-primary" size={20} />
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=manojkumarpandey531@gmail.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>manojkumarpandey531@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Premium Rides. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
