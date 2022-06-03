<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';

require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import axios from'axios'
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      bookings:[],
      calendarOptions:  {
        plugins: [ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin,  ],
        initialView: 'dayGridMonth',
        locale:frLocale,
         headerToolbar: {
          left: 'prev today next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: this.handleDateClick,
        events: [],
        eventDisplay: 'block',
         dayHeaderFormat: {
           weekday: 'long',
             month: 'numeric',
             day: 'numeric',
              omitCommas: true
            },
      },
    }
    
  },
  mounted(){
this.getreservation();
  },
  methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },
   getreservation(){
    axios.get('http://localhost:8000/api/aff')
      .then((res) => {
		  
			    this.bookings=res.data.data1;
         let tab=[]
          for(let i=0; i>this.bookings.length; i++){
            tab1.push(bookings[i]);
          }
          console.log(substr(this.bookings[i],6))
        console.log("rrrr",this.bookings);
        this.calendarOptions.events=tab.map(enevtnew=>({title:"reservation" , start:enevtnew.created_at, end:enevtnew.updated_at}));
  },

       )},
       },

}
</script>
<template>
  <FullCalendar :options="calendarOptions"
   />
</template>
<style scoped>
@import '~@fullcalendar/list/main.min.css';

</style>