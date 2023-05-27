
import { useRouter } from 'next/router'
import ComponentMappingForm from '../new'


function ComponentMappingID() {
    const router = useRouter()
    const { id } = router.query
    return (
        <ComponentMappingForm editData={{ id }} />
    )
    }


export default  ComponentMappingID