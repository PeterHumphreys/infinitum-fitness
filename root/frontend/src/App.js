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
          <Route path=':id' element={<RoutinePage/>}/>
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
