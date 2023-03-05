import AddInfoStrip from './AddInfoStrip';
import {useState, useRef} from 'react';
import './InfoStrip.scss'

function AddInfoStripList({exerciseList, highlightedExercise, setHighlightedExercise}) {
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        exerciseList.map((item) =>
        {
          return <AddInfoStrip 
            key={item.id} 
            exercise={item} 
            isCurrent = {highlightedExercise.id === item.id}
            setHighlightedExercise = {setHighlightedExercise}/>
        } )
      }
    </div>
  )
}

export default AddInfoStripList