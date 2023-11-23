// En Footer.jsx
import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsVisible(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`Footer ${isVisible ? 'visible' : ''}`}>
      <p>&copy; 2023 Tu Empresa. Todos los derechos reservados.</p>
    </div>
  );
};

export default Footer;
