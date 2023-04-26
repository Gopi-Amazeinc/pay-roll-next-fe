
import SubSectionMasterForm from '../new';
import axios from 'axios';

const SubSectionEdit = ({ data }) => {
  console.log(data)
  return (
    <SubSectionMasterForm editData={data}></SubSectionMasterForm>
  )

}
export default SubSectionEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetSubSectionMasterByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}