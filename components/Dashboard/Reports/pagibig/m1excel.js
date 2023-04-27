import React from 'react'
import Layout from '../../../layout/layout';
import Style from '../../../../styles/m1excel.module.css';

function M1excel() {
  return (
    <Layout>
      <div className='container-fluid'>
        <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
          <div className='row '>
            <div className='col-lg-12'>
              <h4 style={{ color: "blue", textAlign: "center" }}>M1-EXCEL</h4>
              <hr></hr>
            </div>
            <div className='col-lg-2'></div>
            <div className='col-lg-3'>
              <label style={{ float: "right" }}>Select Start Month & Year & Payperiod</label>
            </div>
            <div className='col-lg-2'>
              <select id="Department" name="Department" className='form-select'>
                <option value="" disabled="">Select</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            <div className='col-lg-2'>
              <select id="Department" name="Department" className='form-select'>
                <option value="" disabled=""> Select </option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
            </div>
            <div className='col-lg-2'>
            <select id="Department" name="Department" className='form-select'>
                <option value="" disabled=""> Select </option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div className='row' style={{ textAlign: "center" }}>
            <div className='col-lg-12'>
              <button className={Style.generatebutton} >GENERATE</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default M1excel