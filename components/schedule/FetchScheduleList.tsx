"use client"

import { useState, useEffect } from 'react'
import { createClient } from "@/utils/supabase/client";
import { Database } from '@/utils/supabase/supabase'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Switch, IconButton, MenuItem, Menu } from '@mui/material';
import { handleScheduleChange, handleScheduleDelete } from './actions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link'


export default function FetchScheduleList() {
  const supabase = createClient();
   type scheduled_messages_table = Database['public']['Tables']['scheduled_messages']['Row'];
  const [scheduleMessage, setScheduleMessage] = useState<scheduled_messages_table[]>([]);
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase.auth.getUser().then((userResponse) => {
      const userData = userResponse.data
      if(userData && userData.user?.id){
        supabase.from('scheduled_messages').select().eq('user_id', userData.user.id).order("is_enabled", { ascending: false }).then(scheduleMessageData => {
          const scheduledMessage = scheduleMessageData.data
          if(scheduledMessage){
            setScheduleMessage(scheduledMessage)

            // Initialize switchStates based on is_enabled
            const initialStates = scheduledMessage.reduce((acc, message, index) => {
              acc[index] = message.is_enabled ?? false;
              return acc;
            }, {} as Record<number, boolean>);
            setSwitchStates(initialStates);
          }
        })
      }
    })
  }, []);
  

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleMenuClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleDelete = async (scheduleId: string) => {
    const updatedMessages = scheduleMessage.filter((message) => message.id !== scheduleId);
    setScheduleMessage(updatedMessages);
    handleMenuClose();
    await handleScheduleDelete(scheduleId);
  }

  // https://stackoverflow.com/a/13899011
  // TODO: Add type checking here
  function tConvert (time: any) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  
      

  const handleSwitchChange = (scheduleIndex: string, listIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked
    setSwitchStates({
      ...switchStates,
      [listIndex]: isEnabled,
    });
    handleScheduleChange(isEnabled, scheduleIndex)
  };

  return (
    <List sx={{ width: '100%' }}>
      {scheduleMessage.map((message, index) => (
        <ListItem key={index} sx={{ width: '100%', mb: 2, p: 0, display: 'flex', justifyContent: 'flex-start' }}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {message.phone_number}
                </Typography>
                <IconButton onClick={(event) => handleMenuClick(event, index)}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuIndex === index}
                onClose={handleMenuClose}>
                <Link href={`/schedule/add?scheduleId=${message.id}`} passHref>
                  <MenuItem component="a" onClick={handleMenuClose}>Edit</MenuItem>
                </Link>
                <MenuItem onClick={() => handleDelete(message.id)}>Delete</MenuItem>
              </Menu>
              <Typography color="text.secondary">
                {message.schedule_frequency} @ {tConvert(message.scheduled_time)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" color="text.secondary" className='font-bold'>
                  {message.message_to_send}
                </Typography>
                <Switch
                  edge="end"
                  checked={switchStates[index] || false}
                  onChange={handleSwitchChange(message.id, index)}
                />
              </Box>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
