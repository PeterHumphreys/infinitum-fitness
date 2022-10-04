
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa';
import WorkoutDays from './WorkoutDays';
import DetailInfoStripList from '../../../General/DetailInfoStripList';

function EditExercise({activeDays, currentDay, setCurrentDay, exercises, handleModalToggle, handleRemoveExercise, handleEditOptions}) {
  return (
    <div className="input-container">
      <WorkoutDays 
        activeDays = {activeDays} 
        currentDay={currentDay} 
        setCurrentDay={setCurrentDay}
      />

      <DetailInfoStripList 
        exercises = {exercises}
        handleRemoveExercise={handleRemoveExercise}
        handleEditOptions = {handleEditOptions}
      />

      <div id='add-remove-workout'>          
        <button className="btn-icon"
          onClick={(e)=>{handleModalToggle(e, true)}}><FaPlusSquare/></button>
      </div>
    </div>
  )
}

export default EditExercise