import {useState, useEffect} from 'react';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import { useContext } from 'react';
import RoutineFormContext from '../../../context/RoutineFormContext';

function AddInfoStrip({exercise, setHighlightedExercise, isCurrent}) {
  const {currentDay, tempExercises, handleAddExercise, handleRemoveExercise} = useContext(RoutineFormContext);
  const [active, setActive] = useState(false);

  //Whenever the currentDay is switched OR the list of activeExercisesForDay changes, 
  //check if this exercise is included in currentDay's list of exercises 
  //and set active state to true if it is and false otherwise
  useEffect(() => {
    let isActive = false;
    tempExercises.forEach((scheduledExercise) =>
    {
      if (scheduledExercise.exercise.id === exercise.id)
      {
        isActive = true;
        return;
      }
    })
    setActive(isActive);
  }, [currentDay, tempExercises])


  return (
    <div className={`info-strip add-info-strip ${active ? 'selected' : ''} ${isCurrent ? 'current-exercise' : ''}`}
      onClick={()=>{ setHighlightedExercise(exercise)}}>
      <div className='info-strip-wrapper'>
        <img src={exercise.image.image_url} alt= {exercise.image.image_alt_text} className="circle"/>
        <h4>{exercise.name}</h4>
      </div>
      <button className='icon-right btn-icon'>
        {
          !active ? <AiOutlinePlus
            onClick={(e) => 
            {
              e.preventDefault();
              setActive(true)
              handleAddExercise(exercise.id);
              }
            }/> : 
            <AiOutlineMinus
              onClick={(e) => 
              {
                
                e.preventDefault();
                setActive(false)
                //Get the uuid of the scheduled exercise
                let uuidToDelete = null;
                tempExercises.forEach(
                  (activeExercise)=>
                  {
                    if (activeExercise.exercise.id === exercise.id)
                    {
                      uuidToDelete = activeExercise.uuid;
                    }
                  })
                  //Should never be null, at this point, but just make sure before removing
                  if (uuidToDelete)
                  {
                    handleRemoveExercise(uuidToDelete);
                  }
                }}/>
          }
        </button>
    </div>
  )
}

export default AddInfoStrip