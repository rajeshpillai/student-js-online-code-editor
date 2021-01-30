export function debounce(func, wait = 250) {
  let timeoutId; 

  return function executedFunction (...args) {
    let context = this; 
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  }
}