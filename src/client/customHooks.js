import { useState, useEffect, useRef } from "react";

const useThrottledEffect = (callback, delay, deps = []) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - lastRan.current >= delay) {
        callback();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const infiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const stop = useRef(false);

  useThrottledEffect(() => {
    window.addEventListener("scroll", debounceScroll());
    return () => window.removeEventListener("scroll", debounceScroll());
  }, 500);

  useThrottledEffect(
    () => {
      if (!isFetching) {
        return;
      } else {
        callback();
      }
    },
    500,
    [isFetching]
  );

  function handleScroll() {
    console.log("scroll");
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        Math.floor(document.documentElement.offsetHeight * 0.75) ||
      isFetching
    )
      return;
    if (!stop.current) setIsFetching(true);
  }

  function debounceScroll() {
    return debounce(handleScroll, 100, false);
  }

  return [isFetching, setIsFetching, stop];
};

export { infiniteScroll };
