import React from 'react';
import {FaMinusSquare} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';
import {Link} from 'react-router-dom';

function RoutineBox({routine}) {
  return (        
    <div className="image-box">
        <Link to="#"/*to={`/routines/${routine.id}`}*/>
            <img src={routine.imagePath} alt={routine.name}/>
            <div className = "overlay-text-container">
                <div className="heading-subcontainer">
                    <h3>{routine.name}</h3>
                    <h4>{routine.creator}</h4>
                </div>

                <div className="description-subcontainer">
                    <p>{routine.description}</p>
                </div>

                <div className="icon-subcontainer">
                    {routine.canEdit && <button className='btn-icon'><FiEdit/></button> /*<Link class='btn-icon' to={`edit/${routine.id}`}><FiEdit/></Link> : null*/}
                    <button className='btn-icon'><FaMinusSquare/></button>
                    
                </div>
            </div>
        </Link>
  </div>
  )
}

export default RoutineBox