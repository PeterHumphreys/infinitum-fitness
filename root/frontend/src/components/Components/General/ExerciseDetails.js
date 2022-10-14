import {useContext} from 'react';
import RoutineFormContext from '../../../context/RoutineFormContext';

function ExerciseDetails({highlightedExercise}) {
  return (
    <div className='exercise-details'>
      <img src={highlightedExercise.image.image_url} alt={highlightedExercise.image.image_alt_text} className='circle'/>
      <div>
        <h3>{highlightedExercise.name}</h3>
        <p className='description'>{highlightedExercise.description.replace(/(<([^>]+)>)/ig, '')}</p>
        <ul className='attributes'>
          <li>Category: </li>
          <li>Primary Muscles Targeted: </li>
          <li>Secondary Muscles Targeted: </li>
          <li>Equipment: </li>
          <li>Equipment: </li>
        </ul>
      </div>
    </div>
  )
}

export default ExerciseDetails