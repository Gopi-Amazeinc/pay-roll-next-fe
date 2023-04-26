import React from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function New() {
  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  return (
    <div>
      <Layout>
        <div>
          <h3 className="text-primary fs-5 mt-3">Holidays</h3>
          <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
            <form onSubmit={handleSubmit()}>
              <div className="row">
                <div className="col-lg-4">
                  <p>
                    Holiday<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Holiday"{...register('Holiday', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>

                <div className="col-lg-4">
                  <p>
                    Holiday Description<i className="text-danger">*</i>
                  </p>
                  <textarea
                    className="form-control"
                    placeholder="Holiday Description"
                    {...register('HolidayDescription', { required: "Please add a Descrption Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Descrption Name" } })}
                  ></textarea>
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>

                <div className="col-lg-4">
                  <p>
                    Holiday Date<i className="text-danger">*</i>
                  </p>
                  <input type="date" className="form-control" placeholder="Holiday Date"{...register('HolidayDate', { required: "true" })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
              </div>


              <div className="row">
                <div className="col-lg-4">
                  <p>
                    Attachment<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Attachment"{...register('Attachment', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
                <div className="col-lg-4">
                  <p>
                    Holiday Category<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Holiday Category"{...register('HolidayCategory', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
                <div className="col-lg-4">
                  <p>
                    Region<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Region"{...register('Region', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-8"></div>
                <div className="col-lg-2  text-end">
                  <Link href="/Holiday">
                    <button type="submit" id="AddButton" className="btn btn-primary">Cancel</button>
                  </Link>
                </div>
                <div className="col-lg-2 ">
                  {/* <button id='AddButton' className='btn btn-primary'>Submit</button>
                 */}


                  <button type="submit" id='AddButton' className="btn btn-primary">
                    Save
                  </button>


                  {/* <button type="submit" id='AddButton' className="btn btn-primary">
                    Update
                  </button> */}

                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default New



