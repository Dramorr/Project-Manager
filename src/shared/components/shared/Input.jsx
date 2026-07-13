import { useEffect, useState } from "react"
import '../../../styles/components/_input.scss';

export default function Input({className, type, value, onChange, ref, placeholder}){
  const [isFilled, setIsFilled] = useState((value && value.length) || false);

  useEffect(() => {
    if(ref) setIsFilled(!!ref.current.value.length);
  }, [ref]);

  const handleChange = (e) => {
    setIsFilled(!!e.target.value.length);
    if(onChange) onChange(e);
  }

  return (
    <div className="input-wrapper">
      {placeholder && <label>{placeholder}</label>}
      { type !== 'textarea' ? 
        <input
          className={`${className} input ${isFilled && 'filled' }`}
          type={type || 'text'}
          
          ref={ref}
          value={value}
          onChange={handleChange}
        /> :
        <textarea
          className={`${className} input ${isFilled && 'filled' }`}
          
          ref={ref}
          value={value}
          onChange={handleChange}
        ></textarea>
      }
    </div>
  )
}