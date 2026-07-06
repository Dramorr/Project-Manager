import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import ThemeSwitcher from '../shared/ThemeSwitcher';

export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Logo className="header__logo"/>

          <nav className="header__nav">
            <ul className="header__list">
              <li><Link to="/">Projects</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
            </ul>
          </nav>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}