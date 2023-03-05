import React from 'react'
import LayoutContext from '../../context/LayoutContext'
import { useContext } from 'react'
import "../../assets/scss/layout/Grid.scss"


function ParentGrid({children}) {
  const {isSidebarCollapsed, toggleSidebar} = useContext(LayoutContext)
  return (
    <div id='parent-grid' className={isSidebarCollapsed ? "sidebar-collapsed" : ""}>{children}</div>
  )
}

export default ParentGrid