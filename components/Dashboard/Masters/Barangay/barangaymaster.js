import Link from "next/link";
import { useEffect, useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import axios from "axios";
import Swal from "sweetalert2";

export default function BarangayMasterDash() {
  const [barangaymaster, setbarangaymaster] = useState([]);

  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  const getbarangaymaster = async () => {
    // This API is used to fetch the data from Barangay Master table
    let res = await axios.get(hostURL + "Master/GetBarangayMaster");
    setbarangaymaster(res.data);
  };
  useEffect(() => {
    getbarangaymaster();
  }, []);

  const handleDelete = async (id) => {
    try {
      // This API is used to delete the BarangayMaster data based on ID
      let res = await axios.get(
        hostURL + `Master/DeleteBarangayMaster?id=${id}`
      );
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getbarangaymaster();
    } catch (error) {
      console.error(error);
      Swal.fire("failed to  delete data");
    }
  };

  return (
    <div className="container">
      <h5 className="Heading">Barangay Master</h5>
      <div className="card shadow p-3 rounded-3 mt-4 mx-0">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-10">
          <p className="Heading">
            SHOWING <span></span>RESULTS
          </p>
        </div>
        <div className="col-lg-2">
          <Link href="/Masters/BarangayMaster/new">
            <button className=" AddButton">
              
              ADD NEW
            </button>
          </Link>
        </div>
        <div className="col-lg-1"></div>
      </div>
      <div>
        <table className="table table-striped mt-3">
          <thead>
            <tr className="bg-info text-white ">
              <th>Country Name</th>
              <th>Province Name</th>
              <th>City Name</th>
              <th>Barangay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {barangaymaster.map((data, index) => {
              return (
                <tr className="text-dark" key={index}>
                  <td>{data.countryname}</td>
                  <td>{data.statename}</td>
                  <td>{data.cityname}</td>
                  <td>{data.name}</td>
                  <td>
                    <Link href={`/Masters/BarangayMaster/Edit/${data.id}`}>
                      <button
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    </Link>
                    &nbsp;
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="edit-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
