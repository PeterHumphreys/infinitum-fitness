import DetailInfoStrip from './DetailInfoStrip';
import {useState, useRef} from 'react';


function DetailInfoStripList({exercises, handleRemoveExercise, handleEditOptions}) {
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        exercises.map((item) =>
        {
          return <DetailInfoStrip 
            key={item.uuid} 
            exercise = {item}
            handleRemoveExercise={handleRemoveExercise}
            handleEditOptions = {handleEditOptions}
            />
        } )}
    </div>
  )
}

export default DetailInfoStripList