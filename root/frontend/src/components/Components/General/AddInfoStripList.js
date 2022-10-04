import AddInfoStrip from './AddInfoStrip';
import {useState, useRef} from 'react';

function AddInfoStripList({currentDay, exercises, activeExercisesForDay, handleAddExercise, handleRemoveExercise, highlightedExercise, setHighlightedExercise}) {
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        exercises.map((item) =>
        {
          return <AddInfoStrip 
            activeExercisesForDay = {activeExercisesForDay}
            currentDay = {currentDay}
            isCurrent = {highlightedExercise.id === item.id}
            key={item.uuid} 
            content={item} 
            handleAddExercise={handleAddExercise} 
            handleRemoveExercise={handleRemoveExercise}
            setHighlightedExercise = {setHighlightedExercise}/>
        } )}
    </div>
  )
}

export default AddInfoStripList