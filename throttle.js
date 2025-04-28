function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

const chatMessage = (message) => {
  console.log(`sending message ${message}`);
};

const messagewithSlowMode = throttle(chatMessage, 2 * 1000);

messagewithSlowMode("HIi");
messagewithSlowMode("Hello");
messagewithSlowMode("Kya kr rhe ho");
messagewithSlowMode("whats up");
messagewithSlowMode("hello sir");
messagewithSlowMode("hhill");
