import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import styles from "../../styles/CompanyForm.module.css";
import Dropzone from "../SharedComponent/dropzone";
import { useForm } from "react-hook-form";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";



function MyForm1({ data }) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [actionType, setActionType] = useState("insert");

  const router = useRouter();

  // const onSubmit = (data) => {

  //   console.log(data);
  // };


  useEffect(() => {
    const { id } = data || {};
    if (id)
    // (id != null)
    {
      getCompanyByID(id);
      // getWorkPolicyByID(id);
      // getTaxByID(id);
    }

    else {
      clearForm();
      // PolicyForm();
      // TaxForm();
    }

  }, []);


  async function getCompanyByID(id) {
    let res = await apiService.commonGetCall("Payroll/GetCompanyAddressDetailsByID?ID=" + id);
    clearForm(res.data[0]);
  }



  async function clearForm(CompanyData = null) {
    debugger
    let details = {
      "ID": CompanyData ? CompanyData.id : "",
      "Company_logo": CompanyData ? CompanyData.company_logo : "",
      "Company_Name": CompanyData ? CompanyData.company_Name : "",
      "Nature_Of_Business": CompanyData ? CompanyData.nature_Of_Business : "",
      "Address1": CompanyData ? CompanyData.address1 : "",
      "Address2": CompanyData ? CompanyData.address2 : "",
      "Zipcode": CompanyData ? CompanyData.zipcode : "",
      "RDO": CompanyData ? CompanyData.rdo : "",
      "Email": CompanyData ? CompanyData.email : "",
      "Phone": CompanyData ? CompanyData.phone : "",
      "Fax": CompanyData ? CompanyData.fax : "",
      "Tin": CompanyData ? CompanyData.tin : "",
      "SSN_No": CompanyData ? CompanyData.ssN_No : "",
      "PhilHealthNumber": CompanyData ? CompanyData.philHealthNumber : "",
      "HDMFNumber": CompanyData ? CompanyData.hdmfNumber : "",
      "E_Signatory": CompanyData ? CompanyData.e_Signatory : "",
      // "CountryID": CompanyData ? CompanyData.countryID : "",
      // "StateID": CompanyData ? CompanyData.stateID : "",
      // "CityID": CompanyData ? CompanyData.cityID : "",
      "Barangay": CompanyData ? CompanyData.barangay : "",
      "CompanyBankAccNo": CompanyData ? CompanyData.companyBankAccNo : "",
      "CompanyCode": CompanyData ? CompanyData.companyCode : ""
    };
    // if (actionType == "insert") {
    //   await apiService.commonPostCall("/Payroll/InsertCompany_AddressDetails", details);
    //   console.log(details);
    //   Swal.fire("Data Inserted successfully");
    //   router.push("/Company");
    // }
    // else {
    //   await apiService.commonPostCall("/Payroll/UpdateCompanyAddressDetails", details);
    //   Swal.fire("Data Updated successfully");
    //   router.push("/Company");
    // }

    reset(details);
    setActionType(CompanyData ? "update" : "insert");
  }




  async function onSubmit(data) {

    if (actionType == "insert") {
      await apiService.commonPostCall("Payroll/InsertCompany_AddressDetails", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      debugger
      await apiService.commonPostCall("Payroll/UpdateCompanyAddressDetails", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div className="row">
          <div className="col-lg-2">
            <p className={styles.p}>Company Logo</p>
            <input type="text" className="form-control" {...register('Company_logoe', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
            {/* {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>} */}
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Company Name<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control" {...register('Nature_Of_Business', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Nature of Business</p>
            <input type="text" className="form-control"  {...register('Nature_Of_Business', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-3">
            <p className={styles.p}>Address1</p>
            <input type="text" className="form-control"  {...register('Address1', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-3">
            <p className={styles.p}>Address2</p>
            <input type="text" className="form-control"  {...register('Address2', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <p className={styles.p}>Zip Code</p>
            <input type="text" className="form-control"   {...register('Zipcode', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>RDO</p>
            <input type="text" className="form-control"  {...register('RDO', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Email</p>
            <input type="text" className="form-control"  {...register('Email', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Phone</p>
            <input type="text" className="form-control"  {...register('Phone', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Fax</p>
            <input type="text" className="form-control"  {...register('Fax', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>TIN<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('Tin', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <p className={styles.p}>SSS No<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('SSN_No', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>PhilHealth No.<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('PhilHealthNumber', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>HDMF No.<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('HDMFNumber', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Country</p>
            <select className="form-select"  >
              <option>Select Country</option>
              {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

              <option>India</option>
              <option>USA</option>
              <option>Japan</option>
              <option>China</option>
              <option>Pakistana</option>



            </select>
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Province</p>
            <select className="form-select"  >
              <option value={"Select Province"}>Select Province</option>
              {/* {
                    provincedata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>
                      )
                    })

                  } */}

              <option>Karnataka</option>
              <option>New Yark</option>
              <option>Talin</option>
              <option>Shingai</option>
              <option>Islamabada</option>

            </select>
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>City</p>
            <select className="form-select"  >
              <option value={"Select City"}>Select City</option>
              {/* {
                    citydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

              <option>Banglore</option>
              <option>Califonia</option>
              <option>Shidny</option>
              <option>Shida</option>
              <option>Taliban</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <p className={styles.p}>Barangay <span style={{ color: "red" }}>*</span></p>
            <select className="form-select"  >
              <option value={"Select Barangay"}>Select Barangay</option>
              {/* {
                    Barangay.map((data) => {
                      return (
                        <option value={data.id} key={data.id} >{data.name}</option>
                      )
                    })
                  } */}

              <option>Jp Nagar</option>
              <option>fonia</option>
              <option>ss layot</option>
              <option>KtG nagar</option>
              <option>afanistan</option>
            </select>
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>Company Bank ACC NO<span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('CompanyBankAccNo', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
          <div className="col-lg-2">
            <p className={styles.p}>CompanyId Code <span style={{ color: "red" }}>*</span></p>
            <input type="text" className="form-control"  {...register('CompanyCode', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <p className={styles.p}>E-Signatory</p>
            <input type="text" className="form-control"   {...register('E_Signatory', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">

            {
              actionType == "insert" && (<button type="submit" className={styles.button}>Save</button>)
            }

            {
              actionType == "update" && (<button type="submit" className={styles.button}>Update</button>)
            }
          </div>
          <div className="col-lg-4">
            <Link href="/Company">
              <button className={styles.button} >Cancel</button>
            </Link>
          </div>
        </div>
        {/* </form> */}
      </div>



    </form>
  );
}


function MyForm2({ data }) {
  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [PolicyType, setPolicyType] = useState("insert");


  useEffect(() => {
    const { id } = data || {};
    if (id)
    // (id != null)
    {
      // getCompanyByID(id);
      getWorkPolicyByID(id);
      // getTaxByID(id);
    }

    else {
      // clearForm();
      PolicyForm();
      // TaxForm();
    }

  }, []);


  async function getWorkPolicyByID(id) {
    let res = await apiService.commonGetCall("Payroll/GetCompany_WorkPolicyByID?ID=" + id);
    PolicyForm(res.data[0]);
  }


  async function PolicyForm(PolicyData = null) {
    let details = {
      "ID": PolicyData ? PolicyData.id : "",
      "Work_Days_Per_Year": PolicyData ? PolicyData.work_Days_Per_Year : "",
      "Work_Months_Per_Year": PolicyData ? PolicyData.work_Months_Per_Year : "",
      "DailyRate": PolicyData ? PolicyData.dailyRate : ""

    };
    reset(details);
    setPolicyType(PolicyData ? "update" : "insert");
  }

  const policySubmit = async (data) => {
    if (PolicyType == "insert") {
      await apiService.commonPostCall("Master/InsertCompany_WorkPolicy", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      await apiService.commonPostCall("Payroll/UpdateCompany_WorkPolicy", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }


  return (
    <>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <p className={styles.p}>Work Policy</p>
        <form onSubmit={handleSubmit(policySubmit)}>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Work Days Per Year <span style={{ color: "red" }}>*</span></p>
              <input type="text" className="form-control" {...register('Work_Days_Per_Year', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Work Months Per Year<span style={{ color: "red" }}>*</span></p>
              <select className="form-select" {...register('Work_Months_Per_Year', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} >
                <option value>Select Months</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Daily Rate Factor<span style={{ color: "red" }}>*</span></p>
              <input type="text" className="form-control" {...register('DailyRate', { required: "Please add a Short Name" })} />
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-lg-2">
              <Link href="/Company">
                <button className={styles.button} >Cancel</button>
              </Link>
            </div>
            <div className="col-lg-2">
              {
                PolicyType == "insert" && (<button type="submit" className={styles.button}>Save</button>)
              }

              {
                PolicyType == "update" && (<button type="submit" className={styles.button}>Update</button>)
              }
            </div>
            <div className="col-lg-2">


            </div>
          </div>
        </form>
      </div>

    </>
  )

}


function MyForm3({ data }) {
  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [TaxType, setTaxType] = useState("insert");


  useEffect(() => {
    const { id } = data || {};
    if (id)
    // (id != null)
    {
      // getCompanyByID(id);
      // getWorkPolicyByID(id);
      getTaxByID(id);
    }

    else {
      // clearForm();
      // PolicyForm();
      TaxForm();
    }

  }, []);


  async function getTaxByID(id) {
    let res = await apiService.commonGetCall("Payroll/GetCompany_TaxComputationByID?ID=" + id);
    TaxForm(res.data[0]);

  }


  async function TaxForm(TaxData = null) {
    let details = {
      "ID": TaxData ? TaxData.id : "",
      "PayrollCalendar": TaxData ? TaxData.payrollCalendar : "",
      "Non_Tax_Essential_Sealing": TaxData ? non_Tax_Essential_Sealing : "",
      "Deminimis_Exemption": TaxData ? TaxData.deminimis_Exemption : ""
    };
    reset(details);
    setTaxType(TaxData ? "update" : "insert");
  }


  const taxSubmit = async (data) => {
    if (TaxType == "insert") {
      await apiService.commonPostCall("/Payroll/InsertCompany_TaxComputation", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      await apiService.commonPostCall("/Payroll/UpdateCompany_TaxComputation", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }



  return (
    <>
      <form onSubmit={handleSubmit(taxSubmit)} >
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>TAX COMPUTATIONS</p>
            </div>
            <div className="col-lg-10"></div>
          </div>
          <div className="row mt-3">

            <div className="col-lg-2">
              <p className={styles.p}>Payroll Calendar</p>
            </div>
            <div className="col-lg-6">
              <p className={styles.p}><input type="checkbox"  {...register('PayrollCalendar', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                &nbsp;Calendar Year(From January to December)</p>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-2">
              <p className={styles.p}>Tax Calculation:</p>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}><input type="radio" name="yes" />Semi Monthly</p>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}><input type="radio" name="yes" />Annual</p>
            </div>
            <div className="col-lg-6"></div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <p className={styles.p}>Non-Tax Exemption Ceiling<span style={{ color: "red" }}>*</span></p>
              <input type="text" className="form-control" {...register('Non_Tax_Essential_Sealing]', { required: "Please add a Short Name", })}></input>
            </div>
            <div className="col-lg-4">
              <p className={styles.p}>Deminimis Exemption Ceiling<span style={{ color: "red" }}>*</span></p>
              <input type="text" className="form-control" {...register('Deminimis_Exemption', { required: "Please add a Short Name", })}></input>
            </div>
            <div className="col-lg-4"></div>
          </div>

        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            {
              TaxType == "insert" && (<button type="submit" className={styles.button}>Save</button>)
            }

            {
              TaxType == "update" && (<button type="submit" className={styles.button}>Update</button>)
            }
          </div>
          <div className="col-lg-4">
            <Link href="/Company">
              <button className={styles.button} >Cancel</button>
            </Link>
          </div>

        </div>
      </form>
    </>
  )








}


function MyForm4({ data }) {

  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [payroll, setPayroll] = useState("insert");


  useEffect(() => {
    const { id } = data || {};
    if (id)
    // (id != null)
    {
      // getCompanyByID(id);
      // getWorkPolicyByID(id);
      // getTaxByID(id);
      getPayrollByID();

    }

    else {
      // clearForm();
      // PolicyForm();
      // TaxForm();
      payRollForm();
    }

  }, []);


  async function getPayrollByID(id) {
    let res = await apiService.commonGetCall("Payroll/GetCompany_PayrollComputationByID?ID=" + id);
    payRollForm(res.data[0]);

  }


  async function payRollForm(PayRollData = null) {
    let details = {
      "ID": PayRollData ? PayRollData.id : "",
      "PayrollCalendar": PayRollData ? PayRollData.payrollCalendar : "",
      "Non_Tax_Essential_Sealing": PayRollData ? non_Tax_Essential_Sealing : "",
      "Deminimis_Exemption": PayRollData ? PayRollData.deminimis_Exemption : ""
    };
    reset(details);
    setPayroll(PayRollData ? "update" : "insert");
  }


  const payRollSubmmit = async (data) => {
    if (payroll == "insert") {
      await apiService.commonPostCall("/Payroll/InsertCompany_PayrollComputation", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      await apiService.commonPostCall("/Payroll/UpdateCompany_PayrollComputation", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }


  return (
    <>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <p className={styles.p}>PAYROLL COMPUTATION</p>
        <form onSubmit={handleSubmit(payRollSubmmit)}>
          <div className="row">
            <div className="col-lg-2">
              <p>Periods Per Month <span style={{ color: "red" }}>*</span></p>
              <select className="form-select" >
                <option value>Select Months</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-5">
              <p className={styles.p}>Absent Deduction</p>
              <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_BasicSalary')} />Basic Salary</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Deminimis')} />Deminimis</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Allowance')} />Allowance</p>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Reimbursement')} />Reimbursement Allowance</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_ECOLA')} />ECOLA</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Bonus')} />Bonus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <p>Late Deduction </p>
              <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Late_Deduction_Basic_Salary')} />Basic Salary</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Late_Deduction_Deminimis')} />Deminimis</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  {...register('Late_Deduction_Allowance')} />Allowance</p>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" {...register('Late_Deduction_Reimbursement')} />Reimbursement Allowance</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  {...register('Late_Deduction_ECOLA')} />ECOLA</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  {...register('Late_Deduction_Bonus')} />Bonus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Govt Contributions</p>
            </div>
            <div className="col-lg-10"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-1">
                  <label className={styles.p}>SSS:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes"  {...register('Sss_ded')} />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" {...register('Sss_ded')} />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>Pagibig:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" {...register('Pagibig_ded')} />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" {...register('Pagibig_ded')} />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>Philhealth:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" {...register('Philhealth_ded')} />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" {...register('Philhealth_ded')} />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>MPF:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" {...register('Mpf_ded')} />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" {...register('Mpf_ded')} />&nbsp;No </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <label className={styles.p}>Attendance Configuration</label>
            </div>
          </div><br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-2">
              <label className={styles.p}>Attendance:</label> &nbsp; &nbsp;
            </div>
            <div className="col-lg-2">
              <label className={styles.p}> <input type="radio" name="yes" {...register('Attedance_config_bit')} />&nbsp;&nbsp;Yes</label>&nbsp;
              <label className={styles.p}><input type="radio" name="yes" {...register('Attedance_config_bit')} />&nbsp;No </label>
            </div>
            <div className="col-lg-7"></div>
          </div>
          <br />
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="col-lg-4"><label className={styles.p}>13th Month Computation</label></div>
              <div className="col-lg-8"></div>
            </div>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-2">
                <label className={styles.p}>Computation Type:</label>
              </div>
              <div className="col-lg-8"></div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-2"></div>
              <div className="col-lg-4">
                <label className={styles.p}><input type="radio" {...register('Sss_ded')} />&nbsp;Pro-rated/Current/Full Salary</label>
              </div>
              <div className="col-lg-6"></div>
            </div><br />
            <div className="row mt-4">
              <div className="col-lg-2"></div>
              <div className="col-lg-1">
                <label className={styles.p}>Optional:</label>
              </div>
              <div className="col-lg-2">
                <input type="checkbox" {...register('Sss_ded')} />
                <label className={styles.p}>Basic</label>
                <br />
                <label className={styles.p}><input type="checkbox" {...register('Sss_ded')} />Deminimis</label>
              </div>
              <div className="col-lg-7"></div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>Final Pay Computation</label>
            </div>
            <div className="col-lg-10"></div>
          </div><br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <label className={styles.p}>Deduct Absent?</label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}>Deduct Late/Undertime?</label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}>Include 13th Month Pay?</label>
            </div>
            <div className="col-lg-2"></div>
          </div><br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <label className={styles.p}> <input type="radio" name="yes" {...register('FinalPay_Deduct_Absent')} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" {...register('FinalPay_Deduct_Absent')} />&nbsp;No </label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}> <input type="radio" name="yes" {...register('FinalPay_Deduct_Late')} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" {...register('FinalPay_Deduct_Late')} />&nbsp;No </label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}> <input type="radio" name="yes" {...register('Final_Pay_13th_Month')} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" {...register('Final_Pay_13th_Month')} />&nbsp;No </label>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
            {
              payroll == "insert" && (<button type="submit" className={styles.button}>Save</button>)
            }

            {
              payroll == "update" && (<button type="submit" className={styles.button}>Update</button>)
            }
            </div>
            <div className="col-lg-4">
            <Link href="/Company">
              <button className={styles.button} >Cancel</button>
            </Link>
            </div>
          </div>
          </form>
      </div>
    </>
  )



}





const Companyform = ({ editData }) => {

  return (
    <>
      <Layout>
        <MyForm1 data={editData} />
        <MyForm2 data={editData} />
        <MyForm4 data={editData} />
        <MyForm3 data={editData} />
        
      </Layout>
    </>
  )

}

export default Companyform;