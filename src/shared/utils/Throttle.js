export default function Throttle(fn, delay){
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if(now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  }
}