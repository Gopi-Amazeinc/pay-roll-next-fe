import React from 'react'
import Layout from "@/components/layout/layout";
const OverTimeDetails = () => {
  return (
    <Layout>
      <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <div>
          <h4 style={{ color: "blue" }}>Add Actual Time</h4>
          <div className='row mt-4'>
            <div className='col-lg-4'>
              <p>Date Request<span style={{ color: "red" }}>*</span></p>

            </div>
            <div className='col-lg-4'>
              <p>Actual Start Time<span style={{ color: "red" }}>*</span></p>
            </div>
            <div className='col-lg-4'>
              <p>Actual End Time<span style={{ color: "red" }}>*</span></p>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4'>
              <input type='date' className='form-control'></input>
            </div>
            <div className='col-lg-1'>
              <input type="text" maxlength="2" class="form-control input-md text-center bs-timepicker-field" placeholder="HH"></input>
            </div>:
            <div className='col-lg-1'>
              <input type="text" maxlength="2" class="form-control input-md text-center bs-timepicker-field" placeholder="MM"></input>
            </div>
            <div className='col-lg-2'></div>
            <div className='col-lg-1'>
              <input type="text" maxlength="2" class="form-control input-md text-center bs-timepicker-field" placeholder="HH"></input>
            </div>:
            <div className='col-lg-1'>
              <input type="text" maxlength="2" class="form-control input-md text-center bs-timepicker-field" placeholder="MM"></input>
            </div>
          </div><br />
          <div className='row'>
            <div className='col-lg-4'>
              <p>Supporting Documents</p>
            </div>
            <div className='col-lg-4'>
              <p>Purpose</p>
            </div>
            <div className='col-lg-4'></div>
          </div>
          <div className='row'>
            <div className='col-lg-4'>
              <input type='file' className='form-control'></input>
            </div>
            <div className='col-lg-4'>
              <textarea className='form-control' placeholder='Write here...'></textarea>
            </div>
            <div className='col-lg-4'></div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-6'></div>
            <div className='col-lg-2'>
              <button className='submit-button' style={{ float: "right" }}>Cancel</button>
            </div>
            <div className='col-lg-2'>
              <button className='submit-button'>Submit</button>
            </div>
            <div className='col-lg-2'>
              <button className='submit-button' style={{ float: "left" }}>OT Details</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default OverTimeDetails