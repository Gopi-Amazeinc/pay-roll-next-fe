
import ShiftMaster from '../new';
import axios from 'axios';

const ShiftMasterEdit = ({ data }) => {
  console.log(data)
  return (
    <ShiftMaster editData={data}></ShiftMaster>
  )

}
export default ShiftMasterEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetShiftMasterByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}