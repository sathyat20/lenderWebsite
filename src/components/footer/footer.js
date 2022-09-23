import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import './footer.scss';

function Footer() {
  return (
    <footer>
      <div className="footer-content" />
      <div className="footer-links">
        <h3 className="footer-name">LENDER</h3>
        <div className="sub-links">
          <a className="footer-links" href="#termsofuse">
            <p id="single-link">Terms of Use</p>
          </a>
          <a className="footer-links" href="#privacypolicy">
            <p href="#" id="single-link">Privacy Policy</p>
          </a>
          <a className="footer-links" href="#refundpolicy">
            <p href="#" id="single-link">Refund Policy</p>
          </a>
          <a className="footer-links" href="#disclaimer">
            <p href="#" id="single-link">Disclaimer</p>
          </a>
        </div>
        <div className="social-media-icons">
          <InstagramIcon href="#" id="single-icon" />
          <FacebookIcon href="#" id="single-icon" />
          <MailOutlineIcon href="#" id="single-icon" />
          <TwitterIcon href="#" id="single-icon" />
        </div>
      </div>
      <div className="copyrights">
        ©2022 Lender. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
