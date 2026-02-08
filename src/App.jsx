import { useState, useEffect } from 'react'
import './App.css'

// Importing user images
import img1 from './assets/IMG-20220920-WA0286(1).jpg'
import img2 from './assets/IMG-20231119-WA0043.jpg'
import img3 from './assets/IMG-20240818-WA0004.jpg'
import img4 from './assets/IMG-20240818-WA0005.jpg'
import img5 from './assets/IMG-20241020-WA0065.jpg'
import img6 from './assets/IMG-20251027-WA0064.jpg'
import img7 from './assets/IMG-20251217-WA0034.jpg'
import img8 from './assets/IMG-20251217-WA0037.jpg'
import img9 from './assets/IMG-20251217-WA0040.jpg'
import img10 from './assets/IMG-20260201-WA0063.jpg'
import img11 from './assets/IMG-20260201-WA0065.jpg'
import img14 from './assets/IMG_20241128_190332.jpg'
import img15 from './assets/IMG_20241129_085111.jpg'

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, 
  img9, img10, img11, img14, img15
];

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow Logic
  useEffect(() => {
    if (accepted) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 3000); // 3 seconds per slide
      return () => clearInterval(interval);
    }
  }, [accepted]);

  // "No" Button Interaction
  const handleNoInteraction = () => {
    const x = Math.random() * (window.innerWidth - 150); // subtract approx button width
    const y = Math.random() * (window.innerHeight - 80); // subtract approx button height
    
    // Ensure it stays within bounds
    const safeX = Math.max(10, Math.min(x, window.innerWidth - 160));
    const safeY = Math.max(10, Math.min(y, window.innerHeight - 90));

    setNoBtnStyle({
      position: 'fixed',
      left: `${safeX}px`,
      top: `${safeY}px`,
      transition: 'all 0.3s ease' // Smooth movement
    });
  };

  return (
    <div className="app-container">
      {!accepted ? (
        <div className="proposal-content">
          <h1 className="title">Will you be my Val?</h1>
          <div className="button-group">
            <button 
              className="btn btn-yes" 
              onClick={() => setAccepted(true)}
            >
              Yes
            </button>
            <button 
              className="btn btn-no"
              style={noBtnStyle}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onClick={handleNoInteraction} // Just in case a click gets through
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="success-content">
          <h1 className="message">Yay! You just made me the happiest person ❤️</h1>
          <div className="slideshow-container">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Memory ${index + 1}`}
                className={`slide-image ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
          <h1 className="message">I LOVE YOU SO MUCH ❤️</h1>
        </div>
      )}
    </div>
  )
}

export default App
