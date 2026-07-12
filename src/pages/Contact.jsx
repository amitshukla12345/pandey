import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, User, Car, Navigation, MessageSquare, LocateFixed, Calendar, Clock, Users, Shield, Headphones, Zap, ShieldCheck, UserCheck } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import './Contact.css';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCar = searchParams.get('car') || '';

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carType: initialCar,
    journeyDate: '',
    pickupTime: '',
    passengers: '',
    fromLocation: '',
    toLocation: '',
    message: ''
  });

  const [mapUrl, setMapUrl] = useState('');
  const [pincode, setPincode] = useState('');
  const [isMapLoading, setIsMapLoading] = useState(false);

  const [toMapUrl, setToMapUrl] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [isToMapLoading, setIsToMapLoading] = useState(false);

  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isDistanceLoading, setIsDistanceLoading] = useState(false);

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

  useEffect(() => {
    const calculateDistance = async () => {
      if (fromCoords && toCoords) {
        setIsDistanceLoading(true);
        try {
          const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=false`);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const distanceInKm = (data.routes[0].distance / 1000).toFixed(0);
            setDistance(distanceInKm);
          } else {
            setDistance('N/A');
          }
        } catch (e) {
          setDistance('N/A');
        }
        setIsDistanceLoading(false);
      } else {
        setDistance(null);
      }
    };
    calculateDistance();
  }, [fromCoords, toCoords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse geocode to get the location name
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();

            let address = "Current Location";
            if (data && data.address) {
              const { road, suburb, neighbourhood, city, town, village } = data.address;
              const localArea = neighbourhood || suburb || village || road;
              const cityArea = city || town;

              if (localArea && cityArea) {
                address = `${localArea}, ${cityArea}`;
              } else if (localArea || cityArea) {
                address = localArea || cityArea;
              } else if (data.display_name) {
                address = data.display_name.split(',').slice(0, 3).join(', ');
              }
            } else if (data && data.display_name) {
              address = data.display_name.split(',').slice(0, 3).join(', ');
            }

            setFormData(prev => ({ ...prev, fromLocation: address }));
            setFromCoords({ lat: latitude, lon: longitude });

            // Immediately update the map and pincode preview based on this new address
            const query = encodeURIComponent(address);
            setMapUrl(`https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`);
            if (data && data.address && data.address.postcode) {
              setPincode(data.address.postcode);
            } else {
              setPincode('Not Found');
            }
          } catch (e) {
            // Fallback if reverse geocoding fails
            const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
            setFormData(prev => ({ ...prev, fromLocation: mapLink }));
          }
        },
        (error) => {
          alert("Unable to retrieve your location. Please ensure location permissions are granted.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationSearch = async () => {
    if (!formData.fromLocation) {
      setMapUrl('');
      setPincode('');
      return;
    }

    setIsMapLoading(true);
    const query = encodeURIComponent(formData.fromLocation);
    setMapUrl(`https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`);

    try {
      const searchString = formData.fromLocation.toLowerCase().includes('india')
        ? formData.fromLocation
        : `${formData.fromLocation}, India`;
      let apiQuery = encodeURIComponent(searchString);

      let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${apiQuery}&addressdetails=1`);
      let data = await response.json();

      if (!data || data.length === 0) {
        // Fallback: try just the first part before comma
        const fallbackString = formData.fromLocation.split(',')[0].trim() + ', India';
        apiQuery = encodeURIComponent(fallbackString);
        response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${apiQuery}&addressdetails=1`);
        data = await response.json();
      }

      let foundPincode = 'Not Found';

      if (data && data.length > 0) {
        setFromCoords({ lat: data[0].lat, lon: data[0].lon });
        const resultWithPostcode = data.find(item => item.address && item.address.postcode);
        if (resultWithPostcode) {
          foundPincode = resultWithPostcode.address.postcode;
        }
      } else {
        setFromCoords(null);
      }
      setPincode(foundPincode);
    } catch (e) {
      setPincode('Not Found');
      setFromCoords(null);
    }
    setIsMapLoading(false);
  };

  const handleToLocationSearch = async () => {
    if (!formData.toLocation) {
      setToMapUrl('');
      setToPincode('');
      return;
    }

    setIsToMapLoading(true);
    const query = encodeURIComponent(formData.toLocation);
    setToMapUrl(`https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`);

    try {
      const searchString = formData.toLocation.toLowerCase().includes('india')
        ? formData.toLocation
        : `${formData.toLocation}, India`;
      let apiQuery = encodeURIComponent(searchString);

      let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${apiQuery}&addressdetails=1`);
      let data = await response.json();

      if (!data || data.length === 0) {
        // Fallback: try just the first part before comma
        const fallbackString = formData.toLocation.split(',')[0].trim() + ', India';
        apiQuery = encodeURIComponent(fallbackString);
        response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${apiQuery}&addressdetails=1`);
        data = await response.json();
      }

      let foundPincode = 'Not Found';

      if (data && data.length > 0) {
        setToCoords({ lat: data[0].lat, lon: data[0].lon });
        const resultWithPostcode = data.find(item => item.address && item.address.postcode);
        if (resultWithPostcode) {
          foundPincode = resultWithPostcode.address.postcode;
        }
      } else {
        setToCoords(null);
      }
      setToPincode(foundPincode);
    } catch (e) {
      setToPincode('Not Found');
      setToCoords(null);
    }
    setIsToMapLoading(false);
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.carType || !formData.fromLocation || !formData.toLocation || !formData.journeyDate || !formData.pickupTime) {
      alert("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const subject = `Booking Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0ACar Type: ${formData.carType}%0D%0AFrom: ${formData.fromLocation}%0D%0ATo: ${formData.toLocation}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:manojkumarpandey531@gmail.com?subject=${subject}&body=${body}`;
  };

  const capitalizeWords = (str) => str.replace(/\b\w/g, char => char.toUpperCase());

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedPhone = formatPhone(formData.phone);
    const fromCap = capitalizeWords(formData.fromLocation);
    const toCap = capitalizeWords(formData.toLocation);

    let text = `🚕 *New Booking Inquiry* 🚕\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formattedPhone}\n✉️ *Email:* ${formData.email}\n🚘 *Car Type:* ${formData.carType}\n📅 *Journey Date:* ${formData.journeyDate}\n⏰ *Pickup Time:* ${formData.pickupTime}`;

    if (formData.passengers) {
      text += `\n👥 *Passengers:* ${formData.passengers}`;
    }

    text += `\n📍 *From:* ${fromCap}`;

    if (pincode && pincode !== 'Not Found') {
      text += `\n📮 *Pincode:* ${pincode}`;
    }
    if (mapUrl) {
      const mapLink = `https://maps.google.com/maps?q=${fromCap}`;
      text += `\n🗺️ *Pickup Map:* ${mapLink}`;
    }

    text += `\n🏁 *To:* ${toCap}`;

    if (toPincode && toPincode !== 'Not Found') {
      text += `\n📮 *Drop Pincode:* ${toPincode}`;
    }
    if (toMapUrl) {
      const dropMapLink = `https://maps.google.com/maps?q=${toCap}`;
      text += `\n🗺️ *Drop Map:* ${dropMapLink}`;
    }

    if (distance && distance !== 'N/A') {
      text += `\n📏 *Distance:* ${distance} km`;
    } else {
      text += `\n📏 *Distance:* Not Available (Unrecognized Location)`;
    }

    text += `\n💬 *Message:* ${formData.message}`;

    window.open(`https://wa.me/918369469197?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="contact-page-container">
      {/* SECTION 1: Header */}
      <section className="contact-header animate-on-scroll fade-up">
        <span className="contact-small-label">CONTACT US</span>
        <h1 className="contact-large-heading">
          Let's Plan Your <br />
          <span className="text-yellow">Next Journey</span>
        </h1>
        <div className="contact-decorative-line"></div>
        <p className="contact-subtitle">
          Get in touch for bookings, quotations and travel assistance anywhere across India.
        </p>
      </section>

      {/* SECTION 2: Main Layout Grid */}
      <section className="contact-main-grid container">
        
        {/* LEFT SIDE: Booking Form */}
        <div className="contact-left-column animate-on-scroll fade-up delay-1">
          <div className="premium-form-card">
            <div className="form-watermark"><Send size={200} /></div>
            
            <div className="form-card-header">
              <div className="form-header-icon-wrapper">
                <Send size={24} />
              </div>
              <h2 className="form-main-title">Send Us A Message</h2>
            </div>
            
            <form className="premium-booking-form">
              <div className="form-row-2">
                <div className="premium-input-group">
                  <User size={18} className="input-icon" />
                  <input type="text" name="name" placeholder="Full Name (e.g. John Doe)" required value={formData.name} onChange={handleChange} className="premium-input" />
                </div>
                <div className="premium-input-group">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="premium-input" />
                </div>
              </div>

              <div className="premium-input-group">
                <Mail size={18} className="input-icon" />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="premium-input" />
              </div>

              <div className="form-row-2">
                <div className="premium-input-group">
                  <Car size={18} className="input-icon" />
                  <select name="carType" value={formData.carType} onChange={handleChange} required className="premium-input">
                    <option value="" disabled>Select Car Type</option>
                    <option value="Maruti WagonR">Maruti WagonR</option>
                    <option value="Swift Dzire">Swift Dzire</option>
                    <option value="Maruti Ertiga">Maruti Ertiga</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="premium-input-group">
                  <Users size={18} className="input-icon" />
                  <input type="number" name="passengers" placeholder="Number of Passengers" min="1" max="10" required value={formData.passengers} onChange={handleChange} className="premium-input" />
                </div>
              </div>

              <div className="form-row-2">
                <div className="premium-input-group">
                  <Calendar size={18} className="input-icon" />
                  <input type="date" name="journeyDate" min={today} required value={formData.journeyDate} onChange={handleChange} className="premium-input" />
                </div>
                <div className="premium-input-group">
                  <Clock size={18} className="input-icon" />
                  <input type="time" name="pickupTime" required value={formData.pickupTime} onChange={handleChange} className="premium-input" />
                </div>
              </div>

              <div className="premium-input-group">
                <MapPin size={18} className="input-icon" />
                <input type="text" name="fromLocation" placeholder="Pickup Location" required value={formData.fromLocation} onChange={handleChange} onBlur={handleLocationSearch} className="premium-input" />
                <button type="button" onClick={handleGetLocation} className="location-btn" title="Use Current Location">
                  <LocateFixed size={18} />
                </button>
              </div>

              {mapUrl && (
                <div className="premium-map-preview">
                  <div className="map-preview-header">
                    <strong>Pickup Pincode:</strong> {isMapLoading ? 'Loading...' : pincode}
                  </div>
                  <iframe src={mapUrl} width="100%" height="150" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy"></iframe>
                </div>
              )}

              <div className="premium-input-group">
                <Navigation size={18} className="input-icon" />
                <input type="text" name="toLocation" placeholder="Drop Location" required value={formData.toLocation} onChange={handleChange} onBlur={handleToLocationSearch} className="premium-input" />
              </div>

              {toMapUrl && (
                <div className="premium-map-preview">
                  <div className="map-preview-header">
                    <strong>Drop Pincode:</strong> {isToMapLoading ? 'Loading...' : toPincode}
                  </div>
                  <iframe src={toMapUrl} width="100%" height="150" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy"></iframe>
                </div>
              )}

              <div className="premium-input-group align-top">
                <MessageSquare size={18} className="input-icon text-area-icon" />
                <textarea name="message" placeholder="Special Requirements or Message" rows="3" required value={formData.message} onChange={handleChange} className="premium-input premium-textarea"></textarea>
              </div>

              {distance && distance !== 'N/A' && (
                <div className="distance-badge">
                  Total Trip Distance: {isDistanceLoading ? 'Calculating...' : `${distance} km`}
                </div>
              )}

              <div className="premium-form-buttons">
                <button type="button" onClick={handleEmailSubmit} className="btn-secondary-email">
                  <Mail size={18} /> Send Email
                </button>
                <button type="button" onClick={handleWhatsAppSubmit} className="btn-primary-whatsapp">
                  <WhatsAppIcon size={18} /> Book on WhatsApp
                </button>
              </div>
              
              <div className="security-strip">
                <ShieldCheck size={16} className="security-icon" />
                <p>Your information is safe with us. We never share your personal details.</p>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: Contact Info & Map */}
        <div className="contact-right-column animate-on-scroll fade-up delay-2">
          
          <div className="premium-contact-cards">
            <h2 className="contact-right-heading">Get In Touch</h2>
            
            <div className="contact-info-card">
              <div className="contact-icon-circle"><MapPin size={22} /></div>
              <div className="contact-info-text">
                <strong>Office Address</strong>
                <p>Lodha crown orchid, K9/1 Khuni Taloja Road, Dombivali East, Pin 421204</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-circle"><Phone size={22} /></div>
              <div className="contact-info-text">
                <strong>Call Us</strong>
                <a href="tel:+918369469197">+91 836 946 9197</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-circle"><Mail size={22} /></div>
              <div className="contact-info-text">
                <strong>Email Us</strong>
                <a href="mailto:manojkumarpandey531@gmail.com">manojkumarpandey531@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="contact-premium-image">
            <img src={`${import.meta.env.BASE_URL}images/Erti.png`} alt="Premium Vehicle" className="contact-vehicle-img" />
          </div>

          <div className="contact-premium-map">
            <iframe
              src="https://maps.google.com/maps?q=Lodha+crown+orchid+k911+khuni+taloja+road+dombivali+est+pin+421204&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
          
        </div>
      </section>

      {/* BOTTOM SECTION: Feature Strip */}
      <section className="contact-bottom-features container animate-on-scroll fade-up delay-3">
        <div className="features-floating-strip">
          
          <div className="feature-strip-item">
            <div className="feature-strip-icon"><Zap size={24} /></div>
            <div className="feature-strip-text">
              <strong>Quick Response</strong>
              <p>Replies within 1 hour</p>
            </div>
          </div>
          
          <div className="feature-strip-item">
            <div className="feature-strip-icon"><Headphones size={24} /></div>
            <div className="feature-strip-text">
              <strong>24×7 Support</strong>
              <p>Available anytime</p>
            </div>
          </div>
          
          <div className="feature-strip-item">
            <div className="feature-strip-icon"><Shield size={24} /></div>
            <div className="feature-strip-text">
              <strong>Best Price Guarantee</strong>
              <p>Affordable pricing</p>
            </div>
          </div>
          
          <div className="feature-strip-item">
            <div className="feature-strip-icon"><UserCheck size={24} /></div>
            <div className="feature-strip-text">
              <strong>Trusted & Safe</strong>
              <p>Professional drivers</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
