import {useState, useEffect} from "react"
function useWindowSize() 
{
  const [windowSize, setWindowSize] = useState(
    {
      width:undefined,
      height:undefined
    }
  );

  useEffect(() =>
  {
    function handleResize()
    {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    //window.addEventListener("load", handleResize)

    return () => 
    {
      return window.removeEventListener("resize", handleResize) 
      //window.removeEventListener("load", handleResize) 
    }
  }, []);

  return windowSize;
}

export default useWindowSize