import React from 'react'

function Sidebar() {
  return (
    <aside className='sidebar'>
      
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
    </aside>
  )
}

export default Sidebar