import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, UserCheck, Car, User, Snowflake, Briefcase, ArrowRight, IndianRupee, ClipboardList, HeadphonesIcon, Zap } from 'lucide-react';
import './OurCars.css'; 

const OurCars = () => {
  const cars = [
    { 
      name: 'Maruti WagonR', 
      seats: 4, 
      ac: true, 
      luggage: '2 Bags', 
      img: 'images/wagonr.png',
      price: '12'
    },
    { 
      name: 'Swift Dzire', 
      seats: 4, 
      ac: true, 
      luggage: '3 Bags', 
      img: 'images/swift_dzire.png',
      price: '14'
    },
    { 
      name: 'Maruti Ertiga', 
      seats: 6, 
      ac: true, 
      luggage: '4 Bags', 
      img: 'images/ertiga.jpg',
      price: '16'
    }
  ];

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
    <div className="cars-page-container">
      {/* SECTION 1: Premium Hero Banner */}
      <section className="cars-hero-section">
        <div className="cars-hero-overlay"></div>
        <div className="cars-hero-content-wrapper">
          <div className="cars-hero-left animate-on-scroll fade-up">
            <span className="cars-hero-label">OUR CARS</span>
            <h1 className="cars-hero-title">
              Comfortable Rides, <br />
              <span className="text-yellow">Every Time</span>
            </h1>
            <p className="cars-hero-description">
              Choose from our range of premium, clean and well-maintained cars for local, airport and outstation travel across India.
            </p>
            
            <div className="cars-hero-features">
              <div className="cars-hero-feature">
                <div className="cars-feature-icon-wrapper">
                  <Shield size={20} />
                </div>
                <span>Safe & Secure</span>
              </div>
              <div className="cars-hero-feature">
                <div className="cars-feature-icon-wrapper">
                  <UserCheck size={20} />
                </div>
                <span>Professional Drivers</span>
              </div>
              <div className="cars-hero-feature">
                <div className="cars-feature-icon-wrapper">
                  <Car size={20} />
                </div>
                <span>Clean Vehicles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: Our Fleet Heading & Cards */}
      <section className="cars-fleet-section">
        <div className="container">
          <div className="cars-fleet-header animate-on-scroll fade-up">
            <h2 className="fleet-center-heading">OUR FLEET</h2>
            <h3 className="fleet-large-heading">Choose the Perfect Car for Your Journey</h3>
            <p className="fleet-subtitle">We offer comfortable, affordable and well-maintained cars for every travel requirement.</p>
          </div>

          <div className="premium-cars-grid">
            {cars.map((car, index) => (
              <div key={index} className={`premium-car-card animate-on-scroll fade-up delay-${index + 1}`}>
                <div className="premium-car-badge">
                  {car.seats} Seater
                </div>
                <div className="premium-car-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}${car.img}`} alt={car.name} className="premium-car-img" />
                </div>
                
                <div className="premium-car-content">
                  <h4 className="premium-car-name">{car.name}</h4>
                  
                  <div className="premium-car-specs">
                    <div className="spec-item">
                      <User size={16} className="spec-icon" />
                      <span>{car.seats} Seater</span>
                    </div>
                    <div className="spec-item">
                      <Snowflake size={16} className="spec-icon" />
                      <span>{car.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div className="spec-item">
                      <Briefcase size={16} className="spec-icon" />
                      <span>{car.luggage}</span>
                    </div>
                  </div>

                  <div className="premium-car-footer">
                    <div className="premium-car-price">
                      <span className="price-symbol">₹</span>
                      <span className="price-amount">{car.price}</span>
                      <span className="price-unit">/km</span>
                    </div>
                    <Link to={`/contact?car=${encodeURIComponent(car.name)}`} className="btn-premium-book">
                      Book Now <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Benefits Strip */}
      <section className="cars-benefits-section container">
        <div className="benefits-strip-container animate-on-scroll fade-up delay-2">
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <IndianRupee size={24} />
            </div>
            <div className="benefit-text">
              <strong>Best Price Guarantee</strong>
              <p>Get best rates always.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <ClipboardList size={24} />
            </div>
            <div className="benefit-text">
              <strong>No Hidden Charges</strong>
              <p>Transparent pricing.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <HeadphonesIcon size={24} />
            </div>
            <div className="benefit-text">
              <strong>24×7 Support</strong>
              <p>Available anytime.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <Zap size={24} />
            </div>
            <div className="benefit-text">
              <strong>Easy Booking</strong>
              <p>Book within minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCars;
