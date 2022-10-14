
import {FaCarrot, FaStore, FaQuestionCircle} from 'react-icons/fa';
import {IoMdStats, IoMdSettings, IoMdSearch,} from 'react-icons/io';
import {AiFillCalendar} from 'react-icons/ai';
import {GiWeightLiftingUp} from 'react-icons/gi';


export const navData =
[
  {
    id: "company-logo-link",
    icon : <svg id="company-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.49 28.15"><defs></defs><polygon className="cls-1" points="39.25 10.4 26.06 19.86 52.44 19.86 39.25 10.4"/><path className="cls-1" d="M39.25,0L0,28.15H78.49L39.25,0Zm0,5.88l22.85,16.39H16.4L39.25,5.88Z"/></svg>,
    link : "/"

  },
  {
    id: 2,
    icon : <IoMdStats/>,
    text : "Dashboard",
    link : "/dashboard"
  },
  {
    id: 3,
    icon : <AiFillCalendar/>,
    text : "Schedule",
    link : "/schedule"
  },
  {
    id: 4,
    icon : <GiWeightLiftingUp/>,
    text : "Workouts",
    link : "/routines"
  },
  {
    id: 5,
    icon : <FaCarrot/>,
    text : "Nutrition",
    link : "/nutrition"
  },
  {
    id: 6,
    icon : <FaStore/>,
    text : "Store",
    link : "/store"
  },
  {
    id: 7,
    icon : <FaQuestionCircle/>,
    text : "Help",
    link : "/help"
  },
  {
    id: 8,
    icon : <IoMdSettings/>,
    text : "Settings",
    link : "/settings"
  }
]