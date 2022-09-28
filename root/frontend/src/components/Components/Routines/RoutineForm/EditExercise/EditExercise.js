
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa';
import WorkoutDays from './WorkoutDays';
import EditExerciseList from './EditExerciseList';

function EditExercise({activeDays, handleModalToggle}) {
  return (
    <div className="input-container">
      <WorkoutDays activeDays = {activeDays}/>
      <EditExerciseList/>
      <div id='add-remove-workout'>          
        <button className="btn-icon"><FaMinusSquare/></button>
        <button className="btn-icon"
          onClick={handleModalToggle}><FaPlusSquare/></button>
      </div>
    </div>
  )
}

export default EditExercise