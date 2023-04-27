import React from "react";
import Layout from '@/components/layout/layout'
import styles from "../../styles/CompanyForm.module.css"

function Companyform() {
  return (
    <>
    <Layout>
        <div>
            <br />
            <h4 style={{color:"blue"}}>Company Profile</h4>
        </div>
        <br />
        <br />
      <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-lg-2">
            <p>Company Logo</p>
          </div>
          <div className="col-lg-2">
            <p>Company Name</p>
          </div>
          <div className="col-lg-2">
            <p>Nature of Business</p>
          </div>
          <div className="col-lg-3">
            <p>Address1</p>
          </div>
          <div className="col-lg-3">
            <p>Address2</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <input type="file" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-3">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-3">
            <input type="text" class="form-control" />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------- */}

        <div className="row">
          <div className="col-lg-2">
            <p>Zip Code</p>
          </div>
          <div className="col-lg-2">
            <p>RDO</p>
          </div>
          <div className="col-lg-2">
            <p>Email</p>
          </div>
          <div className="col-lg-2">
            <p>Phone</p>
          </div>
          <div className="col-lg-2">
            <p>Fax</p>
          </div>
          <div className="col-lg-2">
            <p>TIN</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="row">
          <div className="col-lg-2">
            <p>SSS No</p>
          </div>
          <div className="col-lg-2">
            <p>PhilHealth No.</p>
          </div>
          <div className="col-lg-2">
            <p>HDMF No.</p>
          </div>
          <div className="col-lg-2">
            <p>Country</p>
          </div>
          <div className="col-lg-2">
            <p>Province</p>
          </div>
          <div className="col-lg-2">
            <p>City</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select Country</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select Province</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select City</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="row">
          <div className="col-lg-2">
            <p>Barangay </p>
          </div>
          <div className="col-lg-2">
            <p>Company Bank ACC NO</p>
          </div>
          <div className="col-lg-2">
            <p>CompanyId Code </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select City</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <p>E-Signatory</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
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
      {/* ===================================================================================================== */}

      <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <p>Work Policy</p>

        <div className="row">
          <div className="col-lg-2">
            <p>Work Days Per Year </p>
          </div>
          <div className="col-lg-2">
            <p>Work Months Per Year</p>
          </div>
          <div className="col-lg-2">
            <p>Daily Rate Factor</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <input type="text" class="form-control" />
          </div>
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select Months</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2">
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

      {/* ========================================================================================= */}

      <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <p>PAYROLL COMPUTATION</p>
        <div className="row">
          <div className="col-lg-2">
            <p>Periods Per Month </p>
          </div>
          <div className="col-lg-5">
            <p>Absent Deduction</p>
          </div>
          <div className="col-lg-5">
            <p>Late Deduction </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <select class="form-select" aria-p="Default select example">
              <option selected>Select Months</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="col-lg-5">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
              <div className="row">
                <div className="col-lg-4">
                  <p>Basic Salary</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Deminimis</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Allowance</p>
                  <input type="checkbox" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <p>Reimbursement Allowance</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>ECOLA</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Bonus</p>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
              <div className="row">
                <div className="col-lg-4">
                  <p>Basic Salary</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Deminimis</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Allowance</p>
                  <input type="checkbox" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <p>Reimbursement Allowance</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>ECOLA</p>
                  <input type="checkbox" />
                </div>
                <div className="col-lg-4">
                  <p>Bonus</p>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------ */}
        <div className="row">
          <div className="col-lg-12">
            <p>Govt Contributions</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <label>SSS:</label>&nbsp; &nbsp;
            <label>Yes</label> 
            <input type="radio" />
            &nbsp; &nbsp;
            <label>No </label>
            <input type="radio" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <label>Pagibig:</label>&nbsp; &nbsp;
            <label>Yes</label>
            <input type="radio" />
            &nbsp; &nbsp;
            <label>No</label>
            <input type="radio" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <label>Philhealth:</label>&nbsp; &nbsp;
            <label>Yes</label> 
            <input type="radio" />
            &nbsp; &nbsp;
            <label>No</label>
            <input type="radio" /> &nbsp; &nbsp; &nbsp; &nbsp;
            <label>MPF:</label>&nbsp; &nbsp;
            <label>Yes</label>
            <input type="radio" />
            &nbsp; &nbsp;
            <label>No</label>
            <input type="radio" />
          </div>
        </div>
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
            &nbsp;
            <label>No</label>
            <input type="radio" />
          </div>
        </div>
        <br />

        <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <label>13th Month Computation</label>
            <label>Computation Type:</label> &nbsp; &nbsp;
            <input type="radio" />
            <label>Pro-rated/Current/Full Salary</label> &nbsp; &nbsp; &nbsp; &nbsp;
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
        <div className="row">
            <div className="col-lg-4">
                <label>Deduct Absent?</label>
            </div>
            <div className="col-lg-4">
            <label>Deduct Late/Undertime?</label>
            </div>
            <div className="col-lg-4">
            <label>Include 13th Month Pay?</label>
            </div>

        </div>

        <div className="row">
        <div className="col-lg-4">
           <label>Yes</label>
            <input type="radio" /> &nbsp; &nbsp;
            <label>No</label>
            <input type="radio" />
        </div>
            <div className="col-lg-4">
            &nbsp; 
            <label>Yes</label>
            <input type="radio" /> &nbsp; &nbsp;
            <label>No</label>
            <input type="radio" />
            </div>
            <div className="col-lg-4">
            &nbsp; 
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
            <div className="col-lg-4">
            <p>Tax Calculation:</p>
            </div>
            <div className="col-lg-4">
                <input type="checkbox" />
                <p>Calendar Year(From January to December)</p>
            </div>
            <div className="col-lg-4"></div>
        </div>

        <div className="row">
            <div className="col-lg-4">
            <p>Tax Calculation:</p>
            </div>
            <div className="col-lg-4">
            <input type="radio" />
                <p>Semi Monthly</p><br />
                <input type="radio" />
                <p>Annual</p>
            </div>
            <div className="col-lg-4"></div>
        </div>

        <div className="row">
            <div className="col-lg-4">
                <p>Non-Tax Exemption Ceiling</p>
            </div>
            <div className="col-lg-4">
            <p>Deminimis Exemption Ceiling</p>
            </div>
            <div className="col-lg-4"></div>
        </div>

        <div className="row">
            <div className="col-lg-4">
                <input type="text" class="form-control"/>
            </div>
            <div className="col-lg-4">
            <input type="text" class="form-control"/>
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
