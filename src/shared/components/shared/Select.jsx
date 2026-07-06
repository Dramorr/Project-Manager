import { useRef, useState } from "react"
import '../../../styles/components/_select.scss';

export default function Select({options, placeholder, className, onChange}){
  const [value, setValue] = useState(placeholder || options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const element = useRef(null);

  const chooseOption = (e) => {
    const newValue = e.target.closest('li').textContent;
    setValue(e.target.closest('li').textContent);
    if(onChange) onChange(newValue);
  }
  
  return (
    <div className={`${className} select ${isOpen ? 'open' : 'closed'}`} value={value} onClick={() => setIsOpen(!isOpen)} ref={element}>
      <p className="select__current">{value}</p>
      <ul className="select__options">
        {options.map((option) => (
          <li key={option} onClick={chooseOption}>{option}</li>
        ))}
      </ul>
    </div>
  )
}