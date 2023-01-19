import { defineStore } from 'pinia'
import {useUserStore} from "@/store/user";
import router from "@/router";

export const vedioSession = defineStore('counter', {
  state: () => ({
    API_KEY : process.env.VUE_APP_OPENTOK_API_KEY,
    TOKEN : 'T1==cGFydG5lcl9pZD00NzY0NDk5MSZzaWc9NzNkOGMwNjRjNjgzMTc0ZmQzOTRiZjcxODAwYjJmN2M1YWY4MWFmZjpzZXNzaW9uX2lkPTJfTVg0ME56WTBORGs1TVg1LU1UWTNNemcxT0RJeE56TTJPWDVDU1ROdWREWm5UazlQYzI4cmRFd3lTblJZUWpSUU1EZC1mbjQmY3JlYXRlX3RpbWU9MTY3Mzg1ODIzNSZub25jZT0wLjgwMDgwMTIxMTc1MzEzMzEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY3NjQ1MDIzNSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==',
    SESSION_ID : '2_MX40NzY0NDk5MX5-MTY3Mzg1ODIxNzM2OX5CSTNudDZnTk9Pc28rdEwySnRYQjRQMDd-fn4',
    OT : require('@opentok/client'),
    connected : false,
    subscriber : false,
  }),
  actions: {
    initiate(){
      if (this.API_KEY && this.TOKEN && this.SESSION_ID) {
        this.initializeSession();
        this.connected = true
      } else {
        this.connected = false;
        console.error('Failed to get opentok SESSION_ID and TOKEN. Make sure you have updated your configuration.');
      }
    },
    initializeSession() {
      var session = this.OT.initSession(this.API_KEY, this.SESSION_ID);
      const userStore = useUserStore();
      // Subscribe to a newly created stream
      session.on('streamCreated', function streamCreated(event) {
        var subscriberOptions = {
          insertMode: 'append',
          width: '100%',
          height: '600px',
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
        width: '300px',
        height: '500px',
        name: userStore.user.firstName,
        style: { nameDisplayMode: "on" }

      };
      var publisher = this.OT.initPublisher('publisher_container', publisherOptions);
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
      ;
    }
  },
})
