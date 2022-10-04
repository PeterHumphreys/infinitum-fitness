import React from 'react'

function ExerciseDetails({exercise, imgPath, imgAltText}) {
  return (
    <div className='exercise-details'>
      <img src={imgPath} alt={imgAltText} className='circle'/>
      <h3>{exercise.name}</h3>
      <p className='description'>{exercise.description.replace(/(<([^>]+)>)/ig, '')}</p>
      <ul className='attributes'>
        <li>Category: </li>
        <li>Primary Muscles Targeted: </li>
        <li>Secondary Muscles Targeted: </li>
        <li>Equipment: </li>
        <li>Equipment: </li>
      </ul>
    </div>
  )
}

export default ExerciseDetails