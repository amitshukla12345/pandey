import React from 'react';
import { Plane, MapPin, Map, RefreshCw, Briefcase, Heart } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <Plane size={32} />, title: 'Airport Pickup & Drop', desc: 'Reliable airport transfers. We monitor flights to ensure punctuality.' },
    { icon: <MapPin size={32} />, title: 'Local Taxi', desc: 'Explore the city with our comfortable local taxi service.' },
    { icon: <Map size={32} />, title: 'Outstation Trips', desc: 'Safe and comfortable outstation travel across India.' },
    { icon: <RefreshCw size={32} />, title: 'Round Trip', desc: 'Book a round trip and save more on your travels.' },
    { icon: <Briefcase size={32} />, title: 'Corporate Travel', desc: 'Premium vehicles for corporate events and executive travel.' },
    { icon: <Heart size={32} />, title: 'Wedding Car Rental', desc: 'Luxury cars to make your special day even more memorable.' },
  ];

  return (
    <div className="page-container section">
      <div className="container">
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">Comprehensive travel solutions tailored to your needs.</p>
        
        <div className="features-grid" style={{ marginTop: '2rem' }}>
          {services.map((service, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
