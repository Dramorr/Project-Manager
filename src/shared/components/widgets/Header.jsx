import { Link } from 'react-router-dom';
import Logo from '../../../assets/vite.svg';

export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <img src={Logo} alt="Site Name" />
          </Link>

          <nav className="header__nav">
            <ul className="header__list">
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>

          header
        </div>
      </div>
    </header>
  )
}