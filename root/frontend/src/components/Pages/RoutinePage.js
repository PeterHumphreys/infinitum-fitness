import React from 'react'
import { useParams } from 'react-router-dom';

function RoutinePage({routines}) {
  const {id} = useParams();
  const routine = routines.find((routine)=>{return routine.id.toString() === id});
  return (
    <main className='content-container'>
      <h2 className='img-heading'><img src={routine.imagePath} alt={`${routine.name}`}/>{routine.name}</h2>
      <div>Exercise List</div>
    </main>
  )
}

export default RoutinePage