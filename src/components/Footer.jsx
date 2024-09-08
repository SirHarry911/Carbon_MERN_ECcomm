import React from 'react';
import './Footer.css'; // Import your CSS file for styling
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h2>About Us</h2>
          <p>Enjoy the world of exclusive gadgets brought to you right at your Doorstep!</p>
        </div>
        <div className="footer-content">
          <h2>Contact Us</h2>
          <p>Email: harsimrat395.be22@chitkara.edu.in</p>
          <p>Phone: +916280857297</p>
        </div>
        <div className="footer-content">
          <h2>Follow Us <img src=""/></h2>
          <p><XIcon/> Twitter</p>
          <p><InstagramIcon /> Instagram</p>
          <p><FacebookIcon/> Facebook</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Carbon. All rights reserved.</p> 
      </div>
    </footer>
  );
}

export default Footer;
