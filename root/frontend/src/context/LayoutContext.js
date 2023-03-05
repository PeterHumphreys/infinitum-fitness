import {createContext, useState} from 'react';

const LayoutContext = createContext({});

export function LayoutProvider({children})
{
  //Whether or not the navigation menu is opened
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  //Whether or not the sidebar is opened
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  //Expands/closes the navbar
  function toggleNav()
  {
    setIsNavExpanded(!isNavExpanded)
  }

  //Expands/closes the sidebar
  function toggleSidebar()
  {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <LayoutContext.Provider value={{
      toggleNav, 
      toggleSidebar, 
      isNavExpanded,
      isSidebarCollapsed
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutContext;