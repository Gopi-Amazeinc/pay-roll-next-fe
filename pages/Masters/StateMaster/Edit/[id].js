
import StateMasterForm from '../new';
import axios from 'axios';

const StateMasterEdit = ({ data }) => {
  console.log(data)
  return (
    <StateMasterForm editData={data}></StateMasterForm>
  )

}
export default StateMasterEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetStateTypeByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}