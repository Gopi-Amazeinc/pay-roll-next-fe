
import PositionMasterDetails from '../new';
import axios from 'axios';

const PositionMasterEdit = ({ data }) => {
  console.log(data)
  return (
    <PositionMasterDetails editData={data}></PositionMasterDetails>
  )

}
export default PositionMasterEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + 'Master/GetRoleTypeByID?ID=' + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}