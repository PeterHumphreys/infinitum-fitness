import {useState, useEffect} from 'react';
import ImageBox from './ImageBox.jsx';
import useFetch from '../../hooks/useFetch';

function Home() {
  
  const {data : workoutData, loading : workoutLoading, error : workoutError } = useFetch("home/discover-new-workouts");
  const {data : storeData, loading : storeLoading, error : storeError } = useFetch("home/store-items");

  const [featuredWorkouts, setFeaturedWorkouts] = useState([]);
  const [storeItems, setStoreItems] = useState([]);

  useEffect(()=>
  {
    setFeaturedWorkouts(workoutData);
  }, [workoutData]);

  useEffect(()=>
  {
    setStoreItems(storeData);
  }, [storeData]);

  /*useEffect(()=>
  {
    console.log("Invoking use effect")
    setStoreItems(storeData);
    console.log("State:")
    console.log(storeItems)
    console.log("data:")
    console.log(storeData)
    console.log("Loading:")
    console.log(storeLoading)
  }, [storeData]);*/

  return (
    <main className='Home content-container'>
        <h2>Discover New Workouts</h2>
        <section className="featured-grid" id="new-workouts-grid">
          {
            workoutLoading && <p>Loading...</p>
          }
          {
            !workoutLoading && workoutError && <p>An error occurred.</p>
          }
          {
            !workoutLoading && !workoutError && featuredWorkouts.map((item) =>
            {
              return <ImageBox key={`dnw-${item.id}`} item = {item}/>
            })
          }
        </section>

        <h2>Hot Items in the Store</h2>
        <section className="featured-grid" id="store-grid">
          {
            storeLoading && <p>Loading...</p>
          }
          {
            !storeLoading && storeError && <p>An error occurred.</p>
          }
          {
            !storeLoading && !storeError && storeItems.map((item) =>
            {
              return <ImageBox key={`store-${item.id}`} item = {item}/>
            })
          }

        </section>

    </main>
  )
}

export default Home