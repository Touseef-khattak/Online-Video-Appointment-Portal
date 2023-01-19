<template>
  <div id="video_call">
    <div class="container">
      <div v-if="!connected" class="loading_screen">
        <img src="@/assets/waiting.gif" alt="" width="300">
        <p>Please wait while we connect you with the doctor</p>
        <!--        <button @click="initiate">Start</button>-->
        <a href="/list" class="btn">Go Back</a>
      </div>
      <div id="subscriber" class="connecting-doctor">
        <div class="visible-loader">
          <div class="loading-dots">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </div>
        <div class="icon_container d-flex" v-if="connected">
          <button>
<!--            <img v-if="this.audio_icon == 'unblock'" src="@/assets/microphone.svg" alt="" width="25">-->
            <img v-if="this.audio_icon == 'block'" src="@/assets/microphone_block.svg" alt="" width="25">
          </button>
          <button>
            <img src="@/assets/video_icon.svg" alt="" width="25">
          </button>
          <button>
            <img src="@/assets/exit_call.svg" @click="endCall" alt="" width="25">
          </button>
        </div>
      </div>
      <div id="publisher"></div>
      <div class="end-meeting col-md-12">
        <a onclick="endCall()" title="End Call"><img src="@/assets/exit_call.svg" /></a>
      </div>
    </div>
  </div>
</template>
<script>
import {useUserStore} from "@/store/user";
import router from "@/router";
import {getMessaging, onMessage} from "firebase/messaging";

export default {
  name: "AppointmentScreen",
  data(){
    return {
      API_KEY : process.env.VUE_APP_OPENTOK_API_KEY,
      TOKEN : null,
      SESSION_ID : null,
      OT : require('@opentok/client'),
      connected : false,
      subscriber : false,
      myPublisher : null,
      mySession: null,
      audio_icon: 'block'
    }
  },
  mounted() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Doctor Connected. ', payload);
      let data = payload.notification.body.split('param=')[1].split(':');
      this.TOKEN = data[1];
      this.SESSION_ID = data[0];
      if (this.API_KEY && this.TOKEN){
        this.initiate();
      }
    });
  },
  methods : {
    initiate(){
      if (this.API_KEY && this.TOKEN && this.SESSION_ID) {
        this.initializeSession();
        this.connected = true
      } else {
        console.error('Failed to get opentok SESSION_ID and TOKEN. Make sure you have updated your configuration.');
      }
    },
    initializeSession() {
      var session = this.OT.initSession(this.API_KEY, this.SESSION_ID);
      this.mySession = session;
      const userStore = useUserStore();
      // Subscribe to a newly created stream
      session.on('streamCreated', function streamCreated(event) {
        var subscriberOptions = {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          name: userStore.user.firstName,
          style: { nameDisplayMode: "on" }
        };
        var subscriber = session.subscribe(event.stream, 'subscriber', subscriberOptions);
        subscriber.on({
          disconnected: function () {
            console.log('subscriber disconnected');
          },
          connected: function () {
            this.subscriber = true;
            console.log('subscriber connected');
          },
          destroyed: function () {
            this.TOKEN = null;
            this.SESSION_ID = null;
            this.connected = false;
            this.subscribe = false;
            session.disconnect();
            router.push({ name: "list" });
          },
          audioBlocked: function() {
            // display custom UI
          },
          audioUnblocked: function() {
            // hide custom UI
          }
        });
      });
      session.on('sessionDisconnected', function (event) {
        console.log(event.reason);
        console.log('You were disconnected from the session.', event.reason);
      });
      // initialize the publisher
      var publisherOptions = {
        insertMode: 'append',
        width: '150px',
        height: '200px',
        name: userStore.user.firstName,
        style: { nameDisplayMode: "on" }

      };
      var publisher = this.OT.initPublisher('publisher', publisherOptions);
      // this.myPublisher = publisher;
      // Connect to the session
      session.connect(this.TOKEN, function callback(error) {
            if (error) {
              if (error.name === 'OT_AUTHENTICATION_ERROR') {
                console.log(error)
              }
            } else {
              // If the connection is successful, publish the publisher to the session
              session.publish(publisher);
            }
          }
      )
    },
    endCall(){
      this.mySession.disconnect();
    },
    // audiotoggle(){
    //   if(event.target.classList.contains('audio_blocked')){
    //     event.target.classList.remove('audio_blocked')
    //     this.audio_icon = 'unblock';
    //     this.mySession.audioUnblocked();
    //   }else{
    //     event.target.classList.add('audio_blocked')
    //     this.audio_icon = 'block';
    //     this.mySession.audioBlocked();
    //   }
    // }
  }
}

</script>

<style scoped>
template{
  background-color: #F7F4F4;
}
#video_call{
  border-top: 1px solid #EDEDED;
  border-bottom: 1px solid #EDEDED;
}
#video_call .container{
  position: relative;
  height: 90vh;
  padding: 10px 50px 90px 50px;
}
#subscriber{
  height: 100%;
  position: relative;
}
#subscriber .icon_container button{
  border: none;
  width: 50px;
  height: 50px;
  background: #FFF;
  border-radius: 50%;
  box-shadow: 0px 13.125px 26.25px rgba(186, 186, 186, 0.25);
}
#subscriber .icon_container button:nth-child(3){
  background: #F54E46;
  box-shadow: 0px 13.125px 26.25px rgba(186, 186, 186, 0.25);
}
#subscriber .icon_container{
  position: absolute;
  bottom: -70px;
  left: 40%;
  z-index: 9;
  gap: 20px;
}
#publisher{
  overflow: hidden;
  z-index: 999 !important;
  bottom: 100px !important;
  right: 70px !important;
  position: absolute !important;
}
nav{
  padding: 15px 0px;
}

</style>