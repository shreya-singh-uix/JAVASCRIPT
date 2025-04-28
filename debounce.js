function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = (query) => {
  console.log(`Searching for ${query}`);
};

searchWithDebounce = debounce(search, 100);

searchWithDebounce("No");
searchWithDebounce("Node ");
searchWithDebounce("Node J");
searchWithDebounce("Node Js");
