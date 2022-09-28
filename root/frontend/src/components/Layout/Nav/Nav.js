import React from 'react'
import {FaCarrot, FaStore, FaQuestionCircle, FaChevronCircleLeft} from 'react-icons/fa';
import {IoMdStats, IoMdSettings, IoMdSearch, IoIosArrowDropleftCircle} from 'react-icons/io';
import {AiFillCalendar} from 'react-icons/ai';
import {GiWeightLiftingUp} from 'react-icons/gi';
import {Link, useLocation} from 'react-router-dom';

import NavList from './NavList';

import {useState} from 'react';

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  let location = useLocation();
  return (
    <nav 
      id='nav' 
      className=
      {
        isNavCollapsed ? 'nav-closed' : ''
      }
    >
      <FaChevronCircleLeft 
        id="expand-icon"
        className=
        {
          isNavCollapsed ?
          'open-icon':
          ''
        }
        onClick={()=>{
          setIsNavCollapsed(!isNavCollapsed)
          //console.log(location.pathname)
          }}/>
      <NavList/>
    </nav>
  )
}

export default Nav