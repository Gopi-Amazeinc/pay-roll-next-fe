import React,{useState,useEffect} from "react";
import axios from "axios";
import {BiEdit} from "react-icons/bi"


function StaffDashbaord() {

  const [staff, setStaffData] = useState([]);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    getStaffDetails();
  }, []);

  const getStaffDetails = async () => {
    let res = await axios.get(hostURL + "HR/GetMyDetails");
    setStaffData(res.data);
  }
  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
  };
  const clearData = () => {
    sessionStorage.setItem("id", "");
  };
  const enableDisableStaff = async (data) => {
    let entity = {
      StaffID: data.employeID,
      AttendanceEnable: !data.attendanceEnable,
    };
    await axios.post(hostURL + "Payroll/UpdateAttendanceEnableDisable", entity);
    if (etty.AttendanceEnable == true) {
      Swal.fire("Attendance enabled");
    } else {
      Swal.fire("Attendance disabled");
    }
    getData();
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.get(
        hostURL + ``
      );
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getbarangaymaster();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to delete data");
    }
  };

  return (
    <div>
      <div className="container">
      <h5 className="Heading">Staff Dashboard</h5>
        <div className="card p-3 border-0 mt-4">
          <div className="row">
            <div className="col-lg-1">
              <p>Filter By</p>
            </div>

            <div className="col-lg-2">
              <select className="form-select" aria-label="Default select example">
                <option >select Department</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select className="form-select" aria-label="Default select example">
                <option >Select Level</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <select className="form-select" aria-label="Default select example">
                <option >Select Position</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search for Staff"
              />
            </div>

            <div className="col-lg-3">
              <button type="button" className="btn btn-primary">Export Excel</button>
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-lg-6">
              <p style={{marginTop:"2%"}}>Showing Result</p>
            </div>
            <div className="col-lg-3">
              <button  type="button" className="btn btn-primary" style={{marginTop:"5%"}}>ADD STAFF</button>
            </div>
            <div className="col-lg-3">
              <button  type="button" className="btn btn-primary" style={{marginTop:"5%"}}>UPLOAD STAFF</button>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {staff.map((data, index) => {
              return (
                <tr className="text-dark" key={index}>
                  <td>{data.employeID}</td>
                  <td>{data.name}</td>
                  <td>{data.department_name}</td>
                  <td>{data.level}</td>
                  <td>{data.gender}</td>
                  <td>{data.role}</td>
                  <td>{data.emailID}</td>
                  <td>{data.joiningDate}</td>
                  <td>{data.manager}</td>
                  <td>
                    <span onClick={() => enableDisableStaff(data)}>
                      {data.attendanceEnable ? (
                        <button
                        onClick={getData.bind(this, data)}
                        className="enableDisableBtn"
                      >
                        Disable
                      </button>  
                      ) : (
                        <button
                        onClick={getData.bind(this, data)}
                        className="enableDisableBtn"
                      >
                        Enable
                      </button>  
                      )}

                    </span>
                                        
                  </td>
                  <td >
                      <BiEdit/>
                  </td>
                </tr>
              );
            })}

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
