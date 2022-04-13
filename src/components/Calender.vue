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
      calendarOptions:  {
        ch:'',
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
  methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },
    getbg(){
    axios.get('http://localhost:8000/api/All-Bookings-rooms',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
                .then(res => {
                  let reserv = res.data.bookings
                  let tab=[]
                  for (let i=0; i<reserv.length ;i++){
                    if(reserv[i].confirmation==1){
                      tab.push(reserv[i])
                      
                   /*  let id=reserv[i].room_id
                    axios.get('http://localhost:8000/api/user/room/'+id,
                      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }} 
                      )
                      .then(res=>{
                        console.log("hoo",res.data);
                         this.ch = res.data.room.num_room;
                        console.log('gggo',this.ch);
                         reserv[i].color="h"+this.ch;
                      })*/
                      
                      
                  console.log("gg",this.ch);
                    }
                  }
                  this.calendarOptions.events=tab.map(enevtnew=>({title: "Room reservation", start: enevtnew.start , end: enevtnew.end}
                  ));
                  console.log("hhggf",tab);
                        });
    },
  
  },

mounted () {
  this.getbg();
  }

}
</script>
<template>
  <FullCalendar :options="calendarOptions"
   />
</template>
<style scoped>
@import '~@fullcalendar/list/main.min.css';

</style>