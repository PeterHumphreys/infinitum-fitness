import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home';
import Dashboard from './components/Pages/Dashboard';
import Schedule from './components/Pages/Schedule';
import Routines from './components/Components/Routines/RoutinePage/Routines';
import Nutrition from './components/Pages/Nutrition';
import Store from './components/Pages/Store';
import Help from './components/Pages/Help';
import Settings from './components/Pages/Settings';
import RoutinePage from './components/Pages/RoutinePage';
import NewRoutine from './components/Pages/NewRoutine'
import {Routes, Route, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "./utilities/api/routines";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [headingOptions, setHeadingOptions] = useState({imgPath: null, altText:'', title:'Loading...'});
  const [accountBoxData, setAccountBoxData] = useState({name: '', photo: null, altText: ''});
  const [user, setUser] = useState();
  const [routines, setRoutines] = useState([]);

  let location = useLocation();

  useEffect(() =>
  {
    async function fetchRoutines()
    {
      //setIsLoading(true);
      try 
      {
        const response = await api.get('/routines');
        setRoutines(response.data.routines);
      }
      catch(err)
      {
        console.log(err.message);
      }
      finally
      {
        //setIsLoading(false);
      }
    }

    async function fetchUser()
    {
      try 
      {
        //hard coded as test user for now
        const response = await api.get('/users/users-by-id/2');
        setUser(response.data);
      }
      catch(err)
      {
        //TODO: Add fetchError state + message
        console.log(err.message);
      }
      finally
      {
        setIsLoading(false);
      }
    }
    setTimeout(fetchUser, 1000);
    setTimeout(fetchRoutines, 1000);
  }, [])

  useEffect(()=>
  {
    if(!isLoading)
    {
      setOptions();

    }
  }, [location, isLoading])

  useEffect(() =>
  {
    if (!isLoading)
    {
      setAccountBoxData({name : `${user.user_first_name} ${user.user_last_name}`, photo: user.user_profile_photo_URL, altText : `${user.user_first_name} ${user.user_last_name}` });
    }
  }, [isLoading])

  function setSidebar()
  {

  }


  //Changes header and aside content based on location
  function setOptions()
  {
      let pathName = location.pathname;
      let options = {imgPath: null, altText:'', title:''};
      //console.log(pathName)
      if (pathName === '/')
      {
        let timeNow = new Date().getHours(), greetingString;
        if (timeNow >= 0 && timeNow < 12)
            greetingString = "Morning";
        else if (timeNow >= 12 && timeNow <= 18)
            greetingString = "Afternoon";
        else    
            greetingString = "Evening";
          options.imgPath = null;
          options.title = `Good ${greetingString}, ${user.user_first_name}!`;
      }
      else if (pathName === '/routines')
      {
        options.imgPath = user.user_profile_photo_URL;
        options.altText = `${user.user_first_name} ${user.user_last_name}`;
        options.title = 'Your Routines';
      }
      else if (pathName === '/routines/new-routine')
      {
        options.imgPath = '/images/db-rows.jpg'
        options.altText = 'New Workout Routine';
        options.title = 'New Workout Routine';
      }
      setHeadingOptions(options);

  }


  return (
    <Routes>
      <Route path="/" element={<Layout isLoading = {isLoading} options = {headingOptions} accountBoxData = {accountBoxData}/>}>
        <Route index element={<Home/>} />
        <Route path='dashboard'>
          <Route index element={<Dashboard/>}/>
        </Route>
        <Route path='schedule'>
          <Route index element={<Schedule/>}/>
        </Route>
        <Route path='routines'>
          <Route index element={<Routines routines = {routines}/>}/>
          <Route path=':id' element={<RoutinePage routines = {routines}/>}/>
          <Route path='new-routine' element={<NewRoutine/>}/>
        </Route>
        <Route path='nutrition'>
          <Route index element={<Nutrition/>}/>
        </Route>
        <Route path='store'>
          <Route index element={<Store/>}/>
        </Route>
        <Route path='help'>
          <Route index element={<Help/>}/>
        </Route>
        <Route path='settings'>
          <Route index element={<Settings/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
