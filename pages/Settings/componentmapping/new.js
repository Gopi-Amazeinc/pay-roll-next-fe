
import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api.service";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from '@/components/layout/layout.js'

function ComponentMappingForm({ }) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  async function onSubmit(data) {
    debugger
    console.log(data);
    try {
      debugger;
      await apiService.commonPostCall("Payroll/InsertComponentMapping", data); // this for insrting the data using inserting Api call 
      alert("data inserted")
    }

    catch (error) {
      alert("data not inserted")
    }
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <p className="Heading">Component Mapping</p>
            <div className="card border-0 p-3 rounded-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-2">
                    <label>
                      PayrollComponentType<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      {...register('PayrollComponentType', { required: "Please add a PayrollComponentType", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid PayrollComponentType" } })}

                      id="PayrollComponentType"
                      name="PayrollComponentType"
                      className="form-control "
                    >
                      <option >
                        Select Payroll Component Type
                      </option>
                      <option value="Earning">Earning</option>
                      <option value="Deduction">Deduction</option>
                      <option value="Neutral">Neutral</option>

                    </select>
                    {errors.PayrollComponentType && <p className="error-message" style={{ color: "red" }}>{errors.PayrollComponentType.message}</p>}
                  </div>
                  <div className="col-lg-2">
                    <label>
                      Code<span style={{ color: "red" }}>*</span>
                    </label>
                    <input {...register('Code', { required: "Please add a Code" })}
                      type="text"
                      placeholder="Enter Your Code"
                      id="Code"
                      name="Code"
                      className="form-control "
                    />
                    {errors.Code && <p className="error-message" style={{ color: "red" }}>{errors.Code.message}</p>}
                  </div>
                  <div className="col-lg-2">
                    <label>
                      Component Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <select {...register('ComponentName', { required: "Please add a ComponentName" })}
                      id="ComponentName"
                      name="ComponentName"
                      className="form-control "
                    >
                      <option >
                        Select Component{" "}
                      </option>
                      <option value="1 Month Bonus">1 Month Bonus</option>
                      <option value="Witholding Tax Payable 2017">
                        Witholding Tax Payable 2017
                      </option>
                      <option value="Witholding Tax Refund 2017">
                        Witholding Tax Refund 2017
                      </option>
                      <option value="Witholding Tax Refund 2021">
                        Witholding Tax Refund 2021
                      </option>
                    </select>
                    {errors.ComponentName && <p className="error-message" style={{ color: "red" }}>{errors.ComponentName.message}</p>}

                  </div>
                  <div className="col-lg-2">
                    <label>
                      Tax Flag<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('TaxFlag')}
                      type="checkbox"
                      placeholder="Tax Flag"
                      id="TaxFlag"
                      name="TaxFlag"
                    />
                    {errors.TaxFlag && <p className="error-message" style={{ color: "red" }}>{errors.TaxFlag.message}</p>}
                  </div>

                  <div className="col-lg-2">
                    <label>
                      NinetyThousandTaxExemption<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('NinetyThousandTaxExemption')}
                      type="checkbox"
                      placeholder="NinetyThousandTaxExemption"
                      id="NinetyThousandTaxExemption"
                      name="NinetyThousandTaxExemption"
                      className=""
                    />
                    {errors.NinetyThousandTaxExemption && <p className="error-message" style={{ color: "red" }}>{errors.NinetyThousandTaxExemption.message}</p>}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-2">
                    <label>Payroll Period*</label>
                    <select {...register('PayrollPeriod', { required: "Please add a PayrollPeriod" })}
                      id="PayrollPeriod"
                      name="PayrollPeriod"
                      className="form-control "
                    >
                      <option disabled="">
                        Select Payroll Period
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    {errors.PayrollPeriod && <p className="error-message" style={{ color: "red" }}>{errors.PayrollPeriod.message}</p>}
                  </div>


                  <div className="col-lg-2">
                    <label>Effeactive Date*</label>
                    <input {...register('Effeactivedate', { required: "Please add a Effeactivedate" })}
                      id="Effeactivedate"
                      name="Effeactivedate"
                      className="form-control "
                      placeholder="EffectiveDate"
                    >
                    </input>
                    {errors.Effeactivedate && <p className="error-message" style={{ color: "red" }}>{errors.Effeactivedate.message}</p>}
                  </div>


                  <div className="col-lg-2">
                    <label>
                      Enable<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('Enable')}
                      type="checkbox"
                      id="Enable"
                      name="Enable"
                      className=""
                    />
                    {errors.Enable && <p className="error-message" style={{ color: "red" }}>{errors.Enable.message}</p>}
                    &nbsp; Yes
                  </div>
                  <div className="col-lg-2">
                    <label>
                      Print On PaySlip<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('PrintOnPaySlip')}
                      type="checkbox"
                      id="PrintOnPaySlip"
                      name="PrintOnPaySlip"
                      className=""
                    />
                    {errors.PrintOnPaySlip && <p className="error-message" style={{ color: "red" }}>{errors.PrintOnPaySlip.message}</p>}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-2">

                    <button type="submit" className="AddButton"> Save </button>

                  </div>
                  <div className="col-lg-2">
                    <Link href="/Settings/componentmapping">
                      <button className="AddButton">Cancel</button>
                    </Link>
                  </div>
                  <div />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}

export default ComponentMappingForm
