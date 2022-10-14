import DetailInfoStrip from './DetailInfoStrip';
import { useContext } from 'react';
import RoutineFormContext from '../../../context/RoutineFormContext';

function DetailInfoStripList() {
  const {currentDay, daysAndExercises} = useContext(RoutineFormContext)
  const scheduledExercises= currentDay? daysAndExercises[currentDay] : []
  
  return (
    <div id="edit-exercise-list" className='info-strip-list' >
      {
        scheduledExercises.map((item) =>
        {
          return <DetailInfoStrip 
            key={item.uuid} 
            scheduledExercise = {item}
            />
        } )}
    </div>
  )
}

export default DetailInfoStripList