import AddInfoStripList from "./AddInfoStripList"
import ExerciseDetails from "./ExerciseDetails";
import {useContext, useState} from 'react';
import RoutineFormContext from "../../../context/RoutineFormContext";

function AddExercise() {

  const {exerciseList, handleExerciseModalToggle} = useContext(RoutineFormContext);

  //The exercise whose details are currently being viewed.  Does not necessarily
  //represent a currently active exercise
  const [highlightedExercise, setHighlightedExercise] = useState(exerciseList[0]);
  
  return (
    <div className="modal-children">
      <ExerciseDetails highlightedExercise={highlightedExercise}/>
      <AddInfoStripList 
        exerciseList={exerciseList}
        highlightedExercise={highlightedExercise} 
        setHighlightedExercise = {setHighlightedExercise}
      />
      <button 
        className='btn-dark btn-save'
        onClick={(e)=>
          {
            e.preventDefault();
            handleExerciseModalToggle(e, false);}
          }>Save</button>
    </div>
  )
}

export default AddExercise