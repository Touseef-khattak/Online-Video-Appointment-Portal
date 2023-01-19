<template>
  <div class="container text-start position-relative">
    <form  @submit.prevent="creatAppointment">
      <div class="row">
        <div class="col">
          <div class="search_form">
            <p class="text-start">
              <a href="/list">
                <img src="@/assets/chevron-left.svg" alt="Chevron" width="10" style="margin-top: -3px">
                Back to appointments
              </a>
            </p>
            <h4>
              Patient Details
            </h4>
            <p>
              Search with
            </p>
            <div class="select_search_option">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="search_with" v-model="search_by" id="select_cnic" value="cnic" checked>
                <label class="form-check-label" for="select_cnic">CNIC</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="search_with" v-model="search_by" id="select_phone" value="phone">
                <label class="form-check-label" for="select_phone">Mobile number</label>
              </div>
            </div>
            <div class="mb-3" :class="search_by == 'phone'?'disable':''">
              <label for="cnic" class="form-label">CNIC</label>
              <input @change="searchPatient" maxlength="16" type="text" class="form-control custom_input" v-model="form.cnic" name="cnic">
            </div>
            <div class="mb-3" :class="search_by == 'cnic'?'disable':''">
              <label for="phone" class="form-label">Phone Number</label>
              <input @change="searchPatient" type="text" maxlength="10" class="form-control custom_input" v-model="form.phone" name="phone" placeholder="0300-XXXXXXX">
            </div>
            <div class="mb-3">
              <label for="patient_name" class="form-label">Patient Name</label>
              <input type="text" class="form-control custom_input" id="patient_name" v-model="form.patient_name" name="patient_name" placeholder="Name">
            </div>
            <div class="mb-3">
              <label for="appointment_for" class="form-label">Appointment For</label>
              <select id="appointment_for" v-model="form.appointment_for" name="appointment_for" class="form-select custom_input">
                <option selected value="SELF">Myelf</option>
                <option value="FATHER">Father</option>
                <option value="MOTHER">Mother</option>
                <option value="SPOUSE">Spouse</option>
                <option value="DAUGHTER">Daughter</option>
                <option value="SON">Son</option>
                <option value="RELATIVE">Relative</option>
              </select>
            </div>
            <div v-if="form.appointment_for!='SELF'">
              <div class="mb-3">
                <label for="for_patient_name" class="form-label">{{form.appointment_for}} Name</label>
                <input type="text" class="form-control custom_input" v-model="form.for_patient_name" id="for_patient_name" name="for_patient_name" placeholder="Name">
                <input type="hidden" v-model="form.userId">
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="number" maxlength="3" class="form-control custom_input" v-model="form.age" id="age" name="age" placeholder="18">
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="vitals_form">
            <h4>Vitals</h4>
            <div class="mb-3">
              <label class="form-label">Pulse (per min)</label>
              <input type="number" maxlength="3" class="form-control custom_input" v-model="form.pulse" name="Pulse" placeholder="e.g 60–100">
            </div>
            <div class="mb-3">
              <label class="form-label">Temperature (oC)</label>
              <input type="number" maxlength="3" class="form-control custom_input" v-model="form.temperature" name="temperature" placeholder="e.g 97">
            </div>
            <div class="mb-3">
              <label class="form-label">Blood pressure</label>
              <input type="number" maxlength="3" class="form-control custom_input" v-model="form.bloodpressure" name="bloodpressure" placeholder="130/130">
            </div>
            <div class="mb-3">
              <label class="form-label">Heart rate (bpm)</label>
              <input type="number" maxlength="3" class="form-control custom_input" v-model="form.heartrate" name="heartrate" placeholder="e.g 98">
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 submit_btn text-end">
        <button type="submit" class="">Create Appointment</button>
      </div>
    </form>
  </div>

  <div class="modal" tabindex="-1" id="error_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Apologies Please Wait</h5>
          <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{this.error}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-cancel-yes"  data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { creatAppointment,getPatientDetails } from "@/api/appointment";
export default {
  name: "AppointmentForm",
  data() {
    return {
      form: {
        cnic : '',
        phone : '',
        patient_name : '',
        for_patient_name : '',
        appointment_for : 'SELF',
        pulse : '',
        temperature : '',
        bloodpressure : '',
        heartrate : '',
        userId : '',
      },
      search_by : 'cnic',
      error : 'Error occur',
    }
  },
  methods :{
    async creatAppointment() {
       await creatAppointment(this.form);
    },
    async searchPatient() {
      let details = null;
      if(this.search_by=='cnic' && this.form.cnic.length > 12){
        details = await getPatientDetails(this.form.cnic);
        console.log(details);
      }
      else if(this.search_by=='phone' && this.form.phone > 5){
        details = await getPatientDetails(this.form.phone);
        console.log(details);
      }

      if(details.data.name != null){
        this.form.cnic = details.data.cnic;
        this.form.patient_name = details.data.name;
        this.form.phone = details.data.phone;
        this.form.userId = details.data.patientId;
      }
    }
  }
}
</script>

<style scoped>
h4{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #181818;
}

.search_form,
.vitals_form{
  width: 350px;
}
.form-check-input{
  border: 2px solid rgba(0, 0, 0, 0.5);
}
.form-check-input:checked[type=radio]{
  background: none;
  border: 4px solid #784978;
}
form label{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #181818;
}
.custom_input{
  background-color: rgba(239, 241, 249, 0.6);
  border-radius: 8px;
  height: 52px;
}
.disable{
  pointer-events: none;
}
.disable label{
  color: #ABAFB1;
}
.submit_btn{
  padding: 20px 0px;
}
.submit_btn button{
  background: #784978;
  border-radius: 8px;
  width: 207px;
  height: 50px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #FFFFFF;
  border: none;
}
</style>