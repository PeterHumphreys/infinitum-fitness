import AddInfoStripList from "./AddInfoStripList"
import ExerciseDetails from "./ExerciseDetails";
import {useState} from 'react';

function AddExercise({content, handleAddExercise, handleRemoveExercise}) {
  const [currentExercise, setCurrentExercise] = useState(content[0]);
  return (
    <div className="modal-children">
      <ExerciseDetails exercise={currentExercise}/>
      <AddInfoStripList content = {content} handleAddExercise = {handleAddExercise} handleRemoveExercise = {handleRemoveExercise} currentExercise={currentExercise} setCurrentExercise = {setCurrentExercise}/>
    </div>
  )
}

export default AddExercise