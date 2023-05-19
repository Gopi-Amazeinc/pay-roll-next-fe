import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';

const Bir2316 = () => {
    let [generateState, setState] = useState(false)

    const toggleState = () => {
        setState(true)
    }

    const customStyle={
        header:{
            fontSize:'22px',
            fontWeight: '500',
            display: 'flex',
            justifyContent:'center',
            color: 'blue'
        },
        center:{
            display: 'flex',
            justifyContent:'center',
        },
        card:{
            paddingLeft: '2px',
            paddingRight: '2px',
            borderRadius: '5px'
        },
        tableHeader:{
            backgroundColor: '#02cfff',
            color: 'white',

        }
    }
	
    return (
        <Layout>
            <div className='container'>
                <div className='card rounded-3 mt-3 mb-2'>
                    <br></br>
                    <p style={customStyle.header} className=''>2316</p>
                    <hr />

                    <div className='row' style={customStyle.center}>
                       
                        <div className='col-lg-3'>
                            <p className='fw-bold fs-6'>Year</p>
                        </div>
                        <div className='col-lg-2'>
                            <select className='form-select'>
                                <option value="">Select year</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                            </select>
                        </div>
                        
                    </div>


                    <div className='row mt-3' style={customStyle.center}>
                    <div className='col-lg-3'>
                            <p className='fw-bold fs-6'>Signatory Person</p>
                        </div>
                        <div className='col-lg-2'>
                            <select className='form-select'>
                                <option value="">Select</option>
                                <option>HR</option>
                            </select>
                        </div>
                    </div>


                    <div className='row mt-3 mb-3' style={customStyle.center}>
                       
                        <div className='col-lg-3'>
                            <p className='fw-bold fs-6'>Search</p>
                        </div>
                        <div className='col-lg-2'>
                            <input className='form-control' placeholder='Search' />
                        </div>
                       
                    </div>


                </div>


                <table className='table table-striped table-bordered mt-4'>

                    <thead className='md-info text-white'>
                        <tr>
                            <th colSpan={6}>ALPHALIST OF EMPLOYEES</th>
                        </tr>
                        <tr style={customStyle.tableHeader}>
                            <th >Select</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Employee Status</th>
                            <th><input type="checkbox" />Substitute</th>
                            <th>Posting Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type='checkbox' /></td>
                            <td>00010348</td>
                            <td>admin s</td>
                            <td>Active</td>
                            <td><input type='checkbox' /></td>
                            <td>Unposted</td>
                        </tr>
                        <tr>
                            <td><input type='checkbox' /></td>
                            <td>00010348</td>
                            <td>Anup</td>
                            <td>Active</td>
                            <td><input type='checkbox' /></td>
                            <td>Unposted</td>
                        </tr>
                    </tbody>
                </table>

                <div className='row mt-2'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-2'>
                        <button onClick={toggleState} className='EditDelteBTN'>Print</button>
                    </div>
                    <div className='col-lg-2'></div>
                </div>

                {
                    generateState && (
                        <div className='row mt-4'>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'>
                                <button className='EditDelteBTN'>Convert to pdf</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default Bir2316