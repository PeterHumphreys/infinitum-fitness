import React from 'react'
import Heading from './Heading'
import {useNavigate} from 'react-router-dom';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md';
import {BiMenuAltLeft} from 'react-icons/bi';

function Header({imgPath, title, canEdit}) {
  const navigate = useNavigate();
  return (
    <header className='info-bar'>
      
      <div id = "menu-btn-container">
        <BiMenuAltLeft id="menu-btn"/>
      </div>

      <div id="back-and-forth">                
          <MdNavigateBefore onClick={()=>{navigate(-1)}} id="back-arrow"/>
          <MdNavigateNext onClick={()=>{navigate(1)}} id="forward-arrow"/>
      </div>
      <Heading imgPath={imgPath} title = {title} canEdit = {canEdit} />
    </header>
  )
}

export default Header