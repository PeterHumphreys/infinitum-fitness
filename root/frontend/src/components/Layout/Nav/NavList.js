import React from 'react';
import {FaCarrot, FaStore, FaQuestionCircle, FaChevronCircleLeft} from 'react-icons/fa';
import {IoMdStats, IoMdSettings, IoMdSearch, IoIosArrowDropleftCircle} from 'react-icons/io';
import {AiFillCalendar} from 'react-icons/ai';
import {GiWeightLiftingUp} from 'react-icons/gi';
import {Link, useLocation} from 'react-router-dom';

function NavList() {
  return (
    
    <ul id="vertical-nav-list">
        <li className = "vertical-nav-list-item">
            <Link id="company-logo-link" to='/'>
                <svg id="company-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.49 28.15"><defs></defs><polygon className="cls-1" points="39.25 10.4 26.06 19.86 52.44 19.86 39.25 10.4"/><path className="cls-1" d="M39.25,0L0,28.15H78.49L39.25,0Zm0,5.88l22.85,16.39H16.4L39.25,5.88Z"/></svg>
            </Link>
        </li>
        <li className = "vertical-nav-list-item" id="search-item">
            <div className="relative-container">
                <a href="#" id="search-link">
                  <IoMdSearch/>
                </a> 
                <form id="search-bar">      
                    <input className="search-input" type="text" placeholder = "search..." name="search"/>
                    <a href="#" id="search-btn">
                      <IoMdSearch/>
                    </a>      
                </form>

            </div>
           
        </li>
        <li className = "vertical-nav-list-item ">
            <Link to="/"className='active'>
                <IoMdStats/>
                <p>Dashboard</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/">
              <AiFillCalendar/>
              <p>Schedule</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/routines">
              <GiWeightLiftingUp/>
              <p>Workouts</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/">
                <FaCarrot/>
                <p>Nutrition</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/">
              <FaStore/>
              <p>Store</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/">
              <FaQuestionCircle/>
              <p>Help</p>
            </Link>
        </li>
        <li className = "vertical-nav-list-item">
            <Link to="/">
              <IoMdSettings/>
              <p>Settings</p>
            </Link>
        </li>
    </ul>
  )
}

export default NavList