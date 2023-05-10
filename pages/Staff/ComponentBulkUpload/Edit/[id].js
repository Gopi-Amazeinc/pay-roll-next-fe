import { useRouter } from "next/router";
import ComponentBulkUploadForm from "../../../../pages/Staff/ComponentBulkUpload/new"

const ComponentBulkUploadFormEdit = () => {
  const router = useRouter()
  const { id } = router.query
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  // const [staff, setStaffData] = useState([]);
  // const [component, setComponentData] = useState([]);
  // const [payment, setPayment] = useState([]);

  // useEffect(() => {
  //   getData();
  //   getByID();
  // }, [1]);

  // async function getData() {
  //   let res = await axios.get(hostURL + "HR/GetAllStaffNew");
  //   setStaffData(res.data);


  // }

  // const getByID = async () => {
  //   if (id) {
  //     let response = await axios.get(
  //       hostURL + "Payroll/GetPayrollComponentBulkUploadByID?ID=" + id
  //     );
  //     clearForm(response.data[0])
  //   } else {
  //     clearForm();
  //   }
  // }

  // function clearForm(userData = null) {
  //   let details = {
  //     ID: userData ? userData.id : "",
  //     EmployeeID: userData ? userData.employeeID : "",
  //     PayCode: userData ? userData.payCode : "",
  //     Amount: userData ? userData.amount : "",
  //     Paymentfrequeicy: userData ? userData.paymentfrequeicy : "",
  //   };
  //   reset(details);
  // }

  // async function onSubmit(data) {

  //   await axios.post(hostURL + "HR/UpdatePayrollComponentBulkUpload", data);
  //   Swal.fire("Updated successfully");
  //   location.href = "/Staff/ComponentBulkUpload";

  // }

  return (
    <ComponentBulkUploadForm editData={{ id }}/>
  );
};
export default ComponentBulkUploadFormEdit;