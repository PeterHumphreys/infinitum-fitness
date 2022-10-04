import {FaMinusSquare} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';
import {useState, useEffect} from 'react';


function DetailInfoStrip({exercise, handleRemoveExercise, handleEditOptions}) {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState(120);
  const [rest, setRest] = useState(90);

  useEffect(() =>
  {
    exercise.sets = sets;
    exercise.reps = reps;
    exercise.weight = weight;
    exercise.rest = rest;
  }, [sets, reps, weight, rest]);

  return (
    <div className='info-strip detail-info-strip'>
      <img src="/images/exercises/jacked-dude-squatting.jpg" alt= "Person doing things" className="circle"/>
      <div>
        <h4>{exercise.name}</h4>
        <ul>
          <li><label>Sets:</label> <input type="number" min={1} max={20} value={sets} onChange={(e)=>{setSets(e.target.value)}}></input></li>
          <li><label>Reps:</label> <input type="number" min={1} max={200}  value={reps} onChange={(e)=>{setReps(e.target.value)}}></input></li>
          <li><label>Weight:</label> <input type="number" min={1} max={1000}  value={weight} onChange={(e)=>{setWeight(e.target.value)}}></input></li>
          <li><label>Rest:</label> <input type="number" min={1} max={500}  value={rest} onChange={(e)=>{setRest(e.target.value)}}></input></li>
        </ul>
      </div>
      
      {/*<button className="btn-icon" onClick={(e) =>{handleEditOptions(e)}}><FiEdit/></button>*/}
      <button className="btn-icon" onClick={() => (handleRemoveExercise(exercise.id))}><FaMinusSquare/></button>
    </div>
  )
}

export default DetailInfoStrip