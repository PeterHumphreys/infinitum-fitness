import {useState, useEffect} from 'react';
import api from '../../utilities/api/routines'

function Home() {

  const [user, setUser] = useState([]);

  useEffect(()=>
  {
    async function testFunction()
    {
      try 
      {
        const response = await api.get('/users/users-by-id/2');
        const resName = (response.data);
        console.log(resName)
        setUser(resName);
      }
      catch(err)
      {
        console.log(err.message);
      }
    }
    testFunction();

  }, [])

  return (
    <main className='Home content-container'>
      <h1>Welcome {user.user_first_name}!</h1>
      <img src={user.user_profile_photo_URL} alt="" className='circle' />
    </main>
  )
}

export default Home