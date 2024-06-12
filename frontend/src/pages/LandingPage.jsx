import React, { useState } from 'react';
import '../styles/LandingPage.css';
import logo from '../../public/logot.png';
import france from '../../public/france.svg';
import japan from '../../public/japan.svg';
import germany from '../../public/germany.svg';
import china from '../../public/china.svg';
import mainImg from '../../public/mainLanding.svg';
import instagram from '../../public/instagram.svg';
import facebook from '../../public/facebook.svg';
import twitter from '../../public/twitter.svg';
import user1 from '../../public/user1.png';
import user2 from '../../public/user2.png';
import user3 from '../../public/user3.png';
import user4 from '../../public/user4.png';
import user5 from '../../public/user5.png';

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

  const handleRedirect = () => {
    window.location.href = '/';
  };

  return (
    <div className="App">
      <header className="header">
        <div className="brand">
          <img className="logoImg" src={logo} alt="" />
          <div>
            <h1>Linguist</h1>
          </div>
        </div>

        <div className="nav">
          <button className="nav-button" onClick={handleRedirect}>
            Log In
          </button>
          <button className="nav-button" onClick={handleRedirect}>
            Sign Up
          </button>
        </div>
      </header>

      <section className="main-section">
        <div className="main-content">
          <img src={mainImg} alt="Main" className="main-image" />
          <div className="main-text">
            <h2>Transform your language learning process</h2>
            <p>
              Practice with real people, track your progress, and build your
              personalized dictionary with Lingüist
            </p>
            <button className="cta-button" onClick={handleRedirect}>
              Join
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Features</h2>

        <div className="feature">
          <div className="feature-content">
            <div className="image-container1"></div>

            <div className="text-container">
              <div className="feature-text">
                <h3>Interactive Language Practice</h3>
                <p>
                  Join a global community of learners and engage in real-time
                  conversations to enhance your language skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <div className="text-container">
              <div className="feature-text">
                <h3>Instant translations Assistance</h3>
                <p>
                  Users can view translations or context of messages in their
                  native language when needed, with the option to toggle between
                  the original and translated text.
                </p>
              </div>
            </div>

            <div className="image-container2"></div>
          </div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <div className="image-container3"></div>

            <div className="text-container">
              <div className="feature-text">
                <h3>AI-Assisted Chatting Recommendations</h3>
                <p>
                This tool provides users with real-time language tips and suggestions within chat interface, offering contextual advice, vocabulary enhancements, and grammar corrections to support and enhance their language learning experience.
                </p>
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
        <h2 className="section-title">Satified Customers</h2>
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
        <div className="social-icon">
          <a href="https://facebook.com"><img src={facebook} alt="" /></a>
          <a href="https://twitter.com"><img src={twitter} alt="" /></a>
          <a href="https://instagram.com"><img src={instagram} alt="" /></a>
        </div>
        <p>Contact: info@linguist.com</p>
      </footer>
    </div>
  );
};
