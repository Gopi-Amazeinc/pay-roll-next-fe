import Link from "next/link";
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
  }, [1]);

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
    </>
)

}
