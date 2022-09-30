import React from 'react'

function WorkoutDays({activeDays}) {
  return (
    <select id='workout-day'>
      {
        Object.entries(activeDays).filter(
          ([key, value]) => value).map(([key]) => (<option key={key}>{key}</option>))
        }
    </select>
  )
}

export default WorkoutDays