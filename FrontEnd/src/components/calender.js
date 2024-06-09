import React, { useEffect } from 'react';
import $ from 'jquery';
import 'evo-calendar/evo-calendar/css/evo-calendar.min.css';
import 'evo-calendar/evo-calendar/js/evo-calendar.min.js';
import './calender.css'
export default function Calendar() {
  useEffect(() => {
    $(document).ready(function() {
      $('#calendar').evoCalendar({
        theme: 'Midnight Blue', // Set your desired theme
        format: 'mm/dd/yyyy',
        titleFormat: 'MM yyyy',
        eventHeaderFormat: 'MM dd, yyyy',
        sidebarToggler: true,
        eventListToggler: true,
        calendarEvents: [
          {
            id: 'mmnnn',
            name: 'New Year',
            date: '01/01/2023',
            type: 'holiday',
            everyYear: true
          },
          {
            id: '0908',
            name: 'Another Event',
            date: '09/08/2023',
            type: 'special',
            everyYear: true
          }
        ]
      });
    });
  }, []);

  return (
    <div className="hero" > 
      <div id="calendar"></div>
    </div>
  );
}
