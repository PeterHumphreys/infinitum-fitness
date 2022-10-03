import AddInfoStrip from './AddInfoStrip';
import {useState, useRef} from 'react';

function AddInfoStripList({content, handleAddExercise, handleRemoveExercise, currentExercise, setCurrentExercise}) {
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        content.map((item) =>
        {
          if (currentExercise.id === item.id)
          {
          console.log(currentExercise.id)
          console.log(item.id)

          }
          return <AddInfoStrip 
            isCurrent = {currentExercise.id === item.id}
            key={item.uuid} 
            content={item} 
            handleAddExercise={handleAddExercise} 
            handleRemoveExercise={handleRemoveExercise}
            setCurrentExercise = {setCurrentExercise}/>
        } )}
    </div>
  )
}

export default AddInfoStripList