import Throttle from "./Throttle";

export default function Paralax(targets, container = document.documentElement){
  if(!targets || targets.length === 0 || !container) return;

  const handleMouseMove = Throttle((e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    [...targets].forEach(target => {
      target.style.transition = 'none';
      const amplifier = target.dataset.amplifier;
      target.style.setProperty('translate', `${x * amplifier}px ${y * amplifier}px`);
    });
  }, 16);

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', () => {
    [...targets].forEach(target => {
      target.style.transition = 'translate 0.4s ease-out';
      target.style.setProperty('translate', `0px 0px`)
    });
  });
}