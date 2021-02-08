import { useState, useEffect, useCallback, useRef } from 'react';


const useDebouncedEffect = (effect, delay , deps) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        console.log("useeff-> debounce")
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
}


const useThrottledEffect = (callback, delay, deps = []) => {
    const lastRan = useRef(Date.now());
  
    useEffect(
      () => {
          console.log("useeff-> throttle")
        const handler = setTimeout(function() {
          if (Date.now() - lastRan.current >= delay) {
            callback();
            lastRan.current = Date.now();
          }
        }, delay - (Date.now() - lastRan.current));
  
        return () => {
          clearTimeout(handler);
        };
      },
      [delay, ...deps],
    );
  };



function throttle(callback, limit, time) {
    var calledCount = 0;
    var timeout = null;

    return function () {
        if (limit > calledCount) {
            calledCount++;
            callback(); 
        }
        if (!timeout) {
            timeout = setTimeout(function () {
                calledCount = 0
                timeout = null;
            }, time);
        }
    };
}


const infiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    const stop = useRef(false);
  
  useThrottledEffect(() => {
      window.addEventListener('scroll', throttledScroll());
      return () => window.removeEventListener('scroll', throttledScroll())}, 500);
  
      useDebouncedEffect(() => {
      if (!isFetching) {
          return
      }else{
      callback()
      }
    }, 500,[isFetching]);
  
    function handleScroll() {
      console.log("scroll")
      if (window.innerHeight + document.documentElement.scrollTop <= Math.floor(document.documentElement.offsetHeight * 0.75) || isFetching) return;
      if (!stop.current) setIsFetching(true);
    }
  
    function throttledScroll() {
        return throttle(handleScroll, 2, 500)
    }
  
    return [isFetching, setIsFetching, stop];
  };

  export {infiniteScroll};
  