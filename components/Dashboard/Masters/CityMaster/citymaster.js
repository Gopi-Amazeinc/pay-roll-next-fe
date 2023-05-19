import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import Layout from '../../../layout/layout'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ReactPaginate from "react-paginate";

function CityMasterDash() {

  const [CityMaster, setCityMaster] = useState([]);

  const getCityMaster = async () => {
    let res = await apiService.commonGetCall("Master/GetCityType"); //This Api is useed for Get the Dashborad data ciyType Master
    setCityMaster(res.data);
  };

  useEffect(() => {
    getCityMaster();
  }, []);

  async function DeleteCityMaster(id) {
    try {
      const res = await apiService.commonGetCall(`Master/DeleteCityType?id=${id}`);
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

  const PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(CityMaster.length / PER_PAGE);
  const [keyword, setKeyword] = useState("");


  return (
    <Layout>
      <div className="container-fluid">
        <p className="Heading">City Master</p>
        <div className="card p-3 rounded-3 border-0">
          <div className="row">
            <div className="col-lg-1">
              <p> <BiFilterAlt /> Filter By</p>
            </div>
            <div className="col-lg-3">
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                onChange={e => setKeyword(e.target.value)}
              ></input>
            </div>
            <div className="col-lg-3">
              <select
                className="form-select"
              >
                <option value="">Select Province</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <p className="col-lg-2 result-heading">Showing {CityMaster.length} Results</p>
          <div className="col-lg-8"></div>
          <div className="col-lg-2">
            <Link href="/Masters/CityMaster/new">
              <button className=" AddButton">
                <AiOutlinePlus />    Add New
              </button>
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
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
                      {CityMaster
                        .filter(data => {
                          if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                            return data;
                          }
                        })
                        .slice(offset, offset + PER_PAGE)
                        .map((data) => {
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

        <div className="row">
          {/* <div className="col-lg-3"></div> */}
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination  justify-content-center"}
              pageClassName={"page-item "}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active primary"}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </Layout>
  );
}

export default CityMasterDash;