import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
  const [bulkUpload, setBulkUploadData] = useState([]);
  const [component, setComponentData] = useState([]);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    getbulkUploadData();
    getData();
  }, []);
  const getbulkUploadData = async () => {
    let res = await axios.get(hostURL + "HR/GetPayrollComponentBulkUpload");
    setBulkUploadData(res.data);
  };
  const getData = async() =>{
    let res = await axios.get(hostURL + "Payroll/GetComponentMapping");
    setComponentData(res.data);
  }  
  const handleDelete = async (id) => {
    try {
      let res = await axios.get(
        hostURL + `HR/DeletePayrollComponentBulkUpload?id=${id}`
      );
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getbulkUploadData();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to delete data");
    }
  };
  return (
    <div className="container">
      <br />
      <h5 className="Heading">Upload Payroll Component</h5>
      <div className="card shadow-lg p-4 rounded-3 mt-4">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By:</p>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
            />
          </div>
          <div className="col-lg-2">
          <select className="form-select">
                  <option value="" >
                    Select Component
                  </option>
                  {component.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.componentName}
                      </option>
                    );
                  })}
                </select>
          </div>
          <div className="col-lg-2">
            <Link href="">
              <button className="uploadButton">EXPORT TO EXCEL</button>
            </Link>
          </div>
          <div className="col-lg-2">
            <Link href="">
              <button className="uploadButton">UPLOAD</button>
            </Link>
          </div>
          <div className="col-lg-2">
            <Link href="/Staff/ComponentBulkUpload/new">
              <button className="uploadButton">ADD NEW</button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-striped mt-3">
          <thead>
            <tr className="bg-info text-white ">
              <th>Employee ID</th>
              <th>Name</th>
              <th>Component Code</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bulkUpload.map((data, index) => {
              return (
                <tr className="text-dark" key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.payCode}</td>
                  <td>{data.amount}</td>
                  <td>
                  <button className="enableDisableBtn mx-2"
                       >Disable</button>
                    <Link href={`/Staff/ComponentBulkUpload/Edit/${data.id}`}>
                      <button className="editDeleteBtnTable mx-2">Edit</button>
                    </Link>
                      <button className="editDeleteBtnTable mx-2"
                       onClick={() => handleDelete(data.id)}>Delete</button>
                
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
