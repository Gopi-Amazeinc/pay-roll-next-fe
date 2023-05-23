import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai'

function StaffSalaryComponent() {
  const router = useRouter();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [items, setItems] = useState([]);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [staffSalary, setstaffSalary] = useState([])

    const handleModalOpen = () => {
        setModalIsOpen(true);
    };

      const customStyles = {
        content: {
          top: '25%',
          left: '50%',
          right: '70%',
          bottom: '38%',
          marginRight: '-40%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
      const payrollYTDStyle = {
        content: {
          top: '15%',
          left: '15%',
          right: '15%',
          bottom: '65%',
          // marginRight: '-40%',
          // transform: 'translate(-50%, -50%)',
        },
      };
    
      const addPayrollsalary = async () => {
    
        if (items == "") {
          Swal.fire({
            icon: "danger",
            titleText: "Invalid file",
            text: "Please Select Valid File"
          })
        }
        else {
          await axios.post(hostURL + "Payroll/UpdateDe_minimis_Detailsforstaff", items)
          Swal.fire({
            icon: "success",
            text: "Uploaded Successfully"
          })
          router.push("/Payroll/employmentjobhistory");
        }
      }


      const readExcel = async (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
        promise.then((d) => {
          setItems(d);
        });
      };



  const getStaffSalary = async () => {
    //get api for staffsalarycomponent//
    const { data } = await axios.get(hostURL + "HR/GetAllStaffNew")

    setstaffSalary(data)
    console.log(data)
  }
  useEffect(() => {
    getStaffSalary();
  }, [])


    return (
      <div>
        <div className="container">
          <div>
            <h4>Add,edit APIs throwing 500 error
            </h4>
            <h3 className="Heading">Salary Staff Details</h3>
            <div className="card p-3 border-0 rounded-3 mt-4">
              <div className="row">
                <div className="col-lg-1">
                  <p>Filter By</p>
                </div>
                <div className="col-lg-2">
                  <p>Position</p>
                  <select className="form-select">
                    <option>No data</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <p>Department</p>
                  <select className="form-select">
                    <option>No Department</option>
                  </select>
                </div>

                <div className="col-lg-4">
                  <p>Search</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>

                <div className="col-lg-2"></div>
                <div className="col-lg-1 text-primary">
                  <p>Count : {staffSalary.length}</p>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-2 mt-2 text-end">
                <Link href="/Staff/StaffSalary/new">
                  <button className="AddButton">Add</button>
                </Link>
              </div>
              <div className="col-lg-2 mt-2">
                <button
                  type="submit"
                  onClick={handleModalOpen}
                  className="AddButton"
                >
                  Upload
                </button>
                <Modal isOpen={ModalIsOpen} style={customStyles}>
                  <div className="container">
                    <div className="row card-header">
                      <div className="col-lg-8 mt-3">
                        <h4>Upload Payroll YTD</h4>
                      </div>
                      <div className="col-lg-3"></div>
                      <div className="col-lg-1 mt-3 mb-3">
                        <button
                          onClick={() => setModalIsOpen(false)}
                          className="btn-primary"
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <input
                          className="form-control"
                          type="file"
                          accept=".xlsx"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            readExcel(file);
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="col-lg-4 mb-3">
                      <button
                        type="submit"
                        onClick={addPayrollsalary}
                        className="AddButton"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Staff Name</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Working Days In Month </th>
                      <th>Working Hours In Day </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffSalary.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.employeID} </td>
                          <td>
                            {data.name} {data.last_Name}
                          </td>
                          <td>{data.role}</td>
                          <td>{data.department_name}</td>
                          <td>{data.baseSal}</td>
                          <td>{data.daysinmonth}</td>
                          <td>{data.hoursinday}</td>
                          <td>
                            <Link href={`/Staff/StaffSalary/Edit/${data.id}`}>
                              <button
                                style={{
                                  textShadow: "none",
                                  letterSpacing: ".5px",
                                  borderRadius: "5px",
                                  border: "none",
                                  padding: "5px",
                                  backgroundColor: "#3247d5",
                                  color: "#fff",
                                  fontWeight: "700",
                                  width: "100px",
                                }}
                              >
                                Edit
                              </button>
                            </Link>
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

export default StaffSalaryComponent