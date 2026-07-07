import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="container section">
        <h1 className="section-title">About Premium Rides</h1>
        <p className="section-subtitle">Your trusted travel partner across India.</p>
        <div className="about-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3>Our Mission</h3>
            <p>To provide comfortable, safe, and affordable travel solutions to our customers, ensuring a seamless journey from start to finish.</p>
          </div>
          <div>
            <h3>Professional Drivers</h3>
            <p>All our drivers are highly trained, background-verified professionals with years of experience on Indian roads. They prioritize your safety and comfort.</p>
          </div>
          <div>
            <h3>24/7 Customer Support</h3>
            <p>We are always here for you. Whether you need to book a ride at midnight or need assistance during your journey, our support team is available 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
