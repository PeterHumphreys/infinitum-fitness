import {useEffect, useState} from 'react';
import {VscSave} from 'react-icons/vsc';
import WeekDayPicker from './WeekDayPicker';
import EditExercise from './EditExercise/EditExercise';
import AddInfoStripList from '../../General/AddInfoStripList';
import AddExercise from '../../General/AddExercise';
import Modal from '../../General/Modal';

function RoutineForm() {

  //The description of the routine
  const [description, setDescription] = useState("");

  //Whether the modal is open
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //The array of exercises loaded from API
  const [exercises, setExercises] = useState([]);

  //Whether data is loading
  const [isLoading, setIsLoading] = useState(true);

  //Represents the days on which workouts are scheduled
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

  //Maps a day to an array of exercises
  const [daysAndExercises, setDaysAndExercises] = useState({
      "Sunday" : [],
      "Monday" : [],
      "Tuesday" : [],
      "Wednesday" : [],
      "Thursday" : [],
      "Friday" : [],
      "Saturday" : [],
    }
  );

  //The current day that is being edited
  const [currentDay, setCurrentDay] = useState("");

  //Array of exercises that are selected for a given day
  const [selectedExercises, setSelectedExercises] = useState([]);


  /**
   * Load list of exercises (for now, getting from kind of junky but free API)
   */
  useEffect(()=>{
      async function fetchWorkouts()
      {
        try
        {
          const response = await fetch("https://wger.de/api/v2/exercise/?language=2&limit=231")   
          const data = await response.json();
          const {results} = data;
          setExercises(results);
          setIsLoading(false);

        }
        catch(err)
        {
          console.log(err)
        }
    }
    fetchWorkouts();
  }, []);

  /**
   * Opens or closes the modal
   */
  function handleModalToggle(e, open)
  {
    e.preventDefault();
    //If a current day is selected, open the modal
    if (currentDay)
    {
      setModalIsOpen(open);
    }
    else
    {
      alert("You must have a day selected to add exercises.")
    }
  }

  /**
   * Utility function that deep copies the daysAndExercises object 
   * so that state can be properly updated
   */
  function deepCopyDaysAndExercises(prev)
  {
    const newObject = {};
    Object.entries(prev).forEach((entry) =>
    {
      newObject[entry[0]] = [...entry[1]];
    })
    return newObject;
  }

  /**
   * Adds the exercise specified by the id to the array of selected exercises
   */
  function handleAddExercise(id)
  {
    //Get the exercise from the list
    const exercise = exercises.find(exercise => exercise.id === id);
    setDaysAndExercises((prev) =>
    {
      //Deep copy previous object
      const newObject = deepCopyDaysAndExercises(prev);

      newObject[currentDay].push(exercise);
      return newObject;
    })
  }

  /**
   * Removes the exercise specified by the id from the array of selected exercises
   */
  function handleRemoveExercise(id)
  {
    setDaysAndExercises((prev) =>
    {
      //Deep copy previous object
      const newObject = deepCopyDaysAndExercises(prev);
      
      newObject[currentDay] = newObject[currentDay].filter(
        (exercise) => 
        {
          return exercise.id !== id
        });
      return newObject;
    })
  }

  function handleEditOptions(e)
  {
    e.preventDefault();
    alert("Handle edit options")
  }

  /**
   * Sets the days on which workouts will be scheduled based on which checkboxes are checked
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
          <EditExercise 
            activeDays={activeDays} 
            currentDay={currentDay} 
            setCurrentDay={setCurrentDay} 
            daysAndExercises = {daysAndExercises}
            setDaysAndExercises = {setDaysAndExercises}
            exercises={currentDay? daysAndExercises[currentDay] : []}
            handleModalToggle= {handleModalToggle}
            handleRemoveExercise={handleRemoveExercise}
            handleEditOptions = {handleEditOptions}
          /> 
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
          <AddExercise 
            exercises ={exercises} 
            activeExercisesForDay = {currentDay? daysAndExercises[currentDay] : []}
            handleAddExercise={handleAddExercise} 
            handleRemoveExercise={handleRemoveExercise}
            currentDay={currentDay} 
            daysAndExercises = {daysAndExercises}
            setDaysAndExercises = {setDaysAndExercises}
          />
        }
      </Modal>
      </form>

    </>
  )
}

export default RoutineForm