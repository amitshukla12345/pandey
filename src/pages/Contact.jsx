import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, User, Car, Navigation, MessageSquare, MessageCircle, LocateFixed, Calendar, Clock, Users } from 'lucide-react';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCar = searchParams.get('car') || '';

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
          } catch(e) {
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
    <div className="page-container section">
      <div className="container">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">Get in touch for bookings and inquiries.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem', marginTop: '2rem' }}>
          {/* Contact Form */}
          <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <User size={20} color="var(--text-light)" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name (e.g. John Doe)" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Phone size={20} color="var(--text-light)" />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Mail size={20} color="var(--text-light)" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Car size={20} color="var(--text-light)" />
                <select 
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="" disabled>Select Car Type</option>
                  <option value="Maruti WagonR">Maruti WagonR</option>
                  <option value="Swift Dzire">Swift Dzire</option>
                  <option value="Maruti Ertiga">Maruti Ertiga</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <Calendar size={20} color="var(--text-light)" />
                <input 
                  type="date" 
                  name="journeyDate"
                  required
                  value={formData.journeyDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Clock size={20} color="var(--text-light)" />
                <input 
                  type="time" 
                  name="pickupTime"
                  required
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Users size={20} color="var(--text-light)" />
                <input 
                  type="number" 
                  name="passengers"
                  placeholder="Number of Passengers" 
                  min="1"
                  max="10"
                  required
                  value={formData.passengers}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <MapPin size={20} color="var(--text-light)" />
                <input 
                  type="text" 
                  name="fromLocation"
                  placeholder="From (Pickup Location)" 
                  required
                  value={formData.fromLocation}
                  onChange={handleChange}
                  onBlur={handleLocationSearch}
                  className="input-field"
                />
                <button 
                  type="button" 
                  onClick={handleGetLocation}
                  title="Use Current Location"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--primary)' }}
                >
                  <LocateFixed size={20} />
                </button>
              </div>

              {mapUrl && (
                <div style={{ marginTop: '-0.5rem', marginBottom: '0.5rem', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid #d4d4d4' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f3f4f6', fontSize: '0.875rem', borderBottom: '1px solid #d4d4d4', color: 'var(--text-dark)' }}>
                    <strong>Area Pincode:</strong> {isMapLoading ? 'Loading...' : pincode}
                  </div>
                  <iframe 
                    src={mapUrl} 
                    width="100%" 
                    height="200" 
                    style={{ border: 0, display: 'block' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                  ></iframe>
                </div>
              )}

              <div className="input-group">
                <Navigation size={20} color="var(--text-light)" />
                <input 
                  type="text" 
                  name="toLocation"
                  placeholder="To (Drop Location)" 
                  required
                  value={formData.toLocation}
                  onChange={handleChange}
                  onBlur={handleToLocationSearch}
                  className="input-field"
                />
              </div>

              {toMapUrl && (
                <div style={{ marginTop: '-0.5rem', marginBottom: '0.5rem', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid #d4d4d4' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f3f4f6', fontSize: '0.875rem', borderBottom: '1px solid #d4d4d4', color: 'var(--text-dark)' }}>
                    <strong>Drop Area Pincode:</strong> {isToMapLoading ? 'Loading...' : toPincode}
                  </div>
                  <iframe 
                    src={toMapUrl} 
                    width="100%" 
                    height="200" 
                    style={{ border: 0, display: 'block' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                  ></iframe>
                </div>
              )}

              <div className="input-group" style={{ alignItems: 'flex-start', padding: '0.75rem' }}>
                <MessageSquare size={20} color="var(--text-light)" style={{ marginTop: '0.2rem', marginRight: '0.75rem' }} />
                <textarea 
                  name="message"
                  placeholder="Message / Requirements" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                  style={{ resize: 'vertical' }}
                  className="input-field"
                ></textarea>
              </div>

              {distance && distance !== 'N/A' && (
                <div style={{ padding: '0.75rem', backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 'var(--radius)', color: '#3730a3', textAlign: 'center', fontWeight: '500' }}>
                  Total Trip Distance: {isDistanceLoading ? 'Calculating...' : `${distance} km`}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={handleEmailSubmit} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', whiteSpace: 'nowrap' }}>
                  <Mail size={20} /> Email Us
                </button>
                <button type="button" onClick={handleWhatsAppSubmit} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', backgroundColor: '#25D366', color: 'white', border: 'none', whiteSpace: 'nowrap' }}>
                  <MessageCircle size={20} /> WhatsApp Us
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Our Office</h4>
                  <p style={{ color: 'var(--text-light)' }}>123 MG Road, Bengaluru, India</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Call Us</h4>
                  <a href="tel:+918369469197" style={{ color: 'var(--text-light)' }}>+91 836 946 9197</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Email Us</h4>
                  <a href="mailto:manojkumarpandey531@gmail.com" style={{ color: 'var(--text-light)' }}>manojkumarpandey531@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div style={{ width: '100%', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.973434685025!2d77.60477141526978!3d12.973549290853755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e45260195%3A0x6b4c102a9e3a68ea!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1689332155891!5m2!1sen!2sin" 
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
        </div>
      </div>
    </div>
  );
};

export default Contact;
