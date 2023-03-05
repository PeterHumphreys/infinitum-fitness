import {useContext} from 'react';
import DataContext from '../../context/DataContext';

function UserProfile() {
  const {user, userLoading, userError} = useContext(DataContext);
  return (
    <main className='content-container'>
        {
          userLoading && <p>Loading...</p>
        }
        {
          !userLoading && userError && <p>An error occurred.</p>
        }
        {
        !userLoading && !userError &&
      <div class="content-grid">
        <div id="account-image-container">
          <a href="#" class="modal-trigger">
            <img src = {user.user_profile_photo_URL} alt={`${user.user_first_name} ${user.user_last_name}`} className="circle"/>
          </a>
        </div>
        <div id="account-details">
            <ul>
                <li>Email: {user.user_email}</li>
                <li>Date of Birth: {user.user_dob}</li>
                <li>Height: {user.user_height}</li>
                <li>Weight: {user.user_weight}</li>
                <li>Current Activity Level: {user.user_activity_level}</li>
                <li>Fitness Goal: {user.user_fitness_goal}</li>
            </ul>
        </div>
      </div>
      }
    </main>
  )
}

export default UserProfile