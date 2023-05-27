
import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api.service";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from '@/components/layout/layout.js'
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
const ComponentMappingForm = ({ editData }) => {
  const router=useRouter()

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [actionType, setActionType] = useState("insert");
  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("Payroll/InsertComponentMapping", data) // inserting new division master data [Shashank]
      router.push('/Settings/componentmapping');
      Swal.fire({
        icon: 'success',
        title: 'Added Successfully',
      })
    } else {
      await apiService.commonPostCall("Payroll/UpdateComponentMapping", data); // this is for updating or Modifiying the data using  Update Api call
      Swal.fire('Updated successfully')
      router.push('/Settings/componentmapping');
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    inputLabel: {
      fontSize: "16px",
    },
  };
  function clearForm(ComponentMappingData = null) {
    let details = {
      "ID": ComponentMappingData ? ComponentMappingData.id : "",
      "PayrollComponentType": ComponentMappingData ? ComponentMappingData.payrollComponentType : "",
      "Code": ComponentMappingData ? ComponentMappingData.code : "",
      "ComponentName": ComponentMappingData ? ComponentMappingData.componentName : "",
      "TaxFlag": ComponentMappingData ? ComponentMappingData.taxFlag : "",
      "NinetyThousandTaxExemption": ComponentMappingData ? ComponentMappingData.ninetyThousandTaxExemption : "",
      "PayrollPeriod": ComponentMappingData ? ComponentMappingData.payrollPeriod : "",
      "Effeactivedate": ComponentMappingData ? ComponentMappingData.effeactivedate : "",
      "Enable": ComponentMappingData ? ComponentMappingData.enable : "",
      "PrintOnPaySlip": ComponentMappingData ? ComponentMappingData.printOnPaySlip : ""
    };
    reset(details);
    setActionType(ComponentMappingData ? "update" : "insert");

  }
  useEffect(() => {
    const { id } = editData || {};
    if (id) {

      getData(id);
    } else {
      clearForm();
    }
  }, []);
  const getData = async (id) => {
    const res = await apiService.commonGetCall(
      "Payroll/GetComponentMappingByID?ID=" + id
    );
    clearForm(res.data[0]);
  };

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
                    {errors.PayrollComponentType && <p className="error-message" style={customStyles.errorMsg}>{errors.PayrollComponentType.message}</p>}
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
                    {errors.Code && <p className="error-message" style={customStyles.errorMsg}>{errors.Code.message}</p>}
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
                    <div >{errors.ComponentName && <p className="error-message" style={customStyles.errorMsg}>{errors.ComponentName.message}</p>}</div>

                  </div>
                  <div className="col-lg-2">
                    <label>
                      Tax Flag<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('TaxFlag', { required: "please select" })}
                      type="checkbox"
                      placeholder="Tax Flag"
                      id="TaxFlag"
                      name="TaxFlag"
                    />
                    {errors.TaxFlag && <p className="error-message" style={customStyles.errorMsg}>{errors.TaxFlag.message}</p>}
                  </div>

                  <div className="col-lg-2">
                    <label>
                      NinetyThousandTaxExemption<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('NinetyThousandTaxExemption', { required: "please select" })}
                      type="checkbox"
                      placeholder="NinetyThousandTaxExemption"
                      id="NinetyThousandTaxExemption"
                      name="NinetyThousandTaxExemption"
                      className=""
                    />
                    {errors.NinetyThousandTaxExemption && <p className="error-message" style={customStyles.errorMsg}>{errors.NinetyThousandTaxExemption.message}</p>}
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
                    {errors.PayrollPeriod && <p className="error-message" style={customStyles.errorMsg}>{errors.PayrollPeriod.message}</p>}
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
                    {errors.Effeactivedate && <p className="error-message" style={customStyles.errorMsg}>{errors.Effeactivedate.message}</p>}
                  </div>


                  <div className="col-lg-2">
                    <label>
                      Enable<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('Enable', { required: "please select" })}
                      type="checkbox"
                      id="Enable"
                      name="Enable"
                      className=""
                    />&nbsp; Yes
                    {errors.Enable && <p className="error-message" style={customStyles.errorMsg}>{errors.Enable.message}</p>}

                  </div>
                  <div className="col-lg-2">
                    <label>
                      Print On PaySlip<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input {...register('PrintOnPaySlip', { required: "please select" })}
                      type="checkbox"
                      id="PrintOnPaySlip"
                      name="PrintOnPaySlip"
                      className=""
                    />
                    {errors.PrintOnPaySlip && <p className="error-message" style={customStyles.errorMsg}>{errors.PrintOnPaySlip.message}</p>}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-2">
                    {
                      actionType == "insert" && (
                        <button type='submit' className="AddButton" >Save</button>
                      )
                    }
                    {
                      actionType == "update" && (
                        <button type='submit' className="AddButton" >Update</button>
                      )
                    }
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
