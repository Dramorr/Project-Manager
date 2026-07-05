import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <img src="./favicon.svg" alt="Site Name" />
          </Link>

          <nav className="header__nav">
            <ul className="header__list">
              <li><Link to="/">Projects</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}