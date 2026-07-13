import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import '../styles/components/_confirm-popup.scss';

const ConfirmContext = createContext(null);
export function ConfirmProvider({children}){
  const [state, setState] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback((message) => {
    setState({message});
    return new Promise((resolve) => resolver.current = resolve);
  }, []);

  const handleAnswer = (result) => {
    setState(null);
    resolver.current?.(result);
    resolver.current = null;
  }
  useEffect(() => {
    if(!state) return;

    const handleEscape = (e) => {
      if(e.key === 'Escape') handleAnswer(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [state]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      { state && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup">
            <div className="confirmation-popup__message">{state.message}</div>
            <div className="confirmation-popup__btns">
              <button className="confirmation-popup__btn btn" onClick={() => handleAnswer(false)}>Cancel</button>
              <button className="confirmation-popup__btn btn" onClick={() => handleAnswer(true)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm(){
  const ctx = useContext(ConfirmContext);
  if(!ctx) throw new Error('Confirm Provider is not found');
  return ctx;
}