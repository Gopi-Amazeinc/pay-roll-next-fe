import React from "react";
import Layout from "@/components/layout/layout";
import styles from "../../styles/CompanyForm.module.css";
import Dropzone from "../SharedComponent/dropzone";
import { useForm } from "react-hook-form";

function Companyform() {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();


  return (
    <>
      <Layout>
        <div>
          <h4 style={{ color: "blue" }}>Company Profile</h4>
        </div>
        <br />

        <div class="shadow-lg p-3 mb-5 bg-white rounded">

          <div className="row">
            <div className="col-lg-2">
              <label>Company Logo</label>
              <Dropzone></Dropzone>
            </div>
            <div className="col-lg-2">
              <label>Company Name</label>
              <input type="text" class="form-control" {...register('CompanyName', { required: "Please add a CompanyName", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid CompanyName Name" } })} />
              {errors.CompanyName && <p className="error-message" style={{ color: "red" }}>{errors.CompanyName.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Nature of Business</label>
              <input type="text" class="form-control" {...register('NatureOfBusiness', { required: "Please add a NatureOfBusiness", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid NatureOfBusiness Name" } })} />
              {errors.NatureOfBusiness && <p className="error-message" style={{ color: "red" }}>{errors.NatureOfBusiness.message}</p>}
            </div>
            <div className="col-lg-3">
              <label>Address1</label>
              <input type="text" class="form-control" {...register('Address1', { required: "Please add a Address1", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Address1 Name" } })} />
              {errors.Address1 && <p className="error-message" style={{ color: "red" }}>{errors.Address1.message}</p>}
            </div>
            <div className="col-lg-3">
              <label>Address2</label>
              <input type="text" class="form-control" {...register('Address2', { required: "Please add a Address2", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Address2 Name" } })} />
              {errors.Address2 && <p className="error-message" style={{ color: "red" }}>{errors.Address2.message}</p>}
            </div>
          </div>



          <div className="row">
            <div className="col-lg-2">
              <label>Zip Code</label>
              <input type="text" class="form-control" {...register('ZipCode', { required: "Please add a ZipCode", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid ZipCode Name" } })} />
              {errors.ZipCode && <p className="error-message" style={{ color: "red" }}>{errors.ZipCode.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>RDO</label>
              <input type="text" class="form-control" {...register('RDO', { required: "Please add a RDO", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid RDO Name" } })} />
              {errors.RDO && <p className="error-message" style={{ color: "red" }}>{errors.RDO.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Email</label>
              <input type="text" class="form-control" {...register('Email', { required: "Please add a Email", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Email Name" } })} />
              {errors.Email && <p className="error-message" style={{ color: "red" }}>{errors.Email.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Phone</label>
              <input type="text" class="form-control" {...register('Phone', { required: "Please add a Phone", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Phone Name" } })} />
              {errors.Phone && <p className="error-message" style={{ color: "red" }}>{errors.Phone.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Fax</label>
              <input type="text" class="form-control" {...register('Fax', { required: "Please add a Fax", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Fax Name" } })} />
              {errors.Fax && <p className="error-message" style={{ color: "red" }}>{errors.Fax.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>TIN</label>
              <input type="text" class="form-control" {...register('TIN', { required: "Please add a CompanyName", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid TIN Name" } })} />
              {errors.TIN && <p className="error-message" style={{ color: "red" }}>{errors.TIN.message}</p>}
            </div>
          </div>


          <div className="row">
            <div className="col-lg-2">
              <label>SSS No</label>
              <input type="text" class="form-control" {...register('SSSNo', { required: "Please add a SSSNo", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid SSSNo Name" } })} />
              {errors.SSSNo && <p className="error-message" style={{ color: "red" }}>{errors.SSSNo.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>PhilHealth No.</label>
              <input type="text" class="form-control" {...register('PhilHealthNo', { required: "Please add a PhilHealthNo", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid PhilHealthNo Name" } })} />
              {errors.PhilHealthNo && <p className="error-message" style={{ color: "red" }}>{errors.PhilHealthNo.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>HDMF No.</label>
              <input type="text" class="form-control" {...register('Country', { required: "Please add a HDMFNo", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid HDMFNo Name" } })} />
              {errors.HDMFNo && <p className="error-message" style={{ color: "red" }}>{errors.HDMFNo.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Country</label>
              <select class="form-select" aria-p="Default select example" {...register('Country', { required: "Please add a Country", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Country Name" } })}>
                <option selected>Select Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.Country && <p className="error-message" style={{ color: "red" }}>{errors.Country.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Province</label>
              <select class="form-select" aria-p="Default select example" {...register('Province', { required: "Please add a Province", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Province Name" } })}>
                <option selected>Select Province</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.Province && <p className="error-message" style={{ color: "red" }}>{errors.Province.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>City</label>
              <select class="form-select" aria-p="Default select example" {...register('City', { required: "Please add a City", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid City Name" } })}>
                <option selected>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.City && <p className="error-message" style={{ color: "red" }}>{errors.City.message}</p>}
            </div>
          </div>


          <div className="row">
            <div className="col-lg-2">
              <label>Barangay </label>
              <select class="form-select" aria-p="Default select example" {...register('Barangay', { required: "Please add a Barangay", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Barangay Name" } })}>
                <option selected>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.Barangay && <p className="error-message" style={{ color: "red" }}>{errors.Barangay.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Company Bank ACC NO</label>
              <input type="text" class="form-control" {...register('CompanyBankACCNO', { required: "Please add a CompanyBankACCNO", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid CompanyBankACCNO Name" } })} />
              {errors.CompanyBankACCNO && <p className="error-message" style={{ color: "red" }}>{errors.CompanyBankACCNO.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>CompanyId Code </label>
              <input type="text" class="form-control" {...register('CompanyIdCode', { required: "Please add a CompanyIdCode", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid CompanyIdCode Name" } })} />
              {errors.CompanyIdCode && <p className="error-message" style={{ color: "red" }}>{errors.CompanyIdCode.message}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2">
              <label>E-Signatory</label>
              <input type="text" class="form-control" {...register('E-Signatory', { required: "Please add a E-Signatory", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid E-Signatory Name" } })} />
              {errors.Signatory && <p className="error-message" style={{ color: "red" }}>{errors.E - Signatory.message}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button className={styles.button}>UPDATE</button>
            </div>
            <div className="col-lg-4"></div>
          </div>

        </div>
        {/* --------------------------------------------------------------------------- */}


        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <p>Work Policy</p>

          <div className="row">
            <div className="col-lg-2">
              <label>Work Days Per Year </label>
              <input type="text" class="form-control" {...register('WorkDaysPerYear', { required: "Please add a WorkDaysPerYear", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid WorkDaysPerYearName" } })} />
              {errors.WorkDaysPerYear && <p className="error-message" style={{ color: "red" }}>{errors.WorkDaysPerYear.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Work Months Per Year</label>
              <select class="form-select" aria-p="Default select example" {...register('WorkMonthsPerYear', { required: "Please add a WorkMonthsPerYear", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid WorkMonthsPerYear" } })}>
                <option selected>Select Months</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.WorkMonthsPerYear && <p className="error-message" style={{ color: "red" }}>{errors.WorkMonthsPerYear.message}</p>}
            </div>
            <div className="col-lg-2">
              <label>Daily Rate Factor</label>
              <input type="text" class="form-control" {...register('DailyRateFactor', { required: "Please add a DailyRateFactor", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid DailyRateFactor" } })} />
              {errors.DailyRateFactor && <p className="error-message" style={{ color: "red" }}>{errors.DailyRateFactor.message}</p>}
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <button className={styles.button}>UPDATE</button>
            </div>
          </div>

        </div>
        {/* ------------------------------------------------------------------ */}


        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <p>PAYROLL COMPUTATION</p>

          <div className="row">
            <div className="col-lg-2">
              <label>Periods Per Month </label>
              <select class="form-select" aria-p="Default select example" {...register('PeriodsPerMonth', { required: "Please add a PeriodsPerMonth", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid PeriodsPerMonth" } })}>
                <option selected>Select Months</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {errors.PeriodsPerMonth && <p className="error-message" style={{ color: "red" }}>{errors.PeriodsPerMonth.message}</p>}
            </div>

            <div className="col-lg-5">
              <label>Absent Deduction</label>
              <div class="shadow-lg p-3 mb-5 bg-white rounded">

                <div className="row">
                  <div className="col-lg-4">
                    <label>Basic Salary</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>Deminimis</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>Allowance</label>
                    <input type="checkbox" />
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <label>Reimbursement Allowance</label>
                      <input type="checkbox" />
                    </div>
                    <div className="col-lg-4">
                      <label>ECOLA</label>
                      <input type="checkbox" />
                    </div>
                    <div className="col-lg-4">
                      <label>Bonus</label>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <label>Absent Deduction</label>
              <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4">
                    <label>Basic Salary</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>Deminimis</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>Allowance</label>
                    <input type="checkbox" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <label>Reimbursement Allowance</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>ECOLA</label>
                    <input type="checkbox" />
                  </div>
                  <div className="col-lg-4">
                    <label>Bonus</label>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-12">
              <p>Govt Contributions</p>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-12">
              <label>SSS:</label> &nbsp; &nbsp;
              <label>Yes</label>
              <input type="radio" />
              <label>No </label>
              <input type="radio" />  &nbsp; &nbsp; &nbsp; &nbsp;
              <label>Pagibig:</label>&nbsp; &nbsp;
              <label>Yes</label>
              <input type="radio" />
              <label>No</label>
              <input type="radio" /> &nbsp; &nbsp; &nbsp; &nbsp;
              <label>Philhealth:</label>&nbsp; &nbsp;
              <label>Yes</label>
              <input type="radio" />
              <label>No</label>
              <input type="radio" /> &nbsp; &nbsp; &nbsp; &nbsp;
              <label>MPF:</label>&nbsp; &nbsp;
              <label>Yes</label>
              <input type="radio" />
              <label>No</label>
              <input type="radio" />
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col-lg-12">
              <label>Attendance Configuration</label>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <br />
              <label>Attendance:</label> &nbsp; &nbsp;
              <label>Yes</label>
              <input type="radio" />
              <label>No</label>
              <input type="radio" />
            </div>
          </div>
          <br />
          <br />



          <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <label>13th Month Computation</label>
            <label>Computation Type:</label> &nbsp; &nbsp;
            <input type="radio" />
            <label>Pro-rated/Current/Full Salary</label> &nbsp; &nbsp; &nbsp;
            &nbsp;
            <br />
            <br />
            <br />
            <label>Optional:</label> &nbsp; &nbsp;
            <input type="checkbox" />
            <label>Basic</label>&nbsp; &nbsp;
            <input type="checkbox" />
            <label>Deminimis</label>
          </div>
          <br />

          <label>Final Pay Computation</label>
          <br />
          <br />

          <div className="row">
            <div className="col-lg-4">
              <label>Deduct Absent?</label><br />
              <label>Yes</label>
              <input type="radio" /> &nbsp; &nbsp;
              <label>No</label>
              <input type="radio" />
            </div>
            <div className="col-lg-4">
              <label>Deduct Late/Undertime?</label><br />
              <label>Yes</label>
              <input type="radio" /> &nbsp; &nbsp;
              <label>No</label>
              <input type="radio" />
            </div>
            <div className="col-lg-4">
              <label>Include 13th Month Pay?</label><br />
              <label>Yes</label>
              <input type="radio" /> &nbsp; &nbsp;
              <label>No</label>
              <input type="radio" />
            </div>
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

          <p>TAX COMPUTATIONS</p>

          <div className="row">
            <div className="col-lg-12">
              <label>Payroll Calendar</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <input type="checkbox" />
              <label>Calendar Year(From January to December)</label>
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-lg-12">
              <label>Tax Calculation:</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <input type="radio" />
              <label>Semi Monthly</label>
              <input type="radio" />
              <label>Annual</label>
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-lg-4">
              <label>Non-Tax Exemption Ceiling</label>
              <input type="text" class="form-control" {...register('TaxExemptionCeiling', { required: "Please add a TaxExemptionCeiling", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid TaxExemptionCeiling" } })} />
              {errors.NonTaxExemptionCeiling && <p className="error-message" style={{ color: "red" }}>{errors.TaxExemptionCeiling.message}</p>}
            </div>
            <div className="col-lg-4">
              <label>Deminimis Exemption Ceiling</label>
              <input type="text" class="form-control" {...register('DailyRateFactor', { required: "Please add a DeminimisExemptionCeiling", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid DeminimisExemptionCeiling" } })} />
              {errors.DeminimisExemptionCeiling && <p className="error-message" style={{ color: "red" }}>{errors.DeminimisExemptionCeiling.message}</p>}
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




      </Layout>


    </>
  );
}

export default Companyform;
