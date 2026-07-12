import React, { useEffect } from 'react';
import { Shield, Users, MapPin, Clock, HeadphonesIcon, CheckCircle2, BadgeCheck, Car, DollarSign } from 'lucide-react';
import './About.css';

const About = () => {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-page-container">
      {/* SECTION 1: ABOUT */}
      <section className="about-section-1 container">
        <div className="about-two-columns">
          {/* LEFT SIDE: Image */}
          <div className="about-image-wrapper animate-on-scroll fade-up">
            <img 
              src={`${import.meta.env.BASE_URL}images/Erti.png`} 
              alt="Premium Maruti Ertiga on scenic mountain highway" 
              className="about-hero-image"
            />
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="about-content-wrapper animate-on-scroll fade-up delay-1">
            <span className="about-label">ABOUT US</span>
            <h1 className="about-heading">About Premium Rides</h1>
            <h2 className="about-subheading">Your Trusted Travel Partner Across India</h2>
            
            <p className="about-description">
              Premium Rides provides safe, comfortable and affordable taxi services across India. We specialize in airport transfers, local rides, one-way trips, round trips and corporate travel with professional drivers and well-maintained vehicles.
            </p>

            <div className="about-features-list">
              <div className="feature-row">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <strong>Trusted Drivers</strong>
                  <p>Background verified and experienced chauffeurs.</p>
                </div>
              </div>
              <div className="feature-row">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <strong>Safe Journey</strong>
                  <p>Customer safety is always our priority.</p>
                </div>
              </div>
              <div className="feature-row">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <strong>Affordable Pricing</strong>
                  <p>Transparent pricing with no hidden charges.</p>
                </div>
              </div>
              <div className="feature-row">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <strong>24×7 Customer Support</strong>
                  <p>Available anytime for assistance.</p>
                </div>
              </div>
              <div className="feature-row">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <strong>Clean & Sanitized Cars</strong>
                  <p>Well maintained premium vehicles.</p>
                </div>
              </div>
            </div>

            <div className="about-buttons">
              <a href="https://wa.me/918369469197" target="_blank" rel="noreferrer" className="btn-premium-primary">
                Book Now
              </a>
              <a href="tel:+918369469197" className="btn-premium-secondary">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ACHIEVEMENTS */}
      <section className="about-section-2">
        <div className="container">
          <h2 className="section-center-heading animate-on-scroll fade-up">OUR ACHIEVEMENTS</h2>
          
          <div className="achievements-grid">
            <div className="stat-card animate-on-scroll fade-up delay-1">
              <div className="stat-icon-wrapper">
                <Users size={32} />
              </div>
              <h3>5000+</h3>
              <p>Happy Customers</p>
            </div>
            
            <div className="stat-card animate-on-scroll fade-up delay-2">
              <div className="stat-icon-wrapper">
                <MapPin size={32} />
              </div>
              <h3>15+</h3>
              <p>Cities Covered</p>
            </div>
            
            <div className="stat-card animate-on-scroll fade-up delay-3">
              <div className="stat-icon-wrapper">
                <HeadphonesIcon size={32} />
              </div>
              <h3>24×7</h3>
              <p>Customer Support</p>
            </div>
            
            <div className="stat-card animate-on-scroll fade-up delay-4">
              <div className="stat-icon-wrapper">
                <Shield size={32} />
              </div>
              <h3>100%</h3>
              <p>Safe Journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE */}
      <section className="about-section-3 container">
        <h2 className="section-center-heading animate-on-scroll fade-up">WHY CHOOSE PREMIUM RIDES</h2>
        
        <div className="why-choose-grid">
          <div className="why-card animate-on-scroll fade-up delay-1">
            <div className="why-icon-wrapper">
              <Shield size={28} />
            </div>
            <h4>Safe & Secure</h4>
            <p>Your safety is our first priority.</p>
          </div>

          <div className="why-card animate-on-scroll fade-up delay-2">
            <div className="why-icon-wrapper">
              <BadgeCheck size={28} />
            </div>
            <h4>Verified Drivers</h4>
            <p>Experienced and background-verified professionals.</p>
          </div>

          <div className="why-card animate-on-scroll fade-up delay-3">
            <div className="why-icon-wrapper">
              <Car size={28} />
            </div>
            <h4>Clean Vehicles</h4>
            <p>Well maintained and sanitized cars for every ride.</p>
          </div>

          <div className="why-card animate-on-scroll fade-up delay-4">
            <div className="why-icon-wrapper">
              <Clock size={28} />
            </div>
            <h4>On-Time Pickup</h4>
            <p>We value your time and ensure timely pickups.</p>
          </div>

          <div className="why-card animate-on-scroll fade-up delay-5">
            <div className="why-icon-wrapper">
              <DollarSign size={28} />
            </div>
            <h4>Affordable Rates</h4>
            <p>Best prices with no hidden charges.</p>
          </div>

          <div className="why-card animate-on-scroll fade-up delay-6">
            <div className="why-icon-wrapper">
              <MapPin size={28} />
            </div>
            <h4>All India Service</h4>
            <p>Serving in all major cities and outstation routes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
