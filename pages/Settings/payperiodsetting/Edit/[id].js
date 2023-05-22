
import { useRouter } from 'next/router'
import PayPeriodSettingform from '../new'

function PayPeriodSettingformID() {
    const router = useRouter()
    const { id } = router.query
    return (
        <PayPeriodSettingform editData={{ id }} />
    )
    }


export default PayPeriodSettingformID
