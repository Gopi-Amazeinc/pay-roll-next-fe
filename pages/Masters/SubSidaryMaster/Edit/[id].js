
import SubsidaryMasterForm from '../new';
import axios from 'axios';

const SubSidaryEdit = ({ data }) => {
  console.log(data)
  return (
    <SubsidaryMasterForm editData={data}></SubsidaryMasterForm>
  )

}
export default SubSidaryEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetSubsidaryMasterByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}