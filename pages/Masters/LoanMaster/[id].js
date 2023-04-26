
import LeaveType from '../new';
import axios from 'axios';

const LoanTypeEdit = ({ data }) => {
  console.log(data)
  return (
    <LeaveType editData={data}></LeaveType>
  )

}
export default LoanTypeEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetLoanMasterByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}