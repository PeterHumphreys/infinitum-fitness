import {useState, useEffect, useRef} from 'react';

function useScrolled() {
  const SCROLL_BREAKPOINT = 70;
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>
  {
    window.addEventListener("scroll", ()=> {
      let scrollPosY = window.scrollY;
        if (scrollPosY > SCROLL_BREAKPOINT && !scrolled )
        {
          setScrolled(true)
        }
        else if (scrollPosY <= SCROLL_BREAKPOINT && scrolled)
        {
          setScrolled(false);
        }
      }
    )
  },[]);

  return scrolled;
}

export default useScrolled