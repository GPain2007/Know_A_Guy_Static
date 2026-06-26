import logo from "../../TrimLogo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header-section">
      <div className="header-content">
        <img src={logo} className="header-logo" alt="Oh I Know A Guy logo" />
        <h1 className="header-title">Oh..I KNOW A GUY! LLC</h1>
        <p className="header-tagline">Your trusted local service professionals</p>
        <div className="header-contact">
          <a href="tel:7372595124" className="header-phone">(737) 259-5124</a>
          <span className="header-divider">|</span>
          <a href="mailto:I.knowaguy.lawn1@gmail.com" className="header-email">
            I.knowaguy.lawn1@gmail.com
          </a>
        </div>
        <a href="#contact" className="header-cta">Get a Free Estimate</a>
      </div>
    </header>
  );
};
