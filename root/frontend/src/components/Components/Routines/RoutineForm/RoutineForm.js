import {useContext} from 'react';
import {VscSave} from 'react-icons/vsc';
import WeekDayPicker from './WeekDayPicker';
import EditExercise from './EditExercise/EditExercise';
import AddExercise from '../../General/AddExercise';
import Modal from '../../General/Modal';
import RoutineFieldSet from '../../General/RoutineFieldSet';
import DataContext from '../../../../context/DataContext';
import RoutineFormContext from '../../../../context/RoutineFormContext';

function RoutineForm() {
  const {headingOptions, setHeadingOptions, 
    //State for handling title and image
    handleEditTitleModalToggle, editTitleModalIsOpen, tempTitle, setTempTitle} = useContext(DataContext);

  const {description, difficulty, length, avgDuration, daysAndExercises,
    setDescription, setDifficulty, setLength, setAvgDuration, exerciseModalIsOpen, handleExerciseModalToggle,
    exerciseList, exerciseLoading, exerciseError, activeDays} = useContext(RoutineFormContext);

  async function handleSubmit(e)
  {
    e.preventDefault();
    let routine = 
    {
      imagePath : headingOptions.imgPath,
      title : headingOptions.title,
      description : description,
      length : length,
      avgDuration : avgDuration,
      schedule : activeDays,
      exercises : daysAndExercises
    }
    try 
    {
      const response = await fetch('routines',
        {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(routine)
        });
      console.log(response)

    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <>
      <form className='grid-form'>
        <RoutineFieldSet id='description-field' legend='Description'>
          <textarea id="edit-description" className="content-box" name="editDescription" cols="30" rows="10" placeholder="Enter description here"
            value={description}
            onChange={(e)=>{setDescription(e.target.value);}}/>
        </RoutineFieldSet>

      
        <RoutineFieldSet id='edit-details' legend='Details'>
            <div className='input-group'>
              <label className="rating-label">Difficulty</label>
              <input
                  type="range"
                  className="rating"
                  max="5"
                  step="0.5"
                  value= {difficulty}
                  onChange = {(e)=> {setDifficulty(e.target.value)}}
              />
            </div>
            <div className='input-group'>
              <label>Length (weeks)</label>
              <input 
                type="number" 
                name="length-weeks" 
                id="length-weeks" 
                min="1" 
                max="52" 
                step="1" 
                value={length}
                onChange={(e)=>{setLength(e.target.value)}}/>
            </div>
            <div className='input-group'>
              <label>Avg Duration (minutes)</label> 
              <input 
                type="number" 
                name="duration-minutes"
                id="duration-minutes" 
                min="1" 
                max="400" 
                step="1" 
                value={avgDuration}
                onChange={(e)=>{setAvgDuration(e.target.value)}}/>
            </div>
            <div className="input-group vertical">
              <label>Schedule </label>
              <WeekDayPicker />
            </div>
        </RoutineFieldSet>


        <RoutineFieldSet id='edit-workout' legend='Workouts'>
          <EditExercise/> 
        </RoutineFieldSet>
        <div id="btn-container">
            <button 
              type="submit" 
              className="btn-dark"
              onClick={(e)=>{handleSubmit(e)}
              }><VscSave/> Save</button> 
        </div>

        <Modal id='edit-title-modal' title='Edit Name and Image'
          open = {editTitleModalIsOpen} 
          handleModalToggle = {handleEditTitleModalToggle}
        >
          <RoutineFieldSet id='title-field'>
            <button className='btn-image'><img src='/images/placeholder/workout-placeholder.svg' className='circle'/></button>
            <input 
              name="name" 
              id="name" 
              type='text' 
              aria-label='Routine Name' 
              placeholder='Routine Name'
              value = {tempTitle}
              onChange = {
                (e)=>
                {
                  setTempTitle(e.target.value)
                }
                }
            />
            <button 
              className='btn-dark btn-save'
              onClick={(e)=>
                {
                  e.preventDefault();
                  handleEditTitleModalToggle(e, false)
                }}
            >Save</button>
          </RoutineFieldSet>
        </Modal>
      </form>

      <Modal 
        open = {exerciseModalIsOpen} 
        handleModalToggle = {handleExerciseModalToggle}
      >  
        {
          exerciseLoading && <p>Loading...</p>
        }
        {
          !exerciseLoading && exerciseError &&
          <p>An error occurred.</p>
        }
        {
          !exerciseLoading  && !exerciseError && exerciseList.length > 0 &&        
          <AddExercise />
        }
      </Modal>
    </>
  )
}

export default RoutineForm