import {FaMinusSquare} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';

function DetailInfoStrip({imgPath, imgAltText, title, content}) {
  return (
    <div className='info-strip detail-info-strip'>
      <img src="/images/exercises/jacked-dude-squatting.jpg" alt= "Person doing things" className="circle"/>
      <div>
        <h4>{content.name}</h4>
        <ul>
          <li><span>Sets:</span> <span></span></li>
          <li><span>Reps:</span> <span></span></li>
          <li><span>Weight:</span> <span> lbs</span></li>
          <li><span>Rest:</span> <span> secs</span></li>
        </ul>
      </div>
      
      <button className="btn-icon"><FiEdit/></button>
      <button className="btn-icon"><FaMinusSquare/></button>
    </div>
  )
}

export default DetailInfoStrip