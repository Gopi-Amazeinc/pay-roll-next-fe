import React from 'react';
import { useRouter } from 'next/router'
import Holidayform from '../holidayform';
import axios from 'axios';


const Id = ({ data }) => {
    console.log(data)
    // const router = useRouter()
    // const { id } = router.query

  
    return (
        <div>
            <Holidayform editData={data}></Holidayform>
        </div>
    );
}

export default Id;


export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "HR/GetHolidaysByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}
