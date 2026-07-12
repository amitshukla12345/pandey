import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  ShieldCheck,
  UserCheck,
  Sparkles,
  Clock,
  Wallet,
  Phone,
  MessageCircle,
  Star,
  Users,
  Snowflake,
  Fuel,
  ArrowRight
} from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src={`${import.meta.env.BASE_URL}images/Erti.png`} alt="Hero Banner Background" className="hero-bg-img" />
        </div>

        <div className="hero-container">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">
              <span>Safe Journey, Happy Journey</span>
            </div>
            <h1 className="hero-title">
              Trusted Taxi Service <br />
              <span className="text-primary">Across India</span>
            </h1>
            <p className="hero-subtitle-text">
              Book your outstation cab for one way or round trip.<br />
              Comfortable cars, professional drivers & on-time service.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me/918369469197" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
                <WhatsAppIcon size={20} />
                Book on WhatsApp
              </a>
              <a href="tel:+918369469197" className="btn btn-outline-white btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features-section">
        <div className="container">
          <div className="features-floating-box">
            <div className="feature-card">
              <div className="feature-icon-wrapper"><ShieldCheck size={32} /></div>
              <div>
                <h3 className="feature-title">Safe & Secure</h3>
                <p className="feature-desc">Your safety is our<br />first priority</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><UserCheck size={32} /></div>
              <div>
                <h3 className="feature-title">Experienced Drivers</h3>
                <p className="feature-desc">Well mannered &<br />verified drivers</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Sparkles size={32} /></div>
              <div>
                <h3 className="feature-title">Clean & Comfortable</h3>
                <p className="feature-desc">Well maintained<br />vehicles</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Clock size={32} /></div>
              <div>
                <h3 className="feature-title">On-Time Service</h3>
                <p className="feature-desc">Punctual pickups &<br />on-time drops</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Wallet size={32} /></div>
              <div>
                <h3 className="feature-title">Affordable Rates</h3>
                <p className="feature-desc">Best prices with<br />no hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Cars Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h5 className="section-kicker">OUR CARS</h5>
            <h2 className="section-title">Choose Your Car</h2>
            <p className="section-subtitle">Well maintained cars for a comfortable journey</p>
          </div>

          <div className="cars-grid">
            {[
              { name: 'Maruti WagonR', seats: 4, ac: true, fuel: 'Petrol/CNG', img: 'images/wagonr.png', fallback: 'https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fcolors%2Fmaruti-suzuki%2Fwagon-r%2Fmaruti-suzuki-wagon-r-solid-white.png%3Fv%3D1645700203&w=384&q=75' },
              { name: 'Swift Dzire', seats: 4, ac: true, fuel: 'Diesel/Petrol', img: 'images/swift_dzire.png', fallback: 'https://stat.overdrive.in/wp-content/odgallery/2020/06/57263_2020_Maruti_Suzuki_Dzire_1.jpg' },
              { name: 'Ertiga', seats: 6, ac: true, fuel: 'Diesel/CNG', img: 'images/ertiga.jpg', fallback: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80' },
            ].map((car, index) => (
              <div key={index} className="car-card card">
                <div className="car-image-container">
                  <img src={`${import.meta.env.BASE_URL}${car.img}`} alt={car.name} className="car-img" onError={(e) => { e.target.src = car.fallback }} />
                </div>
                <div className="car-details">
                  <h3 className="car-name">{car.name}</h3>
                  <div className="car-specs-grid">
                    <div className="spec-item">
                      <Users size={16} className="text-muted" />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="spec-item">
                      <Snowflake size={16} className="text-muted" />
                      <span>{car.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div className="spec-item">
                      <Fuel size={16} className="text-muted" />
                      <span>{car.fuel}</span>
                    </div>
                  </div>
                  <a href={`https://wa.me/918369469197?text=I want to book ${car.name}`} target="_blank" rel="noreferrer" className="btn btn-primary w-full mt-4">
                    Book Now <WhatsAppIcon size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/cars" className="btn btn-outline">
              View All Fleet <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h5 className="section-kicker">TESTIMONIALS</h5>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from our happy passengers</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />)}
              </div>
              <p className="testimonial-text">
                "Excellent service! The driver was on time, the car was clean and comfortable. We had a great family trip to Lonavala. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div>
                  <h4 className="author-name">Rahul Sharma</h4>
                  <span className="author-location">Mumbai</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />)}
              </div>
              <p className="testimonial-text">
                "Very professional behavior and reasonable pricing. I use their airport pickup service regularly and they have never disappointed me."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div>
                  <h4 className="author-name">Priya Patel</h4>
                  <span className="author-location">Pune</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
