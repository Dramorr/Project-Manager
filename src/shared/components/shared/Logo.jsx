import { Link } from "react-router-dom";
import LogoUrl from '/logo.svg';
import '../../../styles/components/_logo.scss';

export default function Logo({className}){
  return (
    <Link className={`logo ${className}`} to="/">
      <span style={{'--logo': `url(${LogoUrl})`}}></span>
    </Link>
  )
}