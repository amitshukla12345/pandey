import React, { useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  Map, 
  RefreshCw, 
  Briefcase, 
  Heart,
  Shield,
  UserCheck,
  Headphones,
  Check,
  ArrowRight,
  Building,
  Car
} from 'lucide-react';
import './Services.css';

const Services = () => {
  // Detailed service data including features and watermark icons
  const services = [
    { 
      id: 1,
      icon: <Plane size={28} />, 
      title: 'Airport Pickup & Drop', 
      desc: 'Reliable airport transfers. We monitor flights to ensure punctuality.',
      features: ['Flight Tracking', 'Timely Pickup', 'Professional Service'],
      watermark: <Plane size={140} />
    },
    { 
      id: 2,
      icon: <MapPin size={28} />, 
      title: 'Local Taxi', 
      desc: 'Explore the city with our comfortable local taxi services.',
      features: ['City Travel', 'Flexible Routes', 'Affordable Pricing'],
      watermark: <Building size={140} />
    },
    { 
      id: 3,
      icon: <Map size={28} />, 
      title: 'Outstation Trips', 
      desc: 'Safe and comfortable outstation travel across India.',
      features: ['One Way', 'Round Trip', 'Experienced Drivers'],
      watermark: <Map size={140} />
    },
    { 
      id: 4,
      icon: <RefreshCw size={28} />, 
      title: 'Round Trip', 
      desc: 'Book return journeys at affordable prices and save more.',
      features: ['Flexible Schedule', 'Best Price', 'Hassle Free'],
      watermark: <RefreshCw size={140} />
    },
    { 
      id: 5,
      icon: <Briefcase size={28} />, 
      title: 'Corporate Travel', 
      desc: 'Professional transport for business travel and events.',
      features: ['Corporate Billing', 'Executive Cars', 'On Time Service'],
      watermark: <Briefcase size={140} />
    },
    { 
      id: 6,
      icon: <Heart size={28} />, 
      title: 'Wedding Car Rental', 
      desc: 'Luxury cars for weddings and events to make your day memorable.',
      features: ['Decorated Cars', 'Premium Vehicles', 'On Time Arrival'],
      watermark: <Heart size={140} />
    },
  ];

  // Scroll Animation Hook
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
    <div className="services-page-container">
      {/* SECTION 1: Premium Hero Banner */}
      <section className="services-hero-section">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content-wrapper">
          <div className="services-hero-left animate-on-scroll fade-up">
            <span className="services-hero-label">OUR SERVICES</span>
            <h1 className="services-hero-title">
              Premium Travel Solutions <br />
              <span className="text-yellow">Tailored For You</span>
            </h1>
            <p className="services-hero-description">
              From airport transfers to outstation journeys, we provide safe, comfortable and reliable taxi services across India.
            </p>
            
            <div className="services-hero-features">
              <div className="services-hero-feature">
                <div className="services-feature-icon-wrapper">
                  <Shield size={20} />
                </div>
                <div className="services-feature-text">
                  <strong>Safe & Reliable</strong>
                  <p>Your safety is our priority</p>
                </div>
              </div>
              <div className="services-hero-feature">
                <div className="services-feature-icon-wrapper">
                  <UserCheck size={20} />
                </div>
                <div className="services-feature-text">
                  <strong>Professional Drivers</strong>
                  <p>Trained & verified drivers</p>
                </div>
              </div>
              <div className="services-hero-feature">
                <div className="services-feature-icon-wrapper">
                  <Headphones size={20} />
                </div>
                <div className="services-feature-text">
                  <strong>24×7 Support</strong>
                  <p>We are here for you anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: What We Offer & Services Grid */}
      <section className="services-main-section">
        <div className="container">
          <div className="services-header animate-on-scroll fade-up">
            <h2 className="services-center-heading">WHAT WE OFFER</h2>
            <h3 className="services-large-heading">Our Services</h3>
            <p className="services-subtitle">Comprehensive travel solutions tailored to your travel needs.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.id} className={`premium-service-card animate-on-scroll fade-up delay-${(index % 3) + 1}`}>
                <div className="service-watermark">
                  {service.watermark}
                </div>
                
                <div className="service-card-header">
                  <div className="service-icon-circle">
                    {service.icon}
                  </div>
                  <h4 className="service-card-title">{service.title}</h4>
                </div>
                
                <p className="service-card-desc">{service.desc}</p>
                
                <ul className="service-features-list">
                  {service.features.map((feature, i) => (
                    <li key={i} className="service-feature-item">
                      <Check size={16} className="feature-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-footer">
                  <div className="service-arrow-btn">
                    <ArrowRight size={20} className="arrow-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
