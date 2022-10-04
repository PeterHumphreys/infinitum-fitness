import {useState, useEffect} from 'react';
import {MdOutlineExpandMore} from 'react-icons/md';
import {FaMinusSquare, FaPlusSquare} from 'react-icons/fa';


function AddInfoStrip({activeExercisesForDay, currentDay, content, handleAddExercise, handleRemoveExercise,  setHighlightedExercise, isCurrent}) {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);

  //Whenever the currentDay is switched OR the list of activeExercisesForDay changes, 
  //check if this exercise is included in currentDay's list of exercises 
  //and set active state to true if it is and false otherwise
  useEffect(() => {
    let isActive = false;
    activeExercisesForDay.forEach((exercise) =>
    {
      if (exercise.id === content.id)
      {
        isActive = true;
        return;
      }
    })
    setActive(isActive);
  }, [currentDay, activeExercisesForDay])


  return (
    <div className={`info-strip add-info-strip ${active ? 'selected' : ''} ${isCurrent ? 'current-exercise' : ''}`}
      onClick={()=>{ setHighlightedExercise(content)}}>
      
      <img src="/images/exercises/jacked-dude-squatting.jpg" alt= "Person doing things" className="circle"/>
      <h4>{content.name}</h4>
      {
        !active ? <FaPlusSquare onClick={(e) => 
        {
          setActive(true)
          handleAddExercise(content.id);
          }
        }/> : <FaMinusSquare onClick={(e) => 
          {
            setActive(false)
            handleRemoveExercise(content.id);
            }}/>
      }
    </div>
  )
}

export default AddInfoStrip