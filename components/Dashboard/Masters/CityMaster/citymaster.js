import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import Layout from '../../../layout/layout'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

function CityMasterDash() {

  const [CityMaster, setCityMaster] = useState([]);
  
  const getCityMaster = async () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let res = await axios.get(hostURL + "Master/GetCityType"); //This Api is useed for Get the Dashborad data ciyType Master
    setCityMaster(res.data);
  };

  useEffect(() => {
    getCityMaster();
  }, []);

  async function DeleteCityMaster(id) {
    debugger;
    try {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

      const res = await axios.get(
        hostURL + `Master/DeleteCityType?id=${id}` // this is for deleting the data for dashborad using delete api call  
      );
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Hurray...",
        text: "Data was deleted..!",
      });
      getCityMaster();
    }
    catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data was not deleted..!",
      });
    }
  }




  return (
    <Layout>
      <div className="container">
        <p className="Heading">City Master</p>
        <div className="card p-3 rounded-3 shadow border-0">
          <div className="row">
            <div className="col-1">
              <p> <BiFilterAlt /> Filter By</p>
            </div>
            <div className="col-5">
              <input
                type="text"
                placeholder="Search"
                className="form-control"
              ></input>
            </div>
            <div className="col-3">
              <select
                className="form-select"
              >
                <option value="">Select Province</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <p className="col-2 result-heading">Showing {CityMaster.length} Results</p>
          <div className="col-8"></div>
          <div className="col-2">
            <Link href="/Masters/CityMaster/new">
              <button className=" AddButton">
                <AiOutlinePlus />    Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-3">
          <table className="table table-striped">
            <thead >
              <tr>
                <th>Country Name</th>
                <th>Province Name</th>
                <th>City Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(CityMaster) &&
                CityMaster.length > 0 && (
                  <>
                    {CityMaster.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.country}</td>
                          <td>{data.state}</td>
                          <td>{data.short}</td>
                          <td>{data.description}</td>
                          <td>
                            <Link href={`/Masters/CityMaster/Edit/${data.id}`}>
                              <button className="edit-btn">Edit</button></Link>
                            &nbsp;&nbsp;
                            <button className="edit-btn" onClick={() => DeleteCityMaster(data.id)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default CityMasterDash;