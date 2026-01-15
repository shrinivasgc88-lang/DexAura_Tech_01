import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="floating-nav1" data-testid="main-navbar">
      DexAura
    </nav>
     <nav className="floating-nav" data-testid="main-navbar">
      <Link to="/" className="nav-link" data-testid="nav-home">Home</Link>
      <Link to="/capabilities" className="nav-link" data-testid="nav-capabilities">Capabilities</Link>
      <Link to="/partners" className="nav-link" data-testid="nav-partners">Partners</Link>
      <Link to="/quality" className="nav-link" data-testid="nav-quality">Quality</Link>
      <Link to="/quote" className="nav-link" data-testid="nav-quote">Get Quote</Link>
      <Link to="/teamspace" className="nav-link" data-testid="nav-teamspace">Teamspace</Link>
      <Link to="/industries" className="nav-link" data-testid="nav-industries">Industries</Link>
      <Link to="/blog" className="nav-link" data-testid="nav-blog">Blog</Link>
      <Link to="/contact" className="nav-link" data-testid="nav-contact">Contact</Link>
    </nav>
</div>
  );
};

export default Navbar;
