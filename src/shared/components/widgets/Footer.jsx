import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link className="footer__logo" to="/">
            <img src="./favicon.svg" alt="Site Name" />
          </Link>
        </div>
      </div>
    </footer>
  )
}