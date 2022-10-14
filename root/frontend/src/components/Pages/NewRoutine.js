import RoutineForm from '../Components/Routines/RoutineForm/RoutineForm'
import { RoutineFormProvider } from '../../context/RoutineFormContext'

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