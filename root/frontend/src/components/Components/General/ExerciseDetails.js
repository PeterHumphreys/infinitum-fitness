import React from 'react'

function ExerciseDetails({exercise, imgPath, imgAltText}) {
  return (
    <div>
      <h4>{exercise.name}</h4>
      <ul>
        <li><span>Sets:</span> <span></span></li>
        <li><span>Reps:</span> <span></span></li>
        <li><span>Weight:</span> <span> lbs</span></li>
        <li><span>Rest:</span> <span> secs</span></li>
      </ul>
    </div>
  )
}

export default ExerciseDetails