import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffDashboard() {
  const [staff, setStaffData] = useState([]);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  const getStaff = async () => {
    let res = await axios.get(hostURL + "");
    setStaffData(res.data);
  };

  useEffect(() => {
    getStaff();
  }, []);

  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
  };

  const clearData = () => {
    sessionStorage.setItem("id", "");
  };
  const handleDelete = async (id) => {
    try {
        let res = await axios.get(hostURL + ``);
        console.log(res.data);
        Swal.fire('Data deleted successfully')
        getbarangaymaster();
    } catch (error) {
        console.error(error);
        Swal.fire('failed to  delete data')
    }
};

return (
    <>
     <div className="container">
      <br />
      <h5 className="Heading">Barangay Master</h5>
      <div className="card shadow-lg p-4 rounded-3 mt-4">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              placeholder="Search"
              className="form-control form-control-sm"
            />
          </div>
        </div>
      </div>
      </div>
      
    </>
)

}