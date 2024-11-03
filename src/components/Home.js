import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css';

const Home = () => {
  
  useEffect(() => {
    const welcomeSection = document.querySelector('.welcome-section');
    const carousel = document.querySelector('.carousel');
    const howItWorks = document.querySelector('.how-it-works');
    const testimonial = document.querySelector('.testimonials');

    if (welcomeSection && carousel && howItWorks && testimonial) {
      // Observer for fading in/out the carousel when the welcome section scrolls in/out
      const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.1) { // Adjusted threshold
            carousel.classList.add('visible'); // Show carousel when welcome-section scrolls in
          } else {
            carousel.classList.remove('visible'); // Hide carousel when welcome-section scrolls out
          }
        });
      }, {
        threshold: [0.3] // Trigger at 30%
      });
  
      // Observer for fading in/out how-it-works when carousel scrolls in/out
      const howItWorksObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.1) { // Adjusted threshold
            howItWorks.classList.add('visible'); // Show how-it-works when carousel scrolls in
          } else {
            howItWorks.classList.remove('visible'); // Hide how-it-works when carousel scrolls out
          }
        });
      }, {
        threshold: [0.3] // Trigger at 30%
      });
  
      // Observer for fading in/out testimonial when how-it-works scrolls in/out
      const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.1) { // Adjusted threshold
            testimonial.classList.add('visible'); // Show testimonial when how-it-works scrolls in
          } else {
            testimonial.classList.remove('visible'); // Hide testimonial when how-it-works scrolls out
          }
        });
      }, {
        threshold: [0.3] // Trigger at 30%
      });

      carouselObserver.observe(welcomeSection);
      howItWorksObserver.observe(carousel);
      testimonialObserver.observe(howItWorks);

      return () => {
        carouselObserver.disconnect();
        howItWorksObserver.disconnect();
        testimonialObserver.disconnect();
      };
    } else {
      console.error('One or more elements not found:', { welcomeSection, carousel, howItWorks, testimonial });
    }
  }, []);

  return (
    <div>
      <div className="welcome-section">
        <h1 style={{ fontSize: '100px' }}>Welcome to UniRides!</h1>
        <h2 style={{ color: 'rgb(78, 86, 86)', fontSize: '40px' }}>Your Go-To Ride Sharing Solution for Students</h2>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div style={{ textAlign: 'center', fontSize: '80px', fontWeight: '600', color: 'black' }}>Why Choose UniRides?</div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-item-header">Affordable Rides</div>
            <div className="carousel-item-content">As a student, we understand that every penny counts. Our ride-share platform offers budget-friendly rates tailored specifically for students, making your daily commute and weekend getaways easy on your wallet.</div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item-header">Safe and Reliable</div>
            <div className="carousel-item-content">Safety is our top priority. All our drivers are thoroughly vetted, and our vehicles are regularly inspected to ensure a secure and comfortable ride every time. Plus, with our real-time tracking feature, you can always share your trip details with friends or family.</div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item-header">Convenient and Flexible</div>
            <div className="carousel-item-content">Need a ride to campus, the library, or a late-night study session? Our platform offers 24/7 ride availability, with flexible booking options to fit your schedule. Whether it's a one-time trip or a regular commute, we've got you covered.</div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item-header">Eco-Friendly</div>
            <div className="carousel-item-content">Join us in reducing carbon footprints. By sharing rides, you're contributing to a greener environment, helping to reduce traffic congestion, and making our campuses cleaner and more sustainable.</div>
          </div>
          <div className="carousel-item">
            <div className="carousel-item-header">Community Driven</div>
            <div className="carousel-item-content">At StudentRideShare, you are not just a passenger; you're part of a community. Connect with fellow students, make new friends, and enjoy the journey together. Our platform is designed to foster a sense of belonging and camaraderie among students.</div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div id="how-it-works-header">How It Works:</div>
        <div id="how-it-works-content">
          <ol>
            <li>Sign Up: Register using your student ID and create your profile.</li>
            <li>Book a Ride: Enter your destination, choose your ride option, and book instantly.</li>
            <li>Track Your Ride: Use the app to track your driver in real-time.</li>
            <li>Enjoy the Ride: Sit back, relax, and enjoy your journey.</li>
            <li>Rate and Review: Help us improve by providing feedback after your trip.</li>
          </ol>
        </div>
      </div>

      <section className="testimonials">
        <div className="testimonial-header">Testimonials</div>
        <div className="testimonial-content">
          <blockquote>
            <p>"StudentRideShare has made my daily commute to campus so much easier and cheaper. I love the convenience and safety it offers!" - Alex, University of California</p>
          </blockquote>
          <blockquote>
            <p>"I've met so many new friends through StudentRideShare. It's more than just a ride; it's a community!" - Jessica, Harvard University</p>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Home;
