import {VscSave} from 'react-icons/vsc';
import WeekDayPicker from './WeekDayPicker';
import {useState} from 'react';
import EditExercise from './EditExercise/EditExercise';

function RoutineForm() {

  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [activeDays, setActiveDays] = useState( 
    {
      "Sunday" : false,
      "Monday" : false,
      "Tuesday" : false,
      "Wednesday" : false,
      "Thursday" : false,
      "Friday" : false,
      "Saturday" : false,
    }
  ); 

  function handleModalToggle()
  {
    setModalIsOpen(!modalIsOpen);
  }

  /**
   * Sets the days active based on which checkboxes are checked
   */
  function handleChecked(day)
  {
    if (!activeDays[day])
    {
      setActiveDays((prev) =>
      {
        let newObject = { ...prev};
        newObject[day] = true;
        return newObject;
      })
    }
    else
    {
      setActiveDays((prev) =>
      {
        let newObject = { ...prev};
        newObject[day] = false;
        return newObject;
      })

    }
  }


  return (
    <form className='grid-form'>
      <fieldset id='description-field'>
        <legend>Description</legend>
        <div className='input-container'>
          <textarea id="edit-description" className="content-box" name="editDescription" cols="30" rows="10" placeholder="Enter description here"
            onChange={(e)=>{setDescription(e.target.value);}}/>
        </div>
      </fieldset>

    
      <fieldset id="edit-details">
        <legend>Details</legend>
        <div className='input-container'>
          <div className='input-group'>
            <label className="rating-label">Difficulty</label>
            <input
                className="rating"
                max="5"
                step="0.5"
                type="range"
            />
          </div>
          <div className='input-group'>
            {/*<label>Length</label><input type="number" name="length-weeks" id="length-weeks" min="1" max="52" step="1" value="1"/>*/}
          </div>
          <div className='input-group'>
            {/*<label>Avg Duration</label> <input type="number" name="duration-minutes" id="duration-minutes" min="1" max="400" step="1" value="60"/>*/}
          </div>
          <div className="input-group vertical">
            <label>Schedule </label>
            <WeekDayPicker handleChecked = {handleChecked} setActiveDays={setActiveDays}/>
          </div>
        </div>
      </fieldset>

      <fieldset id="edit-workout">
        <legend>Workouts</legend>
        <EditExercise activeDays={activeDays} handleModalToggle={handleModalToggle}/>
      </fieldset>
      <div id="btn-container">
          <button type="submit" className="btn-dark"><VscSave/> Save</button> 
      </div>
    </form>
  )
}

export default RoutineForm