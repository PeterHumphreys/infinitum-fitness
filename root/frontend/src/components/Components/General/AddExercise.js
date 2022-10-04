import AddInfoStripList from "./AddInfoStripList"
import ExerciseDetails from "./ExerciseDetails";
import {useState} from 'react';

function AddExercise({currentDay, exercises, activeExercisesForDay, handleAddExercise, handleRemoveExercise}) {

  //The exercise whose details are currently being view.  Does not necessarily
  //represent a currently active exercise
  const [highlightedExercise, setHighlightedExercise] = useState(exercises[0]);
  
  return (
    <div className="modal-children">
      <ExerciseDetails 
        exercise={highlightedExercise}/>
      <AddInfoStripList 
        currentDay = {currentDay}
        exercises = {exercises} 
        activeExercisesForDay = {activeExercisesForDay}
        handleAddExercise = {handleAddExercise} 
        handleRemoveExercise = {handleRemoveExercise} 
        highlightedExercise={highlightedExercise} 
        setHighlightedExercise = {setHighlightedExercise}
      />
    </div>
  )
}

export default AddExercise