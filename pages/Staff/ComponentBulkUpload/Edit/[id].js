import { useRouter } from "next/router";
import ComponentBulkUploadForm from "../../../../pages/Staff/ComponentBulkUpload/new"

const ComponentBulkUploadFormEdit = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <ComponentBulkUploadForm editData={{ id }}/>
  );
};
export default ComponentBulkUploadFormEdit;