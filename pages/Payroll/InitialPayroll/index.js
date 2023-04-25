import React from 'react'
import Layout from '@/components/Layout/index'
const index = () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL

    const [intialPayroll, setInitialPayroll] = useState([]);

    const getInitialPayroll = async () => {
        const { data } = await axios.get(hostURL + "Payroll/GetPreliminarySalary") //gurukiran@amazeinc.in, this API is to fetch the data into the table
        setInitialPayroll(data);
    }
    useEffect(() => {
        getInitialPayroll();
    }, [])
    return (
        <Layout>
            <InitialPayroll></InitialPayroll>
        </Layout>
    )
}

export default index