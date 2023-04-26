import React from "react";

function StaffDashbaord() {
  return (
    <div>
      <div className="container">
        <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
          <div className="row">
            <div className="col-lg-1">
              <p>Filter By</p>
            </div>

            <div className="col-lg-2">
              <select class="form-select" aria-label="Default select example">
                <option selected>select Department</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Level</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Position</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <input
                type="text"
                class="form-control"
                placeholder="Search for Staff"
              />
            </div>

            <div className="col-lg-3">
              <button>Export Excel</button>
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-lg-6">
              <p>Showing Result</p>
            </div>
            <div className="col-lg-3">
              <button  type="button" class="btn btn-primary">ADD STAFF</button>
            </div>
            <div className="col-lg-3">
              <button  type="button" class="btn btn-primary" >UPLOAD STAFF</button>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered ">
                <thead className={"bg-info text-white "}>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Gender</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Date Of Joining</th>
                    <th>Manager</th>
                    <th>Attendance Enable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>243567</td>
                    <td>Manjan</td>
                    <td>243567</td>
                    <td>Cse</td>
                    <td>High</td>
                    <td>Male</td>
                    <td>Softwere</td>
                    <td>Manjan@gmail.com</td>
                    <td>243567</td>
                    <td>
                      <button>Diseble</button>
                    </td>
                  </tr>

                  <tr>
                    <td>243567</td>
                    <td>Manjan</td>
                    <td>243567</td>
                    <td>Cse</td>
                    <td>High</td>
                    <td>Male</td>
                    <td>Softwere</td>
                    <td>Manjan@gmail.com</td>
                    <td>243567</td>
                    <td>
                      <button>Diseble</button>
                    </td>
                  </tr>


                  <tr>
                    <td>243567</td>
                    <td>Manjan</td>
                    <td>243567</td>
                    <td>Cse</td>
                    <td>High</td>
                    <td>Male</td>
                    <td>Softwere</td>
                    <td>Manjan@gmail.com</td>
                    <td>243567</td>
                    <td>
                      <button>Diseble</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashbaord;
