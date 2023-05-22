import React from "react";
import Layout from "@/components/layout/layout";
import Styles from "@/styles/Holidaydash.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";

const Holidaydashboard = () => {
  const [Holiday, setHoliday] = useState([]);

  const getHoliday = async () => {
    let res = await apiService.commonGetCall("HR/GetHolidays"); //This Api is useed for Get the Dashborad data band Master
    setHoliday(res.data);
  };

  useEffect(() => {
    getHoliday();
  }, [1]);

  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
  };

  const clearData = () => {
    sessionStorage.setItem("id", "");
  };

  const handleDelete = async (id) => {
    try {
      let res = await apiService.commonGetCall(`HR/DeleteHolidays?id=${id}`); // this is for deleting the data for dashborad using delete api call
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getHoliday();
    } catch (error) {
      console.error(error);
      Swal.fire("failed to  delete data");
    }
  };

  return (
    <div>
      <div className="container-fluid">
      <br></br> <p id={Styles.title}>Holiday Dashboard</p>
     
        <div
          className="  card p-3 mb-5 bg-white rounded"
          
        >
          <div className="col-lg-1">
            <b>
              <p className="mt-2 text-center">
                <></>
                {/* <BiFilterAlt />  */}
                Filter by:
              </p>
            </b>
          </div>

          <div className="col-lg-5">
            {/* <h6>Pay Date</h6> */}
            {/* <ReactDatePicker   className=" mt-2 form-control"></ReactDatePicker> */}
            <input
              type="search"
              className=" mt-2 form-control"
              placeholder="Search "
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <Link href="/Holiday/holidayform">
              <button
                className="btn btn-primary btn-sm shadow-lg" style={{marginLeft:"49%"}}
                id={Styles.addNew}
                onClick={clearData.bind(this)}
              >
                add new
              </button>
              {/* // onClick={() => setModalOpen(!modalOpen)}>   */}
              {/* <AiOutlinePlusCircle /> */}
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
          <table className="table table-striped table-hover mt-2">
            <thead>
              <tr>
                <th>Holiday</th>
                <th>Holiday Description</th>
                <th>Holiday Date</th>
                <th>Attachment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Holiday.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.holiday}</td>
                    <td>{data.holidayDescription}</td>
                    <td>{data.holidayDate}</td>
                    <td>{data.attachment}</td>
                    <td>
                      <Link href={`/Holiday/edit/${data.id}`}>
                        <button className="editDeleteBtnTable">Edit</button>
                      </Link>
                      &nbsp;
                      <button
                        className="editDeleteBtnTable"
                        onClick={() => handleDelete(data.id)}
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
    </div>
    </div>
  );
};

export default Holidaydashboard;
