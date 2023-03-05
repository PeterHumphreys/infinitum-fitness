import React from 'react'
import {FaChevronLeft} from 'react-icons/fa';
import '../../assets/scss/components/Buttons/ExpandCollapseButton.scss'

function ExpandCollapseButton({type, clickHandler}) {
  return (
    <button
      id={type}
      className='btn-icon btn-expand-collapse'
      onClick= {clickHandler}>
      <FaChevronLeft id="menu-btn"/>
    </button>
  )
}

export default ExpandCollapseButton