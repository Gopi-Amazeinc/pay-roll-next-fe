import { useRouter } from 'next/router'
import MyteamLocatordetails from '../Myteamlocator/new';
import axios from 'axios';
const Myteamlocatoredit = ({ data }) => {
    console.log(data)
    return (        
        < MyteamLocatordetails editData = { data } ></MyteamLocatordetails >        
    )
} 
export default Myteamlocatoredit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    debugger;
    // Fetch data from external API 
    await axios.post(hostURL + "Payroll/UpdateLocatorStatus?ID=" + context.params.id);
    Swal.fire(" Locator Details Approved")
    getStafflocator()
    // Pass data to the page via props
    return { props: { data } }
}