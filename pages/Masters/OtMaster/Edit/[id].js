
import Otmaster from '../new';
import axios from 'axios';

const OTmasterEdit = ({ data }) => {
  console.log(data)
  return (
    <Otmaster editData={data}></Otmaster>
  )

}
export default OTmasterEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetOTRatesByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}