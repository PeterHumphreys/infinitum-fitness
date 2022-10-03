import DetailInfoStrip from './DetailInfoStrip';
import {useState, useRef} from 'react';


function DetailInfoStripList({content, handleSelectExercise}) {
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        content.map((content) =>
        {
          return <DetailInfoStrip key={content.uuid} content={content} handleSelectExercise={handleSelectExercise}/>
        } )}
    </div>
  )
}

export default DetailInfoStripList