import React from 'react'
import { useState,useEffect } from 'react';

function AnnoucementDash() {

    const [upcomming,setupcomming] = useState (false);
    const [completed, setcompleted] = useState(false);

    function toggleUpcomming(){
        setupcomming(true)
        setcompleted(false)
    }

    function toggleCompleted(){
        setcompleted(true)
        setupcomming(false)
    }
    
    const [upcommingdashboard, setupcommingdashboard]=useState([]);
    const [completedashboard, setcompletedashboard] = useState([]);


    return (
        <>
            <div>

                <h4 style={{ color: "blue" }}>AnnoucementDashboard</h4>
                <br />
                <div class="shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="row">
                        <div className="col-lg-1">
                            <p>Filter BY</p>
                        </div>
                        <div className="col-lg-2">
                            <input type="date" className='form-control' />
                        </div>
                        <div className="col-lg-4">
                            <input type="text" className='form-control' placeholder='Search For Announcement' />
                        </div>
                    </div>
                </div>

                <div className='btn-group'></div>

                <div className="row">
                <div className="col-lg-1">
                <div className='btn-group'>
                    <button onClick={toggleUpcomming} className='toggleButton'>UPCOMING</button>
                    <button onClick={toggleCompleted} className='toggleButton'>COMPLETED</button>
                </div>
                </div>
                </div>




            </div>
        </>
    )
}

export default AnnoucementDash;



