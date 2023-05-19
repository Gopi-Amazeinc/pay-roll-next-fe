import { useRouter } from "next/router";
import BarangayMasterForm from "@/pages/Masters/BarangayMaster/new";

const BarangayEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <BarangayMasterForm editData={{ id }} />;
};
export default BarangayEdit;