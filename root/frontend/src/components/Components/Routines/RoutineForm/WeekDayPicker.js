import WeekDay from './WeekDay';
import '../../../../../src/assets/scss/components/WeekDayPicker.scss'

function WeekDayPicker({handleChecked, setActiveDays}) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (
    <div className='week-day-picker'>
      {
        daysOfWeek.map((day, index) => 
        { 
          return <WeekDay key={index} id={`dayOfWeek${index}`} day = {day} handleChecked={handleChecked} setActiveDays = {setActiveDays}/>
        })
      }
    </div>
  )
}

export default WeekDayPicker