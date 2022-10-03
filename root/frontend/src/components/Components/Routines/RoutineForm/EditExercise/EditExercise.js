
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa';
import WorkoutDays from './WorkoutDays';
import DetailInfoStripList from '../../../General/DetailInfoStripList';

function EditExercise({activeDays, handleModalToggle, exercises}) {
  return (
    <div className="input-container">
      <WorkoutDays activeDays = {activeDays}/>
      <DetailInfoStripList content = {exercises}/>
      <div id='add-remove-workout'>          
        <button className="btn-icon"
          onClick={(e)=>{handleModalToggle(e, true)}}><FaPlusSquare/></button>
      </div>
    </div>
  )
}

export default EditExercise