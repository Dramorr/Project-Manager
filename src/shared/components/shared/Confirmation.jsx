import { useState } from "react"

export default function Confirmation(){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="confirmation-popup">
      <button className="confirmation-popup__btn">Cancel</button>
      <button className="confirmation-popup__btn">Confirm</button>
    </div>
  )
}