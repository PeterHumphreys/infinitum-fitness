import {createContext, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFetch from '../hooks/useFetch';

const RoutineFormContext = createContext({});

export function RoutineFormProvider({children})
{
  //The description of the routine
  const [description, setDescription] = useState("");

  //Difficulty of routine
  const [difficulty, setDifficulty] = useState(1);

  //Length of routine in weeks
  const [length, setLength] = useState(4);

  //Average duration of workouts in minutes
  const [avgDuration, setAvgDuration] = useState(60);

  //Temporarily store changes to a day's scheduled exercises before saving
  const [tempExercises, setTempExercises] = useState([]);

  //The current day that is being edited
  const [currentDay, setCurrentDay] = useState("");

  //Maps a day (key) to an array of scheduled exercises (value)
  const [daysAndExercises, setDaysAndExercises] = useState({
    "Sunday" : [],
    "Monday" : [],
    "Tuesday" : [],
    "Wednesday" : [],
    "Thursday" : [],
    "Friday" : [],
    "Saturday" : [],
    });

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
  
  /**
   * Opens or closes the AddExercise modal
   */
   function handleExerciseModalToggle(e, open)
   {
     e.preventDefault();
     //Opening modal
     if (open)
     {      
         //If a current day is selected, open the modal and initialize temp array to that day's scheduled exercises
         if (currentDay)
         {
           setExerciseModalIsOpen(open);
           setTempExercises(daysAndExercises[currentDay]);
         }
         //Otherwise, display error message
         else
         {
           alert("You must have a day selected to add exercises.")
         }
     }
     //Closing modal
     else
     {
       setExerciseModalIsOpen(open);
       //Save changes
       if (e.target.classList.contains('btn-save'))
       {
         saveExercises();
       }
       //Reset temp exercises
       setTempExercises([]);
     }
   }
 
  
  /**
   * Saves changes made in the form modal
   */
   function saveExercises()
   {
     setDaysAndExercises((prev) =>
     {
       //Deep copy previous daysAndExercises object
       const newObject = deepCopyDaysAndExercises(prev);
 
       //Set the value at the currentDay key to the tempExercisesArray
       newObject[currentDay] = tempExercises;
       return newObject;
     });
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
   * Adds the exercise specified by the id to the temp array of selected exercises
   */
   function handleAddExercise(id)
   {
     //Get the exercise from the list
     const exercise = exerciseList.find(exercise => exercise.id === id);
 
     //Create a new scheduledExercise (this distinguishes 2 instances of the same exercise from each other)
     const scheduledExercise = 
     {
       uuid : uuidv4(),
       exercise : exercise
     }
 
     setTempExercises((prev)=>
     {
       return [...prev, scheduledExercise];
     });
   }

  /**
   * Removes the exercise specified by the uuid from the temp array of selected exercises
   */
   function handleRemoveExercise(uuid)
   {
     setTempExercises((prev)=>
     {
       return prev.filter((scheduledExercise) =>
       {
         return scheduledExercise.uuid !== uuid;
       })
     })
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
   
  /**
   * Directly removes an exercise from the daysAndExercises object
   */
  function handleDirectlyRemoveExercise(uuid)
  {
    setDaysAndExercises((prev) =>
    {
      //Deep copy previous object
      const newObject = deepCopyDaysAndExercises(prev);
      
      newObject[currentDay] = newObject[currentDay].filter(
        (scheduledExercise) => 
        {
          return scheduledExercise.uuid !== uuid
        });
      return newObject;
    })
    
  }

  //Whether the exercise modal is open
  const [exerciseModalIsOpen, setExerciseModalIsOpen] = useState(false);

  //Get exercise data
  const {data : exerciseData, loading : exerciseLoading, error : exerciseError } = useFetch("exercises");
  
  //Exercises
  const [exerciseList, setExerciseList] = useState([]);

  /**
   * Set exercises
   */
   useEffect(()=>
   {
    if (exerciseData.length > 0)
    {
      setExerciseList(exerciseData);
    }
  
  }, [exerciseData]);

  return(
    <RoutineFormContext.Provider value={{
      daysAndExercises, setDaysAndExercises,
      activeDays, setActiveDays,
      currentDay, setCurrentDay,
      exerciseModalIsOpen, setExerciseModalIsOpen,
      handleAddExercise,
      exerciseList, exerciseLoading, exerciseError,
      tempExercises, setTempExercises,
      handleDirectlyRemoveExercise,
      handleRemoveExercise,
      handleChecked,
      deepCopyDaysAndExercises,
      saveExercises,
      handleExerciseModalToggle,
      description, difficulty, length, avgDuration,
      setDescription, setDifficulty, setLength, setAvgDuration
    }}>
      {children}
    </RoutineFormContext.Provider>
  )
  

}

export default RoutineFormContext;
