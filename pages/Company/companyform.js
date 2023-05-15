import React, { useState,useEffect} from "react";
import Layout from "@/components/layout/layout";
import styles from "../../styles/CompanyForm.module.css";
import Dropzone from "../SharedComponent/dropzone";
import { useForm } from "react-hook-form";
import { apiService } from "@/services/api.service";

function Companyform() {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

  const [actionType, setActionType] = useState("insert");

  const [countrydata, SetCountrydata] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);

  useEffect(() => {
   async function getdropdowndata(){
    let res = await apiService.commonGetCall("/Master/GetCountryType");
    SetCountrydata(res.data);
     res = await apiService.commonGetCall("/Master/GetCityType");
     setcitydata(res.data);
     res = await apiService.commonGetCall("HR/GetHolidaysByID?ID=" + id);
   }

   getdropdowndata();
  }, []);


  function clearForm(HolidaysData = null) {
    debugger;
    let details = {
      "ID": HolidaysData ? HolidaysData.id : "",
      "Holiday": HolidaysData ? HolidaysData.holiday : "",
      "HolidayDescription": HolidaysData ? HolidaysData.holidayDescription : "",
      "HolidayDate": HolidaysData ? HolidaysData.holidayDate : "",
      "Attachment": HolidaysData ? HolidaysData.attachment : "",
      "HolidayCategory": HolidaysData ? HolidaysData.holidayCategory : "",
      "Region": HolidaysData ? HolidaysData.region : ""

    };
    reset(details);
    setActionType(HolidaysData ? "update" : "insert");
  }






  return (
    <>
      <Layout>
        <div>
        <h4 style={{color:"red"}}>Api Issue</h4>
          <br />
          <h4 style={{ color: "blue" }}>Company Profile</h4>
        </div>
        <br />
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Company Logo</p>
              <input type="file" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Company Name<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Nature of Business</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-3">
              <p className={styles.p}>Address1</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-3">
              <p className={styles.p}>Address2</p>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Zip Code</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>RDO</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Email</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Phone</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Fax</p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>TIN<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>SSS No<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>PhilHealth No.<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>HDMF No.<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Country</p>
              <select class="form-select" >
                <option selected>Select Country</option>
                {
                  countrydata.map((data)=>{
                    return(
                      <option value={data.id} key={data.id}>{data.short}</option>

                    )
                  })

                }
              </select>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Province</p>
              <select class="form-select" >
                <option selected>Select Province</option>
                {

                }
                
              </select>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>City</p>
              <select class="form-select" >
                <option selected>Select City</option>
                {
                  citydata.map((data)=>{
                    return(
                      <option value={data.id} key={data.id}>{data.short}</option>
                    
                    )
                  })
                  

                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Barangay <span style={{ color: "red" }}>*</span></p>
              <select class="form-select" >
                <option selected>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Company Bank ACC NO<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>CompanyId Code <span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>E-Signatory</p>
              <input type="file" class="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button className={styles.button}>
                UPDATE
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>


        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <p className={styles.p}>Work Policy</p>
          <div className="row">
            <div className="col-lg-2">
              <p className={styles.p}>Work Days Per Year <span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Work Months Per Year<span style={{ color: "red" }}>*</span></p>
              <select class="form-select" >
                <option selected>Select Months</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-2">
              <p className={styles.p}>Daily Rate Factor<span style={{ color: "red" }}>*</span></p>
              <input type="text" class="form-control" />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <button className={styles.button}>
                UPDATE
              </button>
            </div>
          </div>
        </div>
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <p className={styles.p}>PAYROLL COMPUTATION</p>
          <div className="row">
            <div className="col-lg-2">
              <p>Periods Per Month <span style={{ color: "red" }}>*</span></p>
              <select class="form-select" >
                <option selected>Select Months</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-5">
              <p className={styles.p}>Absent Deduction</p>
              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Basic Salary</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Deminimis</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Allowance</p>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Reimbursement Allowance</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  />ECOLA</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  />Bonus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <p>Late Deduction </p>
              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Basic Salary</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Deminimis</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Allowance</p>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Reimbursement Allowance</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox"  />ECOLA</p>
                  </div>
                  <div className="col-lg-4">
                    <p className={styles.p}><input type="checkbox" />Bonus</p>
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
                  <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>Pagibig:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>Philhealth:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
                </div>
                <div className="col-lg-1">
                  <label className={styles.p}>MPF:</label>
                </div>
                <div className="col-lg-2">
                  <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;
                  <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
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
              <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;
              <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
            </div>
            <div className="col-lg-7"></div>
          </div>
          <br />
          <div class="shadow-lg p-3 mb-5 bg-white rounded">
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
                <label className={styles.p}><input type="radio" />&nbsp;Pro-rated/Current/Full Salary</label>
              </div>
              <div className="col-lg-6"></div>
            </div><br />
            <div className="row mt-4">
              <div className="col-lg-2"></div>
              <div className="col-lg-1">
                <label className={styles.p}>Optional:</label>
              </div>
              <div className="col-lg-2">
                <input type="checkbox" />
                <label className={styles.p}>Basic</label>
                <br />
                <label className={styles.p}><input type="checkbox" />Deminimis</label>
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
              <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
            </div>
            <div className="col-lg-3">
              <label className={styles.p}> <input type="radio" name="yes" />&nbsp;&nbsp;Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label className={styles.p}><input type="radio" name="yes" />&nbsp;No </label>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button className={styles.button}>UPDATE</button>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
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
              <p className={styles.p}><input type="checkbox" />&nbsp;Calendar Year(From January to December)</p>
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
              <input type="text" className="form-control"></input>
            </div>
            <div className="col-lg-4">
              <p className={styles.p}>Deminimis Exemption Ceiling<span style={{ color: "red" }}>*</span></p>
              <input type="text" className="form-control"></input>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <button className={styles.button}>UPDATE</button>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </Layout >
    </>
  );
}

export default Companyform;
