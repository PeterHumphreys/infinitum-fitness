import {FiEdit} from 'react-icons/fi'

function Heading({imgPath, title, canEdit}) {
  return (
    <h1 
      className = {imgPath ? 'img-heading' : ''} 
      contentEditable = {canEdit ? true : false}>

        {imgPath && <img src={imgPath} className={canEdit && 'clickable'} title={canEdit && 'Change the routine image'}/>}
        &nbsp;
        {title}
        &nbsp;
        {canEdit && <button className='btn-icon'><FiEdit/></button>}
    </h1>
  )
}

export default Heading