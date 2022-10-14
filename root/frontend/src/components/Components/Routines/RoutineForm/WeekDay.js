import {useState} from 'react';
import { useContext } from 'react';
import RoutineFormContext from '../../../../context/RoutineFormContext';

function WeekDay({day, id}) {
  const {handleChecked} = useContext(RoutineFormContext);

  const [checked, setChecked] = useState(false);
  return (
    <>
      <input 
        type="checkbox" 
        id={id} 
        className="weekday"
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          handleChecked(day)}}
        />
      <label htmlFor={id} >{day.charAt(0)}</label>
    </>
  )
}

export default WeekDay