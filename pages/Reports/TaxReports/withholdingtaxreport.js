import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';
import Styles from '../../../styles/withholdingtaxreport.module.css'
const Withholdingtaxreport = () => {
    const [generate, setToggleGenerate] = useState(false);
    const getToggle = () => {
        setToggleGenerate(!generate);
    }
    return (
        <Layout>
          
            <div className='card shadow-lg p-4'>
                <div className='row'>
                    <p className={Styles.heading}>WithHolding Tax</p>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-2'>
                        <label>Select Date Coverage:</label>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select form-select-sm'>
                            <option value="" >Select Month</option>
                            <option>January</option>
                            <option>February</option>
                        </select>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select form-select-sm'>
                            <option value="">Select Year</option>
                            <option>2022</option>
                            <option>2023</option>
                        </select>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-2'>
                        <label>Signatory Person:</label>
                    </div>
                    <div className='col-lg-4'>
                        <select className='form-select form-select-sm'>
                            <option value="" >Select </option>
                            <option>HR</option>
                        </select>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <button onClick={getToggle} className={Styles.generateBtn}>GENERATE</button>
                    </div>
                </div>
            </div>
            <br /><br />

            {
                generate && (
                    <>
                        <div className='row'>
                            <div className='col-lg-9'></div>
                            <div className='col-lg-3'>

                                <button className={Styles.exportButton}>EXPORT TO PDF</button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-9'></div>
                            <div className='col-lg-3'>
                                <button className={Styles.exportButton}>EXPORT TO EXCEL</button>
                            </div>
                        </div>
                        <br /><br />
                        <div className='row'>
                            <table className={'table ' + Styles.table}>
                                <thead>
                                    <tr className='bg-info text-white'>
                                        <th>Employee ID</th>
                                        <th>LAST NAME</th>
                                        <th>FIRST NAME</th>
                                        <th>WITHHOLDING TAX</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </>
                )
            }






        </Layout >)
}

export default Withholdingtaxreport