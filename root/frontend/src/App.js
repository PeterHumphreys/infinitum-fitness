import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home';
import Routines from './components/Components/Routines/RoutinePage/Routines';
import RoutinePage from './components/Pages/RoutinePage';
import NewRoutine from './components/Pages/NewRoutine'
import {Routes, Route, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "./utilities/api/routines";

function App() {
  const [headingOptions, setHeadingOptions] = useState({imgPath: null, title:'Home', canEdit:false});
  const [routines, setRoutines] = useState([]);

  let location = useLocation();

  //Changes header and aside content based on location
  useEffect(() =>
  {
    let pathName = location.pathname;
    let options = {imgPath: null, title:'', canEdit:false};
    //console.log(pathName)
    if (pathName === '/')
    {
      options.imgPath = null;
      options.title = 'Home';
      options.canEdit = false;
    }
    else if (pathName === '/routines')
    {
      options.imgPath = '/images/exercises/woman-running.jpg'
      options.title = 'Your Routines';
      options.canEdit = false;
    }
    else if (pathName === '/routines/new-routine')
    {
      options.imgPath = '/images/db-rows.jpg'
      options.title = 'New Workout Routine';
      options.canEdit = true;
    }
    setHeadingOptions(options)
  }, [location])

  useEffect(() =>
  {
    async function fetchRoutines()
    {
      try 
      {
        const response = await api.get('/routines');
        setRoutines(response.data.routines);
        console.log(response.data.routines);
      }
      catch(err)
      {
        console.log(err.message);
      }
    }

    fetchRoutines();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout options = {headingOptions}/>}>
        <Route index element={<Home/>} />
        <Route path='routines'>
          <Route index element={<Routines routines = {routines}/>}/>
          <Route path=':id' element={<RoutinePage routines = {routines}/>}/>
          <Route path='new-routine' element={<NewRoutine/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
