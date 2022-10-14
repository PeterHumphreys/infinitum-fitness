import React from 'react'

function RoutineFieldSet({id, legend, children}) {
  return (
    
    <fieldset id={id}>
    {
      legend && <legend>{legend}</legend>
    }
      <div className='input-container'>
        {children}
      </div>
    </fieldset>
  )
}

export default RoutineFieldSet