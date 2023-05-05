
import WorkLocationMasterForm from '../new';
import axios from 'axios';

const WorkLocationEdit = ({ data }) => {
  console.log(data)
  return (
    <WorkLocationMasterForm editData={data}></WorkLocationMasterForm>
  )

}
export default WorkLocationEdit;

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Master/GetWorkingLocationMasterByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}