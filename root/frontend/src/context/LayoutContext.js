import {createContext, useState, useEffect} from 'react';

const LayoutContext = createContext({});

export function LayoutProvider({children})
{
  //Whether or not the navigation menu is opened
  const [isNavExpanded, setIsNavExpanded] = useState((false));

  //Expands/closes the navbar
  function toggleNav()
  {
    setIsNavExpanded(!isNavExpanded)
  }


  return (
    <LayoutContext.Provider value={{
      toggleNav, isNavExpanded
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutContext;