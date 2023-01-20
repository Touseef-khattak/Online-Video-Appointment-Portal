import {useUserStore} from "@/store/user";
import router from "@/router";
async function creatAppointment(data) {
    const userStore = useUserStore();
    let date = new Date();
    let body = {
        "appointmentDetails": {
            "appointmentMedium": "VIDEO",
            "appointmentForGender": "MALE",
            "appointmentForAge": data.age+"",
            "startTime": "",
            "endTime": "",
            "date": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            "duration": null,
            "reasonForVisit": "ICTP",
            "businessId": null,
            "professionalId": null,
            "appointmentType": "FORI_DOC",
            "appointmentFor": data.appointment_for.toUpperCase(),
            "patientFullName": data.appointment_for.toUpperCase() == 'SELF' ? data.patient_name : data.for_patient_name,
            "providerStaffLocationId": null,
            "appointmentServices": [],
            "otherDetails": "ICTP"
        },
        "appointmentAttachmentsDTOList": [
            {
                "attachmentType": "",
                "attachmentLocation": ""
            }
        ],
        "paymentOption": {
            "walletPayment": [
                {
                    "walletType": "PATIENT",
                    "sortOrder": 1,
                    "amount": "0.00"
                }
            ],
            "vendorPaymentDTO": {
                "msisdn": "",
                "paymentMethod": "WALLET",
                "transactionType": "ONE_TIME_PURCHASE",
                "amount": "0.00",
                "otp": "",
                "userKey": ""
            }
        },
        "patientDetails": {
            "patientId": data.userId,
            "phoneNo": data.phone+"",
            "phoneExt": "+92",
            "firstName": "",
            "lastName": ""
        },
        "appointmentVitalsDTO": {
            "pulse": data.pulse+"",
            "temperature": data.temperature+"",
            "bloodPressure": data.bloodpressure+"",
            "heartRate": data.heartrate+""
        }
    };

    await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_MAKE_APPOINTMENT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        },
        body: JSON.stringify(body),
    }).then(async function (res) {
        if(res.status == 200){
            router.push({ name: "list" });
        }
        else{
            alert(res.message.details)
        }
        // return await res.json();
    }).catch(error=>{
        return error;
    });
}

async function getAllAppointmentPaginate(status,perPage,page) {
    const userStore = useUserStore();
    let AllAppointments = await fetch(process.env.VUE_APP_API_URL + 'v2/patientByEmployer/appointments/fetchAppointments?type=ALL&status='+status+'&pageNumber='+page+'&numberOfRecordsPerPage='+perPage, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error => {
        return error;
    });

    return AllAppointments.data;
}

async function getAllAppointment(){
    const userStore = useUserStore();
    let AllAppointments = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_APPOINTMENT_LIST_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    let Completed = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_COMPLETE_APPOINTMENT_LIST_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    let Canceled = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_CANCELLED_APPOINTMENT_LIST_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    let Unscheduled = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_UNSCHEDULED_APPOINTMENT_LIST_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return {
        All : AllAppointments,
        Completed : Completed,
        Canceled : Canceled,
        Unscheduled : Unscheduled
    };
}

async function cancelAppointment(appointmentId){
    const userStore = useUserStore();
    let CancelAppointment = await fetch(process.env.VUE_APP_API_URL + 'v2/appointment/' + appointmentId + '/status/cancel/updateAppointmentStatus', {
        method: "POST",
        headers: {
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return CancelAppointment;
}

async function updateAppointmentStatus(appointmentId){
    const userStore = useUserStore();
    let updateAppointment = await fetch(process.env.VUE_APP_API_URL + 'v2/appointment/'+ appointmentId + '/status/check-in/updateAppointmentStatus', {
        method: "POST",
        headers: {
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return updateAppointment;
}

async function leaveAppointment(appointmentId){
    const userStore = useUserStore();
    let leaveAppointment = await fetch(process.env.VUE_APP_API_URL + 'v2/appointment/'+ appointmentId + '/status/patient-left-room/updateAppointmentStatus', {
        method: "POST",
        headers: {
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return leaveAppointment;
}

async function getPatientDetails(data){
    const userStore = useUserStore();
    let CancelAppointment = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_SEARCH_PATIENT_DETAILS+ data, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return CancelAppointment;
}

async function generateReport(appointmentId){
    const userStore = useUserStore();
    let fileID = await fetch(process.env.VUE_APP_API_URL + 'v2/appointment/'+appointmentId+'/generate-prescription-report', {
        method: "GET",
        headers: {
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    let report = await fetch(process.env.VUE_APP_API_URL + process.env.VUE_APP_GET_PRESCRIPTION +fileID.data, {
        method: "GET",
        headers: {
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return report;


}

async function getAllNotifications(){
    const userStore = useUserStore();
    let CancelAppointment = await fetch(process.env.VUE_APP_API_URL + 'user/'+userStore.user.userId+'/notifications/history?offset=0', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : userStore.user.token,
        }
    }).then(async function (res) {
        return await res.json();
    }).catch(error=>{
        return error;
    });

    return CancelAppointment;
}

export {
    creatAppointment,
    getAllAppointment,
    cancelAppointment,
    getPatientDetails,
    updateAppointmentStatus,
    leaveAppointment,
    getAllNotifications,
    generateReport,
    getAllAppointmentPaginate
}