import RoutineBox from './RoutineBox';
import {Link} from 'react-router-dom';
import {FaPlusSquare} from 'react-icons/fa';

function Routines({routines}) {
  return (

    <main className='Routines content-container'>
      <div className='content-grid'>
        {
          routines.map((routine) =>
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