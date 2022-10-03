import {useState} from 'react';
import {MdOutlineExpandMore} from 'react-icons/md';
import {FaMinusSquare, FaPlusSquare} from 'react-icons/fa';


function AddInfoStrip({content, handleAddExercise, handleRemoveExercise, setCurrentExercise, isCurrent}) {
  const [selected, setSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`info-strip add-info-strip ${selected ? 'selected' : ''} ${isCurrent ? 'current-exercise' : ''}`}
      onClick={()=>{setCurrentExercise(content)}}>
      
      <img src="/images/exercises/jacked-dude-squatting.jpg" alt= "Person doing things" className="circle"/>
      <h4>{content.name}</h4>
      {
        !selected ? <FaPlusSquare onClick={(e) => 
        {
          setSelected(true)
          handleAddExercise(content.id);
          }
        }/> : <FaMinusSquare onClick={(e) => 
          {
            setSelected(false)
            handleRemoveExercise(content.id);
            }}/>
      }
    </div>
  )
}

export default AddInfoStrip