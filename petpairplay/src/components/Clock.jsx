import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = weekDays[time.getDay()];
  const monthName = months[time.getMonth()];
  const date = time.getDate();

  // Format hours to 12-hour format and get AM/PM
  let hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const minutes = String(time.getMinutes()).padStart(2, '0');

  return (
    <div style={{color:'white',  textAlign: 'right', fontSize: '13px'}}>
      <p>{dayOfWeek}, {monthName} {date}</p>
      <p>{hours}:{minutes} {ampm}</p> 
    </div>
  );
}

export default Clock;
