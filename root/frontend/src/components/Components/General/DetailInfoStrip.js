import {FaMinusSquare} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';
import {useState, useEffect} from 'react';
import { useContext } from 'react';
import RoutineFormContext from '../../../context/RoutineFormContext';

function DetailInfoStrip({scheduledExercise}) {
  const {handleDirectlyRemoveExercise} = useContext(RoutineFormContext);
  const [sets, setSets] = useState(scheduledExercise.sets ? scheduledExercise.sets: 3);
  const [reps, setReps] = useState(scheduledExercise.reps ? scheduledExercise.reps :12);
  const [weight, setWeight] = useState(scheduledExercise.weight ? scheduledExercise.weight : 120);
  const [rest, setRest] = useState(scheduledExercise.rest ? scheduledExercise.rest : 90);


  useEffect(() =>
  {
    scheduledExercise.sets = sets;
    scheduledExercise.reps = reps;
    scheduledExercise.weight = weight;
    scheduledExercise.rest = rest;
  }, [sets, reps, weight, rest]);

  return (
    <div className='info-strip detail-info-strip'>
      <div className='info-strip-wrapper'>
        <img src={scheduledExercise.exercise.image.image_url} alt= {scheduledExercise.exercise.image.image_alt_text} className="circle"/>
        <div>
          <h4>{scheduledExercise.exercise.name}</h4>
          <ul>
            <li><label>Sets:</label> <input type="number" min={1} max={20} value={sets} onChange={(e)=>{setSets(e.target.value)}}></input></li>
            <li><label>Reps:</label> <input type="number" min={1} max={200}  value={reps} onChange={(e)=>{setReps(e.target.value)}}></input></li>
            <li><label>Weight:</label> <input type="number" min={1} max={1000}  value={weight} onChange={(e)=>{setWeight(e.target.value)}}></input></li>
            <li><label>Rest:</label> <input type="number" min={1} max={500}  value={rest} onChange={(e)=>{setRest(e.target.value)}}></input></li>
          </ul>
        </div>
        
        <button className="btn-icon" onClick={() => (handleDirectlyRemoveExercise(scheduledExercise.uuid))}><FaMinusSquare/></button>
      </div>

    </div>
  )
}

export default DetailInfoStrip