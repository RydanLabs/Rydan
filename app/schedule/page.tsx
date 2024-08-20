'use client';


import FetchDataSteps from "@/components/schedule/FetchScheduleList";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation'
import ResponsiveDrawer from "@/components/sidebar/ResponsiveDrawer";


export default function ScheduleList() {

    const router = useRouter()

    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        bgcolor: '#1976d2 !important',
      };
    

    return (
        <>
        <ResponsiveDrawer>
          <FetchDataSteps />
          <Fab variant="extended" sx={fabStyle} onClick={() => router.push('/schedule/add')}>
            <AddIcon sx={{ mr: 1 }}></AddIcon>
            Schedule Reminder
          </Fab>

        </ResponsiveDrawer>

        </>

    )

}

