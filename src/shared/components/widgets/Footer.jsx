import { Link } from 'react-router-dom';
import Logo from '../../../assets/vite.svg';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link className="footer__logo" to="/">
            <img src={Logo} alt="Site Name" />
          </Link>
        </div>
      </div>
    </footer>
  )
}