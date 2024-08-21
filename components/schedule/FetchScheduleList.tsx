"use client"

import { useState, useEffect } from 'react'
import { createClient } from "@/utils/supabase/client";
import { Database } from '@/utils/supabase/supabase'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Switch } from '@mui/material';
import { handleScheduleChange } from './actions';


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
  
  const handleSwitchChange = (scheduleIndex: string, listIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked
    setSwitchStates({
      ...switchStates,
      [listIndex]: isEnabled,
    });
    handleScheduleChange(isEnabled, scheduleIndex)
  };

  return (
    <div>
      <List sx={{ width: '100%' }}>
        {scheduleMessage.map((message, index) => (
        <ListItem key={index} sx={{ width: '100%', mb: 2, p: 0, display: 'flex', justifyContent: 'flex-start' }}>
          <Card sx={{ width: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {message.phone_number}
                  </Typography>
                  <Switch edge="end"
                          checked={switchStates[index] || false}
                          onChange={handleSwitchChange(message.id, index)}                  
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {message.message_to_send}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
    );
}