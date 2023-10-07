export default function throttle(cb: any, delay = 250) {
  let shouldWait = false;

  return (...args: any) => {
    if (shouldWait) return;

    cb(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}
