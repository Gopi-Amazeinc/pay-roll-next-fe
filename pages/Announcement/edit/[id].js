import React from 'react'
import { useRouter } from "next/router";
import Announcementform from "@/pages/Announcement/announcementform";


function AnnouncementID() {
    const router = useRouter();
     const { id } = router.query;
   
   return(
       <>
       <Announcementform editData={{ id }} />;
   
       </>
   );
   
       
   }
   
   export default AnnouncementID;