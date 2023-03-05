import RoutineForm from './RoutineForm/RoutineForm.jsx'
import { RoutineFormProvider } from '../../../context/RoutineFormContext'

function NewRoutine() {
  return (
    <RoutineFormProvider>
      <main className='Routines content-container'>
        <RoutineForm/>
      </main>
    </RoutineFormProvider>
  )
}

export default NewRoutine