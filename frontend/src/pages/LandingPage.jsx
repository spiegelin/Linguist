//LandingPage.jsx
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/LandingPage.css';
import logo from '../pages/logo.ico';
import france from '../img/france.svg';
import japan from '../img/japan.svg';
import germany from '../img/germany.svg';
import china from '../img/china.svg';
import mainImg from '../img/mainLanding.svg';
import instagram from '../img/instagram.svg';
import facebook from '../img/facebook.svg';
import twitter from '../img/twitter.svg';
import user1 from '../img/user1.png';
import user2 from '../img/user2.png';
import user3 from '../img/user3.png';
import user4 from '../img/user4.png';
import user5 from '../img/user5.png';

const benefits = [
  { src: france, alt: 'French', name: 'French' },
  { src: japan, alt: 'Japanese', name: 'Japanese' },
  { src: germany, alt: 'German', name: 'German' },
  { src: china, alt: 'Chinese', name: 'Chinese' },
];

const testimonials = [
  { src: user1, alt: 'User 1', quote: 'Lingüist helped me improve my language skills drastically! Highly recommend it!' },
  { src: user2, alt: 'User 2', quote: 'The real-time conversations feature is amazing. I can practice with people from all over the world!' },
  { src: user3, alt: 'User 3', quote: 'Thanks to Lingüist, I\'ve expanded my vocabulary significantly. Great platform!' },
  { src: user4, alt: 'User 4', quote: 'I never thought learning a new language could be this fun and easy! Lingüist makes it possible.' },
  { src: user5, alt: 'User 5', quote: 'Lingüist has become an essential tool in my language learning journey. It\'s incredibly effective and user-friendly.' },
];

export const LandingPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="App">
      <header className="header">
        <div className="brand">
          <img className="logoImg" src={logo} alt="Logo" />
          <div>
            <h1>Lingüist</h1>
          </div>
        </div>
        <div className="nav">
          <Link className="nav-button" to="/login">Log In</Link>
          <Link className="nav-button" to="/signup">Sign Up</Link>
        </div>
      </header>

      <section className="main-section">
        <div className="main-content">
          <img src={mainImg} alt="Main" className="main-image" />
          <div className="main-text">
            <h2>Transform your language learning process</h2>
            <p>Practice with real people, track your progress, and build your personalized dictionary with Lingüist</p>
            <Link className="cta-button" to="/login">Join</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Features</h2>

        <div className="feature">
          <div className="feature-content">
            <div className="image-container feature1"></div>
            <div className="text-container">
              <div className="feature-text">
                <h3>Interactive Language Practice</h3>
                <p>Join a global community of learners and engage in real-time conversations to enhance your language skills.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <div className="text-container">
              <div className="feature-text">
                <h3>Instant Translations Assistance</h3>
                <p>Users can view translations or context of messages in their native language when needed, with the option to toggle between the original and translated text.</p>
              </div>
            </div>
            <div className="image-container feature2"></div>
          </div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <div className="image-container feature3"></div>
            <div className="text-container">
              <div className="feature-text">
                <h3>AI-Assisted Chatting Recommendations</h3>
                <p>This tool provides users with real-time language tips and suggestions within chat interface, offering contextual advice, vocabulary enhancements, and grammar corrections to support and enhance their language learning experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2 className="section-title">¡Start Learning!</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={benefit.src} alt={benefit.alt} />
              <div className={hoveredIndex === index ? 'benefit-overlay active' : 'benefit-overlay'}>
                <p>{benefit.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">Satisfied Customers</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <img src={testimonial.src} alt={testimonial.alt} />
              <div className="testimonial-overlay">
                <p>{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Our social media!</p>
        <div className="social-icons">
          <a href="https://facebook.com"><img src={facebook} alt="Facebook" /></a>
          <a href="https://twitter.com"><img src={twitter} alt="Twitter" /></a>
          <a href="https://instagram.com"><img src={instagram} alt="Instagram" /></a>
        </div>
        <p>Contact: info@linguist.com</p>
      </footer>
    </div>
  );
};
