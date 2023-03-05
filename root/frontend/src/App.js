import Layout from './components/__layout/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Routines from './components/Routines/RoutinesList';
import Nutrition from './components/Nutrition';
import Store from './components/Store';
import Help from './components/Help';
import Settings from './components/Settings';
import RoutineInfo from './components/Routines/RoutineInfo';
import NewRoutine from './components/Routines/NewRoutine'
import UserProfile from './components/UserProfile';
import {Routes, Route} from "react-router-dom";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='dashboard'>
          <Route index element={<Dashboard/>}/>
        </Route>
        <Route path='schedule'>
          <Route index element={<Schedule/>}/>
        </Route>
        <Route path='routines'>
          <Route index element={<Routines/>}/>
          <Route path=':id' element={<RoutineInfo/>}/>
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
        <Route path='user-profile'>
          <Route index element={<UserProfile/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
