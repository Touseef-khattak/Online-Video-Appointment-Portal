import { defineStore } from "pinia";
import { apiCall } from "@/api/ajax.js";
import router from "@/router";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: null,
            token: null,
            returnUrl: null,
            device_token: null
        }
    },
    getters: {
        getID: (state) => state.user
    },
    actions: {
        // async fetchUser() {
        //     const res = await fetch("http://localhost:8080/user");
        //
        //     const user = await res.json();
        //     this.user = user;
        // },
        // async signUp(email, password) {
        //     const res = await fetch("http://localhost:8080/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });
        //     const user = await res.json()
        //     this.user = user;
        // },
        async signIn(email, password) {
            let body = {
                email : email,
                password : password,
                deviceToken : this.device_token,
            }
             apiCall(process.env.VUE_APP_API_URL + process.env.VUE_APP_REGISTRATION_URL,body).then((res)=>{
                 if(res.status.result == "SUCCESS"){
                     this.user = res.data;
                     this.token = res.data.token;
                     localStorage.setItem('user', JSON.stringify(this.user));
                     router.push({ name: "list" });
                 }else{
                     return res;
                 }
             })
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('user');
            router.push({ name: "login" });
        },
        isLoggedIn() {
            if(this.user){
                return true;
            }else{
                return false;
            }
        },
        getUserID() {
            if(this.user){
                return this.user.userId;
            }else{
                return 0;
            }
        },
        getToken() {
            if(this.user){
                return this.token;
            }else{
                return null;
            }
        },
    },
    persist: {
        storage: sessionStorage,
        paths: ['user'],
    },
});