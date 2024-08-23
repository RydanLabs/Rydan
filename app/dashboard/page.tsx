'use client';

import { createClient } from "@/utils/supabase/client";
import CardDataStats from "@/components/CardDataStats";
import { useEffect, useState } from "react";
import TimerIcon from '@mui/icons-material/Timer';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ResponsiveDrawer from "@/components/sidebar/ResponsiveDrawer";

export default function Dashboard() {
  const supabase = createClient();

  const [scheduledMessageCount, setScheduledMessageCount] = useState(0)
  const [scheduledHistoryCount, setScheduledHistoryMessageCount] = useState(0)


  useEffect(() => {
    getTotalScheduledReminder()
    getTotalRemindersSent()
  }, [])

  // https://stackoverflow.com/a/5210450
  function displayDateRange() {
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6;
    
    var firstday = new Date(curr.setDate(first))
    var lastday = new Date(curr.setDate(last));
    
    const startOfWeekMonth = firstday.toLocaleString('default', { month: 'long' });
    const endOfWeekMonth = lastday.toLocaleString('default', { month: 'long' });

    return `${startOfWeekMonth} ${firstday.getDate()} - ${endOfWeekMonth} ${lastday.getDate()} ${lastday.getFullYear()}`;
  }
  
  function getTotalScheduledReminder(){
    supabase.from('scheduled_messages').select('*', { count: 'exact', head: true }).eq('is_enabled', 'true').then((scheduled) => {
      setScheduledMessageCount(scheduled.count ?? 0)
    })
  }

  function getTotalRemindersSent(){
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6;
    
    var firstday = new Date(curr.setDate(first))
    var lastday = new Date(curr.setDate(last));
    supabase.from('scheduled_history').select('*', { count: 'exact', head: true }).lt("created_at", lastday).gt("created_at", firstday).then((scheduled) => {
      setScheduledHistoryMessageCount(scheduled.count ?? 0)
    })
  }

  return (
    <div>
      <ResponsiveDrawer>
        <h2 className="mt-6">{displayDateRange()}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-6">
          <CardDataStats title="Total Reminders Scheduled" total={scheduledMessageCount.toString()} rate="">
            <TimerIcon></TimerIcon>
          </CardDataStats>
          
          <CardDataStats title="Total Reminders Sent" total={scheduledHistoryCount.toString()} rate="">
            <ArrowCircleRightIcon></ArrowCircleRightIcon>
          </CardDataStats>
        </div>
      </ResponsiveDrawer>
    </div>
  )
}
