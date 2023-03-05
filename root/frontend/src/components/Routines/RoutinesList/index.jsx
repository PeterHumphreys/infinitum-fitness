import RoutineBox from './RoutineBox';
import {Link} from 'react-router-dom';
import {FaPlusSquare} from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';

function Routines() {
  const {routines, routineError, routineLoading} = useContext(DataContext)
  return (

    <main className='Routines content-container'>
      <div className='content-grid'>
        {
          routineLoading && <p>Loading...</p>
        }
        {
          !routineLoading && routineError && <p>An error occurred.</p>
        }
        {
          !routineLoading && !routineError && routines.map((routine) =>
          {
            return <RoutineBox key={routine.id} routine={routine}/>
          })
        }
        <Link to='new-routine' className='add-icon'>New Routine<FaPlusSquare/></Link>
      </div>

    </main>
  )
}

export default Routines