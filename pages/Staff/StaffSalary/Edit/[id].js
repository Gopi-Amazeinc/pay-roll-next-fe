import AddStaffSalaryForm from "../new";
import axios from "axios";

const AddStaffSalaryEdit = ({ data }) => {
  console.log(data);
  return <AddStaffSalaryForm editData={data}></AddStaffSalaryForm>;
};
export default AddStaffSalaryEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(
    hostURL + 'HR/GetMyDetailsByStaffID?id='  + context.params.id
  );
  const data = response.data[0];
  return { props: { data } };
}
