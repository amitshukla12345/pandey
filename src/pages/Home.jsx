import React from 'react';
import { Shield, Clock, ThumbsUp, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1>Book Your Ride Anywhere in India</h1>
          <p className="hero-subtitle">Comfortable, Safe & Affordable Travel</p>
          <div className="hero-cta">
            <a href="tel:+918369469197" className="btn btn-primary btn-lg">Call Now</a>
            <a href="https://wa.me/918369469197" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Our Premium Fleet</h2>
          <p className="section-subtitle">Choose from our wide range of well-maintained vehicles for your comfort.</p>
          
          <div className="cars-grid">
            {/* We'll use placeholder data for now */}
            {[
              { name: 'Maruti WagonR', seats: 4, ac: true, luggage: '2 Bags', img: 'images/wagonr.png' },
              { name: 'Swift Dzire', seats: 4, ac: true, luggage: '3 Bags', img: 'images/swift_dzire.png' },
              { name: 'Maruti Ertiga', seats: 6, ac: true, luggage: '4 Bags', img: 'images/ertiga.jpg' },
            ].map((car, index) => (
              <div key={index} className="car-card">
                <div className="car-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}${car.img}`} alt={car.name} className="car-img" />
                </div>
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <div className="car-specs">
                    <span>{car.seats} Seater</span>
                    <span>•</span>
                    <span>{car.ac ? 'AC' : 'Non-AC'}</span>
                    <span>•</span>
                    <span>{car.luggage}</span>
                  </div>
                  <Link to={`/contact?car=${encodeURIComponent(car.name)}`} className="btn btn-outline w-full mt-4 text-center justify-center">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/cars" className="btn btn-primary">View All Cars <ChevronRight size={20} /></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">We prioritize your safety and comfort on every journey.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Shield size={32} /></div>
              <h3>Safe & Secure</h3>
              <p>All our drivers are verified professionals and cars are regularly sanitized.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Clock size={32} /></div>
              <h3>24/7 Availability</h3>
              <p>Book a ride anytime, anywhere. We are always ready to serve you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ThumbsUp size={32} /></div>
              <h3>Affordable Pricing</h3>
              <p>Transparent billing with no hidden charges. Premium service at reasonable rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-secondary text-white">
        <div className="container">
          <h2 className="section-title text-white">What Our Customers Say</h2>
          <div className="testimonials-grid mt-8">
            <div className="testimonial-card">
              <div className="stars"><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /></div>
              <p className="testimonial-text">"Excellent service! The driver was on time, the car was clean, and the journey was very comfortable."</p>
              <h4 className="testimonial-author">- Rahul Sharma</h4>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /><Star fill="#facc15" color="#facc15" /></div>
              <p className="testimonial-text">"Booked an outstation trip for my family. Very professional behavior and reasonable pricing."</p>
              <h4 className="testimonial-author">- Priya Patel</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
