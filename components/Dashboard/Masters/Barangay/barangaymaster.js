import Link from "next/link";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

export default function BarangayMasterDash() {
  const [barangaymaster, setbarangaymaster] = useState([])
  const getbarangaymaster = async () => {
    let res = await apiService.commonGetCall("Master/GetBarangayMaster");
    setbarangaymaster(res.data);
  };
  useEffect(() => {
    getbarangaymaster();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await apiService.commonGetCall(
        `Master/DeleteBarangayMaster?id=${id}`
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
      <p className="Heading">Barangay Master</p>
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
        </div>
      </div>

      <div className="row mt-3">
        <p className="col-2 result-heading">Showing {barangaymaster.length} Results</p>
        <div className="col-8"></div>
        <div className="col-2">
          <Link href="/Masters/BarangayMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr >
              <th>Country Name</th>
              <th>Province Name</th>
              <th>City Name</th>
              <th>Barangay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(barangaymaster) &&
              barangaymaster.length > 0 && (
                <>
                  {barangaymaster.map((data, index) => {
                    return (
                      <tr key={index}>
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
                          &nbsp;&nbsp;
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
                </>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
