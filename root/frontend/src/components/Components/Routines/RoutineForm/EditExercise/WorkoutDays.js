import {useEffect} from 'react';

function WorkoutDays({activeDays, currentDay, setCurrentDay}) {
  
  /**
   * Used to handle edge cases when changing the current day does not 
   * trigger the onChange handler.
   * 
   * If there is only 1 option, the select onChange handler is not invoked.  
   * Thus, we need to manually obtain the day that has a true value and set the currentDay to it.
   * 
   * If the current day is not an empty string and is removed as an activeDay
   * we need to manually set it to either the first true day or an empty string
   * if no more true days exist
   */
  useEffect(() =>
  {
    //Get the number of true values in the object of active days
    const count = Object.values(activeDays).filter((value) => (value)).length;

    //If the current day is not falsy and is removed as an active day, setCurrentDay
    if (currentDay && !activeDays[currentDay])
    {
      //If there are other active days, set currentDay to first day with a true value
      if (count > 0)
      {
        setCurrentDay(Object.entries(activeDays).filter((pair) => {return (pair[1])})[0][0]);
      }
      //If there are no more active days set currentDay to empty string
      else
      {
        setCurrentDay("");
      }
    }

    //If there is only 1, set the currentDay state to the 1 true value
    else if (count === 1)
    {
      setCurrentDay(Object.entries(activeDays).filter((pair) => {return (pair[1])})[0][0]);
    }
  }, [activeDays])

  return (
    <select id='workout-day' 
      value = {currentDay}
      onChange={(event) => {setCurrentDay(event.target.value)}}>
      {
        Object.entries(activeDays)
        .filter(([key, value]) => value)
        .map(([key]) => 
        (<option key={key}>{key}</option>))
      }
    </select>
  )
}

export default WorkoutDays