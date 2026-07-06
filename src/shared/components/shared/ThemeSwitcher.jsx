import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import '../../../styles/components/_theme-switcher.scss';

export default function (){
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={`theme-switcher theme-${theme} ${theme === 'light' ? '' : 'switched' }`} onClick={toggleTheme}>
      <span></span>
    </button>
  ) 
}