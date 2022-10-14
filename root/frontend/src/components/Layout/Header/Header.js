import AccountInfo from './AccountInfo';
import {BiMenuAltLeft} from 'react-icons/bi';
import useScrolled from '../../../hooks/useScroll';
import {useContext} from 'react';
import LayoutContext from '../../../context/LayoutContext';
import DataContext from '../../../context/DataContext';

function Header() {

  const {toggleNav} = useContext(LayoutContext);
  const {accountBoxData} = useContext(DataContext)
  const scrolled = useScrolled();
  return (
    <header 
      id='header'
      className=
      {
        scrolled ? 'scrolled' : ''
      }>
      
      <div id = "menu-btn-container">
        <button className='btn-icon'
          onClick= {toggleNav}>
          <BiMenuAltLeft id="menu-btn"/>
        </button>
      </div>
      <AccountInfo accountBoxData ={accountBoxData}/>

    </header>
  )
}

export default Header