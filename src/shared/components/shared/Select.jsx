import { useEffect, useRef, useState } from "react"
import '../../../styles/components/_select.scss';

export default function Select({options, placeholder, className, onChange, ref, initialValue}){
  const [value, setValue] = useState(initialValue || placeholder || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const internalRef = useRef(null);
  const element = ref || internalRef;

  const chooseOption = (e) => {
    const newValue = e.target.closest('li').textContent;
    setValue(e.target.closest('li').textContent);
    element.current.value = newValue;

    // callback
    if(onChange) onChange(newValue);
  }

  useEffect(() => {
    if(!isOpen) return;

    const handleClickOutside = (e) => {
      if(element.current && !element.current.contains(e.target)){
        setIsOpen(false);
      }
    }
    const handleEscape = (e) => {
      if(e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen]);
  
  return (
    <div
      className={`${className} select ${isOpen ? 'open' : 'closed'}`}
      value={value} onClick={() => setIsOpen(!isOpen)}
      ref={element}
    >
      <p className="select__current">{value}</p>
      <ul className="select__options">
        {options.map((option) => (
          <li key={option} onClick={chooseOption}>{option}</li>
        ))}
      </ul>
    </div>
  )
}