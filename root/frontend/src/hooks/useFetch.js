import {useState, useEffect} from "react";

function useFetch(url)
{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> 
  {
    async function fetchData(url)
    {
      setLoading(true);
      try 
      {
        const response = await fetch(url);
        const dataArray = await response.json();
        setData(dataArray);
      }
      catch(error)
      {
        console.log(error)
        setData([])
        setError(error);
      }
      finally 
      {
        setLoading(false)
      }
    }
    setTimeout(()=>{fetchData(url)}, 500);
  }, [url])

  return {data, loading, error};
}

export default useFetch;
