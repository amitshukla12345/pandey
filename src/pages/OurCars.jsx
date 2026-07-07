import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css'; // Reusing Home CSS for car cards

const OurCars = () => {
  const cars = [
    { name: 'Maruti WagonR', seats: 4, ac: true, luggage: '2 Bags', img: 'images/wagonr.png' },
    { name: 'Swift Dzire', seats: 4, ac: true, luggage: '3 Bags', img: 'images/swift_dzire.png' },
    { name: 'Maruti Ertiga', seats: 6, ac: true, luggage: '4 Bags', img: 'images/ertiga.jpg' },
    // Can add more here
  ];

  return (
    <div className="page-container section bg-light">
      <div className="container">
        <h1 className="section-title">Our Cars</h1>
        <p className="section-subtitle">Choose the perfect vehicle for your journey.</p>
        
        <div className="cars-grid">
          {cars.map((car, index) => (
            <div key={index} className="car-card">
              <div className="car-img-wrapper">
                <img src={car.img} alt={car.name} className="car-img" />
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
                <Link to={`/contact?car=${encodeURIComponent(car.name)}`} className="btn btn-primary w-full mt-4 text-center justify-center">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCars;
