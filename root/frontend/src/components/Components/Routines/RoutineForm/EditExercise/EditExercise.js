
import {FaPlusSquare} from 'react-icons/fa';
import WorkoutDays from './WorkoutDays';
import DetailInfoStripList from '../../../General/DetailInfoStripList';
import { useContext } from 'react';
import RoutineFormContext from '../../../../../context/RoutineFormContext';

function EditExercise() {
  const {handleExerciseModalToggle} = useContext(RoutineFormContext);
  return (
    <>
      <WorkoutDays />

      <DetailInfoStripList />

      <div id='add-remove-workout'>          
        <button className="btn-icon"
          onClick={(e)=>{handleExerciseModalToggle(e, true)}}><FaPlusSquare/></button>
      </div>
    </>
  )
}

export default EditExercise