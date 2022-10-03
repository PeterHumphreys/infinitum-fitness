import {useState, useEffect} from 'react';
import api from '../../utilities/api/routines'
import ImageBox from '../Components/Home/ImageBox';

function Home(isLoading) {
  const [data, setData] = useState();
  //Get rid of this 
  const [dataLoading, setDataLoading] = useState(true);


  useEffect(()=>
  {
    async function getHomeData()
    {
      try
      {
        const response = await api.get("/home");
        setData(response.data)
      }
      catch(err)
      {
        console.log(err)
      }
      finally
      {
        setDataLoading(false);
      }
    }

    getHomeData();
  }, [])


  return (
    <main className='Home content-container'>
        <h2>Discover New Workouts</h2>
        <section className="featured-grid" id="new-workouts-grid">
          {
            dataLoading && <p>Loading...</p>
          }
          {
            !dataLoading && data.discoverNewWorkouts.map((item, index) =>
            {
              return <ImageBox key={`dnw-${item.id}`} item = {item}/>
            })
          }
        </section>

        <h2>Hot Items in the Store</h2>
        <section className="featured-grid" id="store-grid">
          {
            dataLoading && <p>Loading...</p>
          }
          {
            !dataLoading && data.storeItems.map((item, index) =>
            {
              return <ImageBox key={`dnw-${item.id}`} item = {item}/>
            })
          }

        </section>

    </main>
  )
}

export default Home