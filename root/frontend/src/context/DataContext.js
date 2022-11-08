import {createContext, useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {FiEdit} from 'react-icons/fi';

const DataContext = createContext({});

export function DataProvider({children})
{
  //*********************Everything to do with the really weird communication between heading and routineform.
  //Whether the edit title modal is open
  const [editTitleModalIsOpen, setEditTitleModalIsOpen] = useState(false);

  //temp holding for values in title modal
  const [tempTitle, setTempTitle] = useState('');
  let tempImgUrl = '';

  /**
   * Opens or closes the edit title modal
   * I dare you to say this 3 times fast.
   */
   function handleEditTitleModalToggle(e, open)
   {
     e.preventDefault();
     if (!open)
     {
      //If the save button is clicked, save to the heading options state
      if (e.target.classList.contains('btn-save'))
      {
        setHeadingOptions({...headingOptions, title: tempTitle})
      }
      //Otherwise, discard changes
      else 
      {
        setTempTitle(headingOptions.title);
      }
     }

     setEditTitleModalIsOpen(open);
   }


  //*********************End of weird stuff

  

  //Routines
  const [routines, setRoutines] = useState([]);

  //Options for main heading
  const [headingOptions, setHeadingOptions] = useState({imgPath: null, altText:'', title:'Loading...'});
  //User data to populate account box
  const [accountBoxData, setAccountBoxData] = useState({name: '', photo: null, altText: ''});
  //User data
  const [user, setUser] = useState();
  //Current page opened
  let location = useLocation();

  //Get user data
  //For now, we are just using a test user
  const {data : userData, loading : userLoading, error : userError } = useFetch("users/users-by-id/2");

  //Get routine data
  const {data : routineData, loading : routineLoading, error : routineError } = useFetch("routines");


  
  //Set User
  useEffect(() =>
  {
    setUser(userData)
  }, [userData]);

  //Set Heading Options
  useEffect(()=>
  {
    //If the user has loaded, we can set the title
    if(!userLoading)
    {
      setOptions();
    }
  }, [location, user])

  //Set Account Box
  useEffect(() =>
  {
    if (!userLoading)
    {
      setAccountBoxData({name : `${user.user_first_name} ${user.user_last_name}`, photo: user.user_profile_photo_URL, altText : `${user.user_first_name} ${user.user_last_name}` });
    }
  }, [user])

  //Set Routines
  useEffect(() =>
  {
    setRoutines(routineData)
  }, [routineData]);

  
  
  //Changes header and aside content based on location
  function setOptions()
  {
      let pathName = location.pathname;
      let options = {imgPath: null, altText:'', title:''};
      //console.log(pathName)
      if (pathName === '/')
      {
        let timeNow = new Date().getHours(), greetingString;
        if (timeNow >= 0 && timeNow < 12)
            greetingString = "Morning";
        else if (timeNow >= 12 && timeNow <= 18)
            greetingString = "Afternoon";
        else    
            greetingString = "Evening";
          options.imgPath = null;
          options.title = `Good ${greetingString}, ${user.user_first_name}!`;
      }
      else if (pathName === '/routines')
      {
        options.imgPath = user.user_profile_photo_URL;
        options.altText = `${user.user_first_name} ${user.user_last_name}`;
        options.title = 'Your Routines';
      }
      else if (pathName === '/routines/new-routine')
      {
        options.imgPath = '/images/placeholder/workout-placeholder.svg'
        options.altText = 'New Workout Routine';
        options.title = 'New Workout Routine';
        options.icon = <button className='btn-icon' onClick={(e) => {handleEditTitleModalToggle(e, true)}}><FiEdit/></button>
      }
      else if (pathName === '/user-profile')
      {
        options.altText = `${user.user_first_name} ${user.user_last_name}`;
        options.title = `${user.user_first_name} ${user.user_last_name}`;
      }
      setHeadingOptions(options);
  }

 

  return(
    <DataContext.Provider value={{
      routines, routineLoading, routineError,
      headingOptions, accountBoxData,
      editTitleModalIsOpen, handleEditTitleModalToggle, setHeadingOptions, tempTitle, setTempTitle, user, userLoading, userError
    }}>
      {children}
    </DataContext.Provider>
  )

}

export default DataContext;