import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a 
        href="https://wa.me/918369469197" 
        target="_blank" 
        rel="noreferrer"
        className="float-btn whatsapp-btn"
        aria-label="WhatsApp Us"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href="tel:+918369469197" 
        className="float-btn call-btn"
        aria-label="Call Us"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

export default FloatingButtons;
