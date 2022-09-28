import {useState} from 'react';


function WeekDay({day, id, handleChecked}) {
const [checked, setChecked] = useState(false);
  return (
    <>
      <input 
        type="checkbox" 
        id={id} 
        className="weekday"
        checked={checked}
        onChange={(event) => {
          setChecked(!checked)
          handleChecked(day)}}
        />
      <label htmlFor={id} >{day.charAt(0)}</label>
    </>
  )
}

export default WeekDay