import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import styles from "../../styles/CompanyForm.module.css";
import Dropzone from "../SharedComponent/dropzone";
import { useForm } from "react-hook-form";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Image from "next/image";


function MyForm1({ data }) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [actionType, setActionType] = useState("insert");
  const [filePath, setFilePath] = useState();
  const [fileName, setFileName] = useState();
  const [filePathOne, setFilePathOne] = useState();
  const [fileNameOne, setFileNameOne] = useState();


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
      "Country": CompanyData ? CompanyData.country : "",
      "Province": CompanyData ? CompanyData.province : "",
      "City": CompanyData ? CompanyData.city : "",
      "Barangay": CompanyData ? CompanyData.barangay : "",
      "CompanyBankAccNo": CompanyData ? CompanyData.companyBankAccNo : "",
      "CompanyCode": CompanyData ? CompanyData.companyCode : ""
      // "AttachmentEdu": filePath,

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
      let entity={
        "Company_logo":filePath,
        "E_Signatory":filePathOne
      }
      const formData = {...data, ...entity}
      await apiService.commonPostCall("Payroll/InsertCompany_AddressDetails", formData);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      debugger
      let entity={
        "Company_logo":filePath,
        "E_Signatory":filePathOne
      }
      const formData={...data, ...entity}
      await apiService.commonPostCall("Payroll/UpdateCompanyAddressDetails", formData);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }



    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop});
  // const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: onDropOne });
  // const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onDrop: onDrop1 });
  // const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: onDrop2 });


  const onDrop = useCallback((acceptedFiles) => {
    debugger;
    console.log(acceptedFiles, "Uploaded file");
    uploadFile(acceptedFiles);
  }, []);
  

  const uploadFile = async (data) => {
    debugger
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const formData = new FormData();
    formData.append("file_upload", data[0], data[0].name);
    setFileName(data[0].name);
    console.log(data[0].name)
    let invoiceURL = await axios.post(
      hostURL + "Payroll/ProjectAttachments",
      formData
    );
    // console.log(res, "File Path");
    // Swal.fire("Uploaded successfully");
    // setFilePath(res.data);

    // TODO: Gopi's code for validation
    let environmentVariable = "https://103.12.1.103";

    let imagePath = invoiceURL.data.split("\\", 1);
    let Preview = invoiceURL.data.replace(imagePath, environmentVariable);
    Swal.fire('Uploaded successfully.');
    // setFilePath(invoiceURL.data);
    setFilePath(Preview);
    
  };

  

  const onDrop2 = useCallback((acceptedFiles) => {
    debugger;
    console.log(acceptedFiles, "uploadFileOne");
    uploadFileOne(acceptedFiles);
  }, []);
  
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDropOne });

  const uploadFileOne = async (data) => {
    debugger
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const formData = new FormData();
    formData.append("file_upload", data[0], data[0].name);
    setFileNameOne(data[0].name);
    console.log(data[0].name)
    let invoiceURL = await axios.post(
      hostURL + "Payroll/ProjectAttachments",
      formData
    );
    // console.log(res, "File Path");
    // Swal.fire("Uploaded successfully");
    // setFilePath(res.data);

    // TODO: Gopi's code for validation
    let environmentVariable = "https://103.12.1.103";

    let imagePath = invoiceURL.data.split("\\", 1);
    let Preview = invoiceURL.data.replace(imagePath, environmentVariable);
    Swal.fire('Uploaded successfully.');
    // setFilePath(invoiceURL.data);
    setFilePathOne(Preview);
    
    
  };

  return (
    <div className="container-fluid">
      <br />
      <h4 style={{ color: "blue" }}>Company Profile</h4>
      <br />
      <div className="shadow-lg p-3 mb-3 bg-body rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}

          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>Company Logo</label>
              <div style={{ border: '2px dashed black' }}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p style={{ padding: "6%" }}>
                      {
                        filePath == null && (
                          <p>Drag 'n' drop some files here, or click to select
                            files</p>
                        )
                      }
                      {
                        filePath && (
                          <p>{fileName}</p>
                        )
                      }
                    </p>
                  )}
                </div>

              </div>
              {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
            </div>
            {/* <div>
            
            </div> */}

            {/* TODO */}
            {/* <Image src={filePath} height={10} width={10} alt="Picture"></Image>  */}
            <div className="col-lg-2">
              <label className={styles.p}>Company Name<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control" {...register('Company_Name', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Company_Name && <p className="error-message" style={{ color: "red" }}>{errors.Company_Name.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Nature of Business</label>
              <input type="text" className="form-control"  {...register('Nature_Of_Business', { required: "Please add a Short Name", pattern: { value: "[a-zA-Z0-9\s]", message: "Please enter a valid Short Name" } })} />
              {errors.Nature_Of_Business && <p className="error-message" style={{ color: "red" }}>{errors.Nature_Of_Business.message}</p>}
            </div>
            <div className="col-lg-3">
              <label className={styles.p}>Address1</label>
              <input type="text" className="form-control"  {...register('Address1', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Address1 && <p className="error-message" style={{ color: "red" }}>{errors.Address1.message}</p>}
            </div>
            <div className="col-lg-3">
              <label className={styles.p}>Address2</label>
              <input type="text" className="form-control"  {...register('Address2', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Address2 && <p className="error-message" style={{ color: "red" }}>{errors.Address2.message}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>Zip Code</label>
              <input type="text" className="form-control"   {...register('Zipcode', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Zipcode && <p className="error-message" style={{ color: "red" }}>{errors.Zipcode.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>RDO</label>
              <input type="number" className="form-control"  {...register('RDO', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.RDO && <p className="error-message" style={{ color: "red" }}>{errors.RDO.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Email</label>
              <input type="email" className="form-control"  {...register('Email', { required: "Please add a Short Name", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$", message: "Please enter a valid Short Name" })} />
              {errors.Email && <p className="error-message" style={{ color: "red" }}>{errors.Email.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Phone</label>
              <input type="tel" className="form-control"  {...register('Phone', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9 ]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Phone && <p className="error-message" style={{ color: "red" }}>{errors.Phone.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Fax</label>
              <input type="text" className="form-control"  {...register('Fax', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.Fax && <p className="error-message" style={{ color: "red" }}>{errors.Fax.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>TIN<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control"  {...register('Tin', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.TIN && <p className="error-message" style={{ color: "red" }}>{errors.TIN.message}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>SSS No<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control"  {...register('SSN_No', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.SSN_No && <p className="error-message" style={{ color: "red" }}>{errors.SSN_No.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>PhilHealth No.<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control"  {...register('PhilHealthNumber', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.PhilHealthNumber && <p className="error-message" style={{ color: "red" }}>{errors.PhilHealthNumber.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>HDMF No.<span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control"  {...register('HDMFNumber', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
              {errors.HDMFNumber && <p className="error-message" style={{ color: "red" }}>{errors.HDMFNumber.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Country</label>
              <select className="form-select" {...register('Country', { required: "Please add a Country Name" })} >
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
              {errors.Country && <p className="error-message" style={{ color: "red" }}>{errors.Country.message}</p>}
            </div>

            <div className="col-lg-2">
              <label className={styles.p}>Province</label>
              <select className="form-select" {...register('Province', { required: "Please add a Province Name" })} >
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
              <label className={styles.p}>City</label>
              <select className="form-select" {...register('Province', { required: "Please add a Province Name" })}  >
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
              {errors.Province && <p className="error-message" style={{ color: "red" }}>{errors.Province.message}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>Barangay <span style={{ color: "red" }}>*</span></label>
              <select className="form-select" {...register('Barangay', { required: "Please add a Province Name" })} >
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
              {errors.Barangay && <p className="error-message" style={{ color: "red" }}>{errors.Barangay.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>Company Bank ACC NO<span style={{ color: "red" }}>*</span></label>
              <input type="number" className="form-control"  {...register('CompanyBankAccNo', { required: "Please add a CompanyBankAccNo Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid CompanyBankAccNo Name" } })} />
              {errors.CompanyBankAccNo && <p className="error-message" style={{ color: "red" }}>{errors.CompanyBankAccNo.message}</p>}
            </div>
            <div className="col-lg-2">
              <label className={styles.p}>CompanyId Code <span style={{ color: "red" }}>*</span></label>
              <input type="text" className="form-control"  {...register('CompanyCode', { required: "Please add a CompanyCode Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid CompanyCode Name" } })} />
              {errors.CompanyCode && <p className="error-message" style={{ color: "red" }}>{errors.CompanyCode.message}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <label className={styles.p}>E-Signatory</label>
              <div style={{ border: '2px dashed black' }}>
                <div {...getRootProps2()}>
                  <input {...getInputProps2()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p style={{ padding: "6%" }}>
                      {
                        filePathOne == null && (
                          <p>Drag 'n' drop some files here, or click to select
                            files</p>
                        )
                      }
                      {
                        filePath && (
                          <p>{fileNameOne}</p>
                        )
                      }
                    </p>
                  )}
                </div>
              </div>
              {/* <input type="text" className="form-control"   {...register('E_Signatory', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} /> */}
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
        </form>
      </div>
    </div>

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


  // async function getCompanyByID(id) {
  //   let res = await apiService.commonGetCall("Payroll/GetCompanyAddressDetailsByID?ID=" + id);
  //   PolicyForm(res.data[0]);
  // }



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
      await apiService.commonPostCall("Master/UpdateCompany_WorkPolicy", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }


  return (
    <>
      <div className="container-fluid">
        <div className="shadow-lg p-3 mb-3 bg-body rounded">
          <label className={styles.p}>Work Policy</label>
          <form onSubmit={handleSubmit(policySubmit)}>
            <div className="row">
              <div className="col-lg-2">
                <label className={styles.p}>Work Days Per Year <span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" {...register('Work_Days_Per_Year', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                {errors.Work_Days_Per_Year && <p className="error-message" style={{ color: "red" }}>{errors.Work_Days_Per_Year.message}</p>}
              </div>
              <div className="col-lg-2">
                <label className={styles.p}>Work Months Per Year<span style={{ color: "red" }}>*</span></label>
                <select className="form-select" {...register('Work_Months_Per_Year', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} >
                  <option value>Select Months</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {errors.Work_Months_Per_Year && <p className="error-message" style={{ color: "red" }}>{errors.Work_Months_Per_Year.message}</p>}
              </div>
              <div className="col-lg-2">
                <label className={styles.p}>Daily Rate Factor<span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" {...register('DailyRate', { required: "Please add a Short Name" })} />
                {errors.DailyRate && <p className="error-message" style={{ color: "red" }}>{errors.DailyRate.message}</p>}
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-lg-4">

              </div>
              <div className="col-lg-4">
                {
                  PolicyType == "insert" && (<button type="submit" className={styles.button}>Save</button>)
                }

                {
                  PolicyType == "update" && (<button type="submit" className={styles.button}>Update</button>)
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
      </div>
    </>
  )

}

<br />



function MyForm3({ data }) {

  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [payroll, setPayroll] = useState("insert");


  // useEffect(() => {
  //   const { id } = data || {};
  //   if (id)
  //   // (id != null)
  //   {
  //     // getCompanyByID(id);
  //     // getWorkPolicyByID(id);
  //     // getTaxByID(id);
  //     getPayrollByID();

  //   }

  //   else {
  //     // clearForm();
  //     // PolicyForm();
  //     // TaxForm();
  //     payRollForm();
  //   }

  // }, []);



  useEffect(() => {
    async function getParollByID() {
      const id = sessionStorage.getItem("id");
      if (id) {
        let res = await apiService.commonGetCall("Payroll/GetCompany_PayrollComputationnewByID?ID=" + id);
        payRollForm(res.data[0]);
      } else {
        payRollForm();
      }
    }

    getParollByID();
  }, [1]);


  // async function getPayrollByID(id) {
  //   let res = await apiService.commonGetCall("Payroll/GetCompany_PayrollComputationnewByID?ID=" + id);
  //   payRollForm(res.data[0]); 

  // }



  // async function getCompanyByID(id) {
  //   let res = await apiService.commonGetCall("Payroll/GetCompanyAddressDetailsByID?ID=" + id);
  //   payRollForm(res.data[0]);
  // }



  async function payRollForm(PayRollData = null) {
    let details = {
      "ID": PayRollData ? PayRollData.id : "",

      "Periods_Per_Month": PayRollData ? PayRollData.periods_Per_Month : "",

      "FinalPay_Deduct_Absent": PayRollData ? PayRollData.finalPay_Deduct_Absent : "",

      "FinalPay_Deduct_Late": PayRollData ? PayRollData.finalPay_Deduct_Late : "",

      "Final_Pay_13th_Month": PayRollData ? PayRollData.final_Pay_13th_Month : "",

      "Absent_Deduction_BasicSalary": PayRollData ? PayRollData.absent_Deduction_BasicSalary : "",

      "Absent_Deduction_Deminimis": PayRollData ? PayRollData.absent_Deduction_Deminimis : "",

      "Absent_Deduction_Allowance": PayRollData ? PayRollData.absent_Deduction_Allowance : "",

      "Absent_Deduction_Reimbursement": PayRollData ? PayRollData.absent_Deduction_Reimbursement : "",

      "Absent_Deduction_ECOLA": PayRollData ? PayRollData.absent_Deduction_ECOLA : "",

      "Absent_Deduction_Bonus": PayRollData ? PayRollData.finalPay_absent_Deduction_Bonus : "",

      "Late_Deduction_Basic_Salary": PayRollData ? PayRollData.Late_Deduction_Basic_Salary : "",

      "Late_Deduction_Deminimis": PayRollData ? PayRollData.late_Deduction_Deminimis : "",

      "Late_Deduction_Allowance": PayRollData ? PayRollData.late_Deduction_Allowance : "",

      "Late_Deduction_Reimbursement": PayRollData ? PayRollData.late_Deduction_Reimbursement : "",

      "Late_Deduction_ECOLA": PayRollData ? PayRollData.late_Deduction_ECOLA : "",

      "Late_Deduction_Bonus": PayRollData ? PayRollData.late_Deduction_Bonus : "",

      "Sss_ded": PayRollData ? PayRollData.sss_ded : "",

      "Pagibig_ded": PayRollData ? PayRollData.pagibig_ded : "",

      "Philhealth_ded": PayRollData ? PayRollData.philhealth_ded : "",

      "Mpf_ded": PayRollData ? PayRollData.mpf_ded : "",

      "Attedance_config_bit": PayRollData ? PayRollData.attedance_config_bit : "",

      "ComputationSalaryt": PayRollData ? PayRollData.computationSalary : "",

      "ComputationBasicAdjustment": PayRollData ? PayRollData.computationBasicAdjustment : "",

      "ComputationDeminimis": PayRollData ? PayRollData.computationDeminimis : "",



    };
    reset(details);
    setPayroll(PayRollData ? "update" : "insert");
  }


  const payRollSubmmit = async (data) => {
    if (payroll == "insert") {
      await apiService.commonPostCall("Payroll/InsertCompany_PayrollComputationnew", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      await apiService.commonPostCall("Payroll/UpdateCompanyPayrollComputationnew", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }


  return (
    <>
      <div className="container-fluid">
        <div className="shadow-lg p-3 mb-3 bg-body rounded">
          <label className={styles.p}>PAYROLL COMPUTATION</label>
          <br />

          <form onSubmit={handleSubmit(payRollSubmmit)}>
            <div className="row">
              <div className="col-lg-2">
                <label className={styles.p}>Periods Per Month <span style={{ color: "red" }}>*</span></label>
                <select className="form-select" {...register('Periods_Per_Month')} >
                  <option value>Select Months</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-lg-5">
                <label className={styles.p}>Absent Deduction</label>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="row">
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_BasicSalary')} />Basic Salary</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Deminimis')} />Deminimis</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Allowance')} />Allowance</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Reimbursement')} />Reimbursement Allowance</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_ECOLA')} />ECOLA</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Absent_Deduction_Bonus')} />Bonus</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <label>Late Deduction </label>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="row">
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Late_Deduction_Basic_Salary')} />Basic Salary</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Late_Deduction_Deminimis')} />Deminimis</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox"  {...register('Late_Deduction_Allowance')} />Allowance</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox" {...register('Late_Deduction_Reimbursement')} />Reimbursement Allowance</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox"  {...register('Late_Deduction_ECOLA')} />ECOLA</label>
                    </div>
                    <div className="col-lg-4">
                      <label className={styles.p}><input type="checkbox"  {...register('Late_Deduction_Bonus')} />Bonus</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <label className={styles.p}>Govt Contributions</label>
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
                    <label className={styles.p}> <input type="radio" name="yes"  {...register('Sss_ded', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;
                    <label className={styles.p}><input type="radio" name="yes" {...register('Sss_ded')} />&nbsp;No </label>
                  </div>
                  <div className="col-lg-1">
                    <label className={styles.p}>Pagibig:</label>
                  </div>
                  <div className="col-lg-2">
                    <label className={styles.p}> <input type="radio" name="yes" {...register('Pagibig_ded', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;
                    <label className={styles.p}><input type="radio" name="yes" {...register('Pagibig_ded')} />&nbsp;No </label>
                  </div>
                  <div className="col-lg-1">
                    <label className={styles.p}>Philhealth:</label>
                  </div>
                  <div className="col-lg-2">
                    <label className={styles.p}> <input type="radio" name="yes" {...register('Philhealth_ded', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;
                    <label className={styles.p}><input type="radio" name="yes" {...register('Philhealth_ded')} />&nbsp;No </label>
                  </div>
                  <div className="col-lg-1">
                    <label className={styles.p}>MPF:</label>
                  </div>
                  <div className="col-lg-2">
                    <label className={styles.p}> <input type="radio" name="yes" {...register('Mpf_ded', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;
                    <label className={styles.p}><input type="radio" name="yes" {...register('Mpf_ded', { required: true })} />&nbsp;No </label>
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
                <label className={styles.p}> <input type="radio" name="yes" {...register('Attedance_config_bit', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;
                <label className={styles.p}><input type="radio" name="yes" {...register('Attedance_config_bit', { required: true })} />&nbsp;No </label>
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
                  <label className={styles.p}><input type="radio" {...register('ComputationSalaryt', { required: true })} />&nbsp;Pro-rated/Current/Full Salary</label>
                </div>
                <div className="col-lg-6"></div>
              </div><br />
              <div className="row mt-4">
                <div className="col-lg-2"></div>
                <div className="col-lg-1">
                  <label className={styles.p}>Optional:</label>
                </div>
                <div className="col-lg-2">
                  <input type="checkbox" {...register('ComputationBasicAdjustment', { required: true })} />
                  <label className={styles.p}>Basic</label>
                  <br />
                  <label className={styles.p}><input type="checkbox" {...register('ComputationDeminimis', { required: true })} />Deminimis</label>
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
                <label className={styles.p}> <input type="radio" name="yes" {...register('FinalPay_Deduct_Absent', { required: true })} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label className={styles.p}><input type="radio" name="yes" {...register('FinalPay_Deduct_Absent', { required: true })} />&nbsp;No </label>
              </div>
              <div className="col-lg-3">
                <label className={styles.p}> <input type="radio" name="yes" {...register('FinalPay_Deduct_Late')} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label className={styles.p}><input type="radio" name="yes" {...register('FinalPay_Deduct_Late', { required: true })} />&nbsp;No </label>
              </div>
              <div className="col-lg-3">
                <label className={styles.p}> <input type="radio" name="yes" {...register('Final_Pay_13th_Month')} />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label className={styles.p}><input type="radio" name="yes" {...register('Final_Pay_13th_Month', { required: true })} />&nbsp;No </label>
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
      </div>
    </>
  )



}




function MyForm4({ data }) {
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


  // async function getCompanyByID(id) {
  //   let res = await apiService.commonGetCall("Payroll/GetCompanyAddressDetailsByID?ID=" + id);
  //   TaxForm(res.data[0]);
  // }



  async function TaxForm(TaxData = null) {
    let details = {
      "ID": TaxData ? TaxData.id : "",
      "PayrollCalendar": TaxData ? TaxData.payrollCalendar : "",
      "Non_Tax_Essential_Sealing": TaxData ? TaxData.non_Tax_Essential_Sealing : "",
      "Deminimis_Exemption": TaxData ? TaxData.deminimis_Exemption : ""
    };
    reset(details);
    setTaxType(TaxData ? "update" : "insert");
  }


  const taxSubmit = async (data) => {
    if (TaxType == "insert") {
      await apiService.commonPostCall("Payroll/InsertCompany_TaxComputation", data);
      console.log(data);
      Swal.fire("Data Inserted successfully");
      router.push("/Company");
      // console.log(JSON.stringify(data))
      // console.log(data.Company_logoe[0])
      // console.log(data.E_Signatory[0])
    }
    else {
      await apiService.commonPostCall("Payroll/UpdateCompany_TaxComputation", data);
      Swal.fire("Data Updated successfully");
      router.push("/Company");
    }
  }



  return (
    <>
      <div className="container-fluid">
        <form onSubmit={handleSubmit(taxSubmit)} >
          <div className="shadow-lg p-3 mb-3 bg-body rounded">
            <div className="row">
              <div className="col-lg-2">
                <label className={styles.p}>TAX COMPUTATIONS</label>
              </div>
              <div className="col-lg-10"></div>
            </div>
            <div className="row mt-3">

              <div className="col-lg-2">
                <label className={styles.p}>Payroll Calendar</label>
              </div>
              <div className="col-lg-6">
                <label className={styles.p}><input type="checkbox"  {...register('PayrollCalendar', { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  &nbsp;Calendar Year(From January to December)</label>
              </div>
              <div className="col-lg-4"></div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-2">
                <label className={styles.p}>Tax Calculation:</label>
              </div>
              <div className="col-lg-2">
                <label className={styles.p}><input type="radio" name="yes" />Semi Monthly</label>
              </div>
              <div className="col-lg-2">
                <label className={styles.p}><input type="radio" name="yes" />Annual</label>
              </div>
              <div className="col-lg-6"></div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label className={styles.p}>Non-Tax Exemption Ceiling<span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" {...register('Non_Tax_Essential_Sealing]', { required: true, pattern: { value: "[a-zA-Z0-9\s]+", message: "Please enter a valid Short Name" } })}></input>
                {errors.Non_Tax_Essential_Sealing && <p className="error-message" style={{ color: "red" }}>{errors.Non_Tax_Essential_Sealing}</p>}
              </div>
              <div className="col-lg-4">
                <label className={styles.p}>Deminimis Exemption Ceiling<span style={{ color: "red" }}>*</span></label>
                <input type="text" className="form-control" {...register('Deminimis_Exemption', { required: true, })}></input>
                {errors.Deminimis_Exemption && <p className="error-message" style={{ color: "red" }}>{errors.Deminimis_Exemption.message}</p>}
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
        <MyForm3 data={editData} />
        <MyForm4 data={editData} />




      </Layout>
    </>
  )

}

export default Companyform;