import { NavLink } from 'react-router-dom';
import Logo from '../shared/Logo';
import ThemeSwitcher from '../shared/ThemeSwitcher';
import { useState } from 'react';

export default function Header(){
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleBurger = () => {
    setIsNavOpen(prev => !prev);
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Logo className="header__logo"/>

          <nav className={`header__nav ${isNavOpen ? 'open' : ''}`}>
            <ul className="header__list">
              <li><NavLink to="/" end onClick={() => setIsNavOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/projects" onClick={() => setIsNavOpen(false)}>My Projects</NavLink></li>
            </ul>
            
            <ThemeSwitcher />
          </nav>

          <button
            className={`header__burger ${isNavOpen ? 'clicked' : ''}`}
            onClick={toggleBurger}
          ><span></span></button>
        </div>
      </div>
    </header>
  )
}