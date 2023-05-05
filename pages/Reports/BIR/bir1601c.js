import Layout from '../../../components/layout/layout';
import React, { useState } from 'react'
import Styles from '../../../styles/bir1601c.module.css'

const Bir1601c = () => {
    const [toggle, setToggle] = useState(false)
    const getToggle = () => {
        setToggle(!toggle)
    }
    return (
        <Layout>
            <div className='card shadow-lg p-4'>
                <p className={Styles.p}>1601-C</p>
                <hr></hr>
                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-3'>
                        <label>Select Start Month & Year</label></div>
                    <div className='col-lg-2'>
                        <select className='form-select form-select-sm'>
                            <option value="" disabled>select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select form-select-sm'>
                            <option value="">select Year</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                        </select>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-2'>
                        <label>Signatory Person </label>
                    </div>
                    <div className='col-lg-1'></div>
                    <div className='col-lg-2'>
                        <select className='form-select form-select-sm'>
                            <option value="">Select</option>
                            <option>HR</option>
                        </select>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <button className={Styles.Btn} onClick={getToggle}>Generate</button>

                    </div>
                </div>
            </div>
            <br />
            {
                toggle && (
                    <>

                        <div className='row'>
                            <div className='col-lg-8'></div>
                            <div className='col-lg-4'>
                                <button className={Styles.Btn}>CONVERT TO PDF</button>

                            </div>
                        </div>
                    </>
                )
            }
        </Layout>
    )
}

export default Bir1601c