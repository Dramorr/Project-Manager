import Logo from '../shared/Logo';
import Socials from '../shared/Socials';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Logo className="footer__logo" />

          <Socials />
        </div>
      </div>
    </footer>
  )
}