import {useEffect, useState} from 'react';
import {VscSave} from 'react-icons/vsc';
import WeekDayPicker from './WeekDayPicker';
import EditExercise from './EditExercise/EditExercise';
import AddInfoStripList from '../../General/AddInfoStripList';
import AddExercise from '../../General/AddExercise';
import Modal from '../../General/Modal';

function RoutineForm() {

  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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

  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(()=>{
      async function fetchWorkouts()
      {
        try
        {
          const response = await fetch("https://wger.de/api/v2/exercise/?language=2&limit=231")   
          const data = await response.json();
          const {results} = data;
          setContent(results);
          setIsLoading(false);

        }
        catch(err)
        {
          console.log(err)
        }
    }
    fetchWorkouts();
  }, []);

  
  function handleModalToggle(e, open)
  {
    e.preventDefault();
    setModalIsOpen(open);
  }

  function handleAddExercise(id)
  {
    const exercise = content.find(exercise => exercise.id === id);
    setSelectedExercises((prev) =>
    {
      const newArray= [...prev, exercise]
      return newArray
    })
  }

  function handleRemoveExercise(id)
  {
    setSelectedExercises((prev) =>
    {
      const newArray= prev.filter(
        (exercise) => 
        {
          return exercise.id !== id
        });
      return newArray
    })
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
    <>
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
          <EditExercise activeDays={activeDays} handleModalToggle= {handleModalToggle} exercises={selectedExercises}/>
        </fieldset>
        <div id="btn-container">
            <button type="submit" className="btn-dark"><VscSave/> Save</button> 
        </div>
      <Modal open = {modalIsOpen} handleModalToggle = {handleModalToggle}>
        {
          isLoading && <p>Loading data...</p>
        }
        {
          !isLoading &&
          <AddExercise content ={content} handleAddExercise={handleAddExercise} handleRemoveExercise={handleRemoveExercise}/>
        }
      </Modal>
      </form>

    </>
  )
}

export default RoutineForm