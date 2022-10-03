import AccountInfo from './AccountInfo';
import Heading from './Heading'
import {BiMenuAltLeft} from 'react-icons/bi';

function Header({user, options, accountBoxData}) {
  return (
    <header className='info-bar'>
      
      <div id = "menu-btn-container">
        <BiMenuAltLeft id="menu-btn"/>
      </div>

      <Heading options = {options} />
      <AccountInfo accountBoxData ={accountBoxData}/>
    </header>
  )
}

export default Header