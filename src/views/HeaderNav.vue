<template>
  <div class="container">
    <nav v-if="userStore.user" class="d-flex justify-content-between">
      <img src="@/assets/ictp-logo.svg" alt="ICTP LOGO" width="55" height="60">
      <div class="right_nav align-items-center d-flex flex-row" v-if="this.$route.name != 'appointment'">
        <button class="alert_container position-relative"  v-on:click="alertToggle = !alertToggle">
          <img src="@/assets/bell_icon.svg" alt="ICTP LOGO" width="16" height="20">
          <sup class="count_alerts">2</sup>

          <div class="alerts position-absolute" v-if="!alertToggle">
            <h3>Notifications</h3>
            <p class="notifications" v-for="item in this.notifications" :key="item.serAppointmentId">
              Lorem ipsum dolor sit amet consectetur. Etiam consectetur ipsum ac aliquam aliquam libero pretium massa.sssssssss
            </p>
          </div>

        </button>
        <div class="profile_img">
          {{(userStore.isLoggedIn() && userStore.user.firstName) ? userStore.user.firstName.split('')[0] : 'A'}}
        </div>
        <div class="profile_name">
          <span>{{(userStore.isLoggedIn() && userStore.user.firstName) ? userStore.user.firstName : 'Your Name'}}</span>
        </div>
        <button class="logout_btn" @click="userStore.logout()">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user";
import {getAllNotifications} from "@/api/appointment";
import router from "@/router";
export default {
  name: "HeaderNav",
  data(){
    return {
      alertToggle: true,
      notifications: null,
    }
  },
  // created() {
  //   // request permission for notifications
  //   console.log('Requesting permission...');
  //   const messaging = getMessaging();
  //     Notification.requestPermission().then(async (permission) => {
  //       if (permission === 'granted') {
  //         console.log('Notification permission granted.');
  //         await getToken(messaging).then((token) => {
  //           console.log(token);
  //           const userStore = useUserStore();
  //           userStore.device_token = token;
  //           //send the token to your server
  //         }).catch((err) => {
  //           console.log('An error occurred while retrieving token. ', err);
  //         });
  //       }
  //     })
  // },
  // plugins: [firestorePlugin],
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods:{
    async getNotifications() {
      this.notifications = await getAllNotifications();
      this.notifications = this.notifications.notificationHistory.notifications;
    }
  },
  mounted() {
    if(useUserStore().isLoggedIn()){
      this.getNotifications()
    }
    else{
      router.push('list');
    }
  }
}

</script>

<style scoped>
  .count_alerts{
    width: 16px;
    height: 16px;
    background: #E92C2C;
    border-radius: 50%;
    color: #FFF;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: -8px;
  }
  .profile_img{
    width: 32px;
    height: 32px;
    background: linear-gradient(0deg, rgba(120, 73, 120, 0.16), rgba(120, 73, 120, 0.16)), #FFFFFF;
    border-radius: 256px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .profile_name span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  nav button.logout_btn{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: #FF4545;
    text-decoration: none;
    width: 57px;
    height: 32px;
    border: 1px solid #FF4545;
    border-radius: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  }
  .right_nav > div,
  .right_nav > button.logout_btn{
    margin: 5px;
  }
  .alert_container{
    background: none;
    border: none;
  }
  .alert_container h3{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 20px;
  }
  .alert_container p.notifications{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #394452;
    padding-right: 25px;
  }
  .alerts{
    width: 345px;
    background: #FFFFFF;
    box-shadow: 0px 15px 30px rgba(160, 160, 160, 0.25);
    border-radius: 8px;
    text-align: left;
    text-align: left;
    top: 100%;
    right: 100%;
    padding: 20px;
    z-index: 999;
  }
</style>