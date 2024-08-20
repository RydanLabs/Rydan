'use client';

import { createClient } from "@/utils/supabase/client";
import ResponsiveDrawer from "@/components/sidebar/ResponsiveDrawer";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, List, ListItem, Typography } from "@mui/material";

export default function History(){
    const supabase = createClient();
    type ScheduledMessageWithHistory = { created_at: string; scheduled_id: string; scheduled_messages: { id: string; message_to_send: string; phone_number: string; comms_type: "PHONE_CALLS" | "SMS" | null; } | null; }[] | null;

    const [scheduledMessage, setScheduledMessage] = useState<ScheduledMessageWithHistory | null>(null);



    async function getTotalRemindersSent(){
        const scheduledHistoryQuery = supabase.from('scheduled_history').select(`created_at, scheduled_id, scheduled_messages(id, message_to_send, phone_number, comms_type)`)
        const { data, error } = await scheduledHistoryQuery
        if(data){
            setScheduledMessage(data)
        }
    }
    
    function convertTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const language = navigator.language || 'en-US';  
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat(language, options).format(date);
    }
    

    useEffect(() => {
        getTotalRemindersSent()
    })

    return (
        <div>
          <ResponsiveDrawer>
            <h2>Past Reminders</h2>
            <List sx={{ width: '100%' }}>
                {scheduledMessage?.map((message, index) => (
                <ListItem key={index} sx={{ width: '100%', mb: 2, p: 0, display: 'flex', justifyContent: 'flex-start' }}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {message.scheduled_messages?.phone_number}
                            </Typography>
                            
                            <Typography variant="subtitle2">
                                {convertTimestamp(message.created_at)}
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                {message.scheduled_messages?.message_to_send}
                            </Typography>

                        </CardContent>
                    </Card>
                </ListItem>
        ))}
      </List>

          </ResponsiveDrawer>
        </div>
      )
    
}