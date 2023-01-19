<template>
  <section class="login-form">
    <form @submit.prevent="created">
      <img src="@/assets/Logo.svg" alt="Wow Health Logo">
      <h2>Welcome back!</h2>
      <p>Login to your account</p>
      <input type="text" class="login_input" v-model="form.email" name="email" placeholder="Username/ Email"> <br>
      <input type="password" class="login_input" v-model="form.password" name="password" placeholder="Password"> <br>
      <input type="submit" class="login_input_btn" value="Login">
    </form>
  </section>
  <p class="powered_para">Powerd by Tangent Technologies</p>
</template>

<script>
import { useUserStore } from "@/store/user";
import {getMessaging, getToken} from "firebase/messaging";
import {firestorePlugin} from "vuefire";
export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        email:"",
        password:""
      }
    }
  },
  plugins: [firestorePlugin],
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async login() {
      await this.userStore.signIn(this.form.email, this.form.password);
    },
    created() {
      // request permission for notifications
      console.log('Requesting permission...');
      const messaging = getMessaging();
      Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          await getToken(messaging).then((token) => {
            console.log(token);
            const userStore = useUserStore();
            userStore.device_token = token;
            this.login();
            //send the token to your server
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
        }else{
          alert("Please Allow Notifications In order to Login.");
        }
      })
    },
  },
}
</script>

<style scoped>
.login-form{
    width: 500px;
    margin: auto;
    margin-top: 10vh;
  }
.login-form input.login_input:focus-visible{
  outline: none;
}
.login-form input.login_input,
.login-form input.login_input_btn{
    width: 375px;
    height: 52px;
    background: rgba(239, 241, 249, 0.6);
    border-radius: 8px;
    margin: 10px auto;
    border: none;
    padding: 15px;
  }
.login-form input.login_input_btn{
    background: #784978;
    border-radius: 8px;
    color: #FFFFFF;
}
.login-form input.login_input_btn::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #8A8A8A;
  opacity: 1; /* Firefox */
}
.powered_para{
  text-align: center;
}
</style>