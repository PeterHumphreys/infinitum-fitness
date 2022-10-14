import {AiOutlineClose} from 'react-icons/ai';

function Modal({open, title, handleModalToggle, children}) {
  return (
    <>
      <div className={`modal ${open ? 'modal-active' : ''}`}>
        <div className="modal-content box">
          <div className="modal-header">
            {
              title && <h3>{title}</h3>
            }
            <button className='btn-icon' onClick = {(e) => {handleModalToggle(e, false)}} > <AiOutlineClose/></button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal