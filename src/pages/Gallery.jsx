import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Car, 
  Users, 
  Calendar, 
  Map as MapIcon,
  Maximize2,
  Image as ImageIcon,
  Shield,
  Star,
  Smile,
  Camera
} from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All Photos');

  // Expanded dataset with categories and titles
  const galleryItems = [
    {
      id: 1,
      src: `${import.meta.env.BASE_URL}images/ertiga.jpg`,
      category: 'Our Cars',
      title: 'Maruti Ertiga'
    },
    {
      id: 2,
      src: `${import.meta.env.BASE_URL}images/swift_dzire.png`,
      category: 'Our Cars',
      title: 'Swift Dzire'
    },
    {
      id: 3,
      src: `${import.meta.env.BASE_URL}images/wagonr.png`,
      category: 'Our Cars',
      title: 'Maruti WagonR'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Events',
      title: 'Corporate Travel'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Our Cars',
      title: 'Executive Fleet'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Road Trips',
      title: 'Highway Cruising'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Happy Customers',
      title: 'Satisfied Travelers'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Events',
      title: 'Wedding Car Rental'
    }
  ];

  const filters = [
    { name: 'All Photos', icon: <Grid size={18} /> },
    { name: 'Our Cars', icon: <Car size={18} /> },
    { name: 'Happy Customers', icon: <Users size={18} /> },
    { name: 'Events', icon: <Calendar size={18} /> },
    { name: 'Road Trips', icon: <MapIcon size={18} /> },
  ];

  const filteredItems = activeFilter === 'All Photos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

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
    <div className="gallery-page-container">
      {/* HEADER SECTION */}
      <section className="gallery-header-section animate-on-scroll fade-up">
        <span className="gallery-small-label">OUR GALLERY</span>
        <h1 className="gallery-large-heading">
          Explore Our <span className="text-yellow">Premium</span> Fleet
        </h1>
        <div className="gallery-decorative-line"></div>
        <p className="gallery-subtitle">
          Discover our well-maintained vehicles, memorable journeys and satisfied customers across India.
        </p>
      </section>

      {/* FILTER SECTION */}
      <section className="gallery-filters-section animate-on-scroll fade-up delay-1">
        <div className="gallery-filters-container">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`gallery-filter-btn ${activeFilter === filter.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.name)}
            >
              {filter.icon}
              {filter.name}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID SECTION */}
      <section className="gallery-grid-section container">
        <div className="premium-gallery-grid">
          
          {filteredItems.map((item, index) => {
            // Inject the Center Feature Card in the middle of the grid if "All Photos" is selected
            const isCenterSpot = activeFilter === 'All Photos' && index === 4;
            
            return (
              <React.Fragment key={item.id}>
                {isCenterSpot && (
                  <div className="gallery-feature-card animate-on-scroll fade-up delay-2">
                    <div className="gallery-feature-icon-wrapper">
                      <ImageIcon size={32} />
                    </div>
                    <h3 className="gallery-feature-title">Premium Service</h3>
                    <p className="gallery-feature-desc">
                      Comfort, Safety and Style<br/>
                      Every Mile of the Way
                    </p>
                  </div>
                )}
                
                <div className={`gallery-image-card animate-on-scroll fade-up delay-${(index % 3) + 1}`}>
                  <img src={item.src} alt={item.title} className="gallery-image" loading="lazy" />
                  
                  <div className="gallery-image-overlay">
                    <div className="overlay-top-right">
                      <button className="expand-btn">
                        <Maximize2 size={20} />
                      </button>
                    </div>
                    
                    <div className="overlay-bottom-left">
                      <span className="gallery-image-category">{item.category}</span>
                      <h4 className="gallery-image-title">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Fallback if filtered items are too few to trigger the 5th index naturally */}
          {activeFilter !== 'All Photos' && (
             <div className="gallery-feature-card animate-on-scroll fade-up delay-2">
               <div className="gallery-feature-icon-wrapper">
                 <ImageIcon size={32} />
               </div>
               <h3 className="gallery-feature-title">Premium Service</h3>
               <p className="gallery-feature-desc">
                 Comfort, Safety and Style<br/>
                 Every Mile of the Way
               </p>
             </div>
          )}

        </div>
      </section>

      {/* BOTTOM SECTION: Feature Strip */}
      <section className="gallery-bottom-features container animate-on-scroll fade-up delay-3">
        <div className="gallery-features-strip">
          
          <div className="gallery-strip-item">
            <div className="gallery-strip-icon"><Shield size={24} /></div>
            <div className="gallery-strip-text">
              <strong>Well Maintained Cars</strong>
              <p>Regularly serviced for your safety.</p>
            </div>
          </div>
          
          <div className="gallery-strip-item">
            <div className="gallery-strip-icon"><Star size={24} /></div>
            <div className="gallery-strip-text">
              <strong>Best in Class</strong>
              <p>Luxury and comfort guaranteed.</p>
            </div>
          </div>
          
          <div className="gallery-strip-item">
            <div className="gallery-strip-icon"><Smile size={24} /></div>
            <div className="gallery-strip-text">
              <strong>Happy Customers</strong>
              <p>Thousands of satisfied travellers.</p>
            </div>
          </div>
          
          <div className="gallery-strip-item">
            <div className="gallery-strip-icon"><Camera size={24} /></div>
            <div className="gallery-strip-text">
              <strong>Memorable Journeys</strong>
              <p>Creating unforgettable experiences.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Gallery;
