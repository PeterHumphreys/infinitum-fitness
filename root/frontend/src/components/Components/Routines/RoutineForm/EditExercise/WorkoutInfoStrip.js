import {FiEdit} from 'react-icons/fi';

function WorkoutInfoStrip() {
  return (
    <div className="info-strip">
        <img src="/images/account-placeholder.jpg" alt= 'blah'className="circle"/>
        <h4>Exercise Name</h4>
        <ul>
            <li>Sets: <span> 3</span></li>
            <li>Reps: <span> 8-12</span></li>
            <li>Weights: <span> 678lb</span></li>
            <li>Rest: <span> 90sec</span></li>
        </ul>
        <FiEdit/>
    </div>  
  )
}

export default WorkoutInfoStrip