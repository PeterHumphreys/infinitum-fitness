import { useContext, useEffect, useRef } from 'react'
import LayoutContext from '../../context/LayoutContext'
import ExpandCollapseButton from '../__shared/ExpandCollapseButton.jsx'
import "../../assets/scss/layout/SideBar.scss"

function Sidebar() {
  const {isSidebarCollapsed, toggleSidebar} = useContext(LayoutContext)
  useEffect(() => {
    //.sidebar-content is absolutely positioned, so it's height is ignored
    // Once the child has rendered, we want to grab its height and set the parent height to that + 30px
    // Why 30px, you ask?  BC it looks okayish.
    const sidebarContentHeight = document.querySelector(".sidebar-content").offsetHeight;
    asideRef.current.style.height = `${sidebarContentHeight + 30}px`;
    console.log(asideRef.current.height)

  }, [])
  const asideRef = useRef(null)
  return (
    <>
      <aside 
        ref={asideRef}
        className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <ExpandCollapseButton
          type={'toggle-sidebar-btn'} 
          clickHandler={toggleSidebar}
        />
        <div className="sidebar-content">
          <h2>Today's Date</h2>
          <div className="aside-content-box" id="workout-box">
              <h3>Workout Name</h3>
              <h4>Time</h4>

              <div id="workout-list">
                  <div className="img-strip">
                      <img src="/images/placeholder/workout-placeholder.svg" className="circle" />
                      <h4>Workout Name</h4>
                  </div>
                  <div className="img-strip">
                      <img src="/images/placeholder/workout-placeholder.svg"  className ="circle" />
                      <h4>Workout Name</h4>
                  </div>
                  <div className="img-strip">
                      <img src="/images/placeholder/workout-placeholder.svg"  className="circle"/>
                      <h4>Workout Name</h4>
                  </div>
                  <div className="img-strip">
                      <img src="/images/placeholder/workout-placeholder.svg"  className="circle"/>
                      <h4>Workout Name</h4>
                  </div>
              </div>
              <div className="two-buttons">
                  <a href="#" className="btn-dark">Log Workout</a>
                  <a href="#" className="btn-dark">More Details</a>
              </div>
            </div>

          <div className="aside-content-box" id="nutrition-box">
              <h3>Today's Nutrition</h3>
              <div id="nutrition-list">

                  <p>x/y calories</p>
                  <div className="progress-bar">
                      <div className="progress-bar-overlay"></div>
                  </div>

                  <p>x/y carbohydrates</p>
                  <div className="progress-bar">
                      <div className="progress-bar-overlay"></div>
                  </div>
                  
                  <p>x/y fat</p>
                  <div className="progress-bar">
                      <div className="progress-bar-overlay"></div>
                  </div>
                  
                  <p>x/y protein</p>
                  <div className="progress-bar">
                      <div className="progress-bar-overlay"></div>
                  </div>
              </div>
              <div className="two-buttons">
                  <a href="#" className="btn-dark">Log Workout</a>
                  <a href="#" className="btn-dark">More Details</a>
              </div>

          </div>
          </div>
      </aside>
    </>
  )
}

export default Sidebar