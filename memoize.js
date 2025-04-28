function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Taking the answer from cache");
      return cache.get(key);
    }

    console.log("not exist in chache so calculating...");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function multiply(a, b) {
  return a + b;
}

const memoizeMultiply = memoize(multiply);

console.log(memoizeMultiply(23, 34));
console.log(memoizeMultiply(23, 34));
console.log(memoizeMultiply(23, 31));
console.log(memoizeMultiply(20, 34));
console.log(memoizeMultiply(12, 34));
console.log(memoizeMultiply(12, 34));
console.log(memoizeMultiply(23, 5));
