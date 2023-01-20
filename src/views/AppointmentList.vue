<template>
  <div class="container">
      <div v-if="!this.appointments" class="loader">
        <svg height="0" width="0">
          <defs>
            <filter color-interpolation-filters="sRGB" height="200%" y="-50%" width="200%" x="-50%" id="goo">
              <feGaussianBlur result="blur" stdDeviation="8" in="SourceGraphic"></feGaussianBlur>
              <feColorMatrix result="cm" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" mode="matrix" in="blur"></feColorMatrix>
            </filter>
          </defs>
        </svg>

        <svg height="180" width="320" viewBox="0 0 320 180">
          <g filter="url(#goo)">
            <circle cy="90" cx="160" r="24" fill="#101841" class="circle"></circle>
            <circle cy="90" cx="160" r="24" fill="#101841" class="circle right"></circle>
          </g>
        </svg>
      </div>
      <div v-if="this.appointments != null" class="employes_list_container">
        <div class="list_header">
            <span>Appointments(144)</span>
          <a href="/add">+ Create New Appointment</a>
        </div>
        <ul class="nav nav-pills mb-5 pb-2" id="pills-tab" role="tablist">
            <button @click="appointmentStatus" class="nav-link ALL" :class="this.status == 'ALL'?'active':''">All</button>
            <button @click="appointmentStatus" class="nav-link UNSCHEDULED" :class="this.status == 'UNSCHEDULED'?'active':''">New</button>
            <button @click="appointmentStatus" class="nav-link COMPLETE" :class="this.status == 'COMPLETE'?'active':''">Completed</button>
            <button @click="appointmentStatus" class="nav-link CANCELLED" :class="this.status == 'CANCELLED'?'active':''">Cancelled</button>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active position-relative" id="appointments_table">
            <table class="table text-start">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Mobile number</th>
                  <th>Appointment for</th>
                  <th>Creation date & time</th>
                  <th>Status</th>
                  <th>Prescription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="!this.internal_loader">
              <tr v-for="item in this.appointments" :key="item.serAppointmentId">
                <td>{{item.patientName}}</td>
                <td>{{item.phonemobile}}</td>
                <td class="light">Myself</td>
                <td class="light">{{item.dteCreatedDate}}</td>
                <td>
                  <span :class="item.txtStatus == 'un-scheduled' ? 'status_new' : item.txtStatus == 'check-in' ? 'status_waiting': item.txtStatus == 'acquired' ? 'status_inprogress' : item.txtStatus == 'complete' ? 'status_completed' : item.txtStatus == 'cancel' ? 'status_cancel' : ''">{{item.txtStatus == 'un-scheduled' ? 'NEW' : item.txtStatus == 'check-in' ? 'PATIENT WAITING': item.txtStatus == 'acquired' ? 'IN PROGRESS' : item.txtStatus.toUpperCase()}}</span>
                </td>
                <td>
                  <button class="btn_print" :class="item.txtStatus != 'complete' ? 'd-none' : ''" @click="printReport(item.serAppointmentId)">
                    <img src="../assets/print.svg" alt="">
                  </button>
                  <p :class="item.txtStatus == 'complete' ? 'd-none' : ''">---</p>
                </td>
                <td>
                  <button @click="functionCall(this,item.serAppointmentId)" :class="item.txtStatus == 'un-scheduled' ? 'btn_start' : item.txtStatus == 'check-in' || item.txtStatus == 'acquired' ? 'btn_resume' :item.txtStatus == 'complete' || item.txtStatus == 'cancel' ? 'd-none' : ''">{{item.txtStatus == 'un-scheduled' ? 'Start' : item.txtStatus == 'check-in' || item.txtStatus == 'acquired' ? 'Resume' : ''}}</button>
                  <button class="btn_cancel" :class="item.txtStatus == 'complete' || item.txtStatus == 'cancel' ? 'd-none' : ''" @click="sendData(item.serAppointmentId)" data-bs-toggle="modal" data-bs-target="#appointment_cancel_modal">Cancel</button>
                </td>
              </tr>
              </tbody>
              <tfoot>
                <tr>
                  <pagination :total="total" v-model="page"></pagination>
<!--                  <td>-->
<!--                    <button class="btn_next">-->
<!--                      <img src="@/assets/arrow-left.svg" alt="Arrow" width="20">-->
<!--                      Previous-->
<!--                    </button>-->
<!--                  </td>-->
<!--                  <td colspan="5">-->
<!--                      <div class="pagination d-flex justify-content-center">-->
<!--                        1 2 3 4-->
<!--                      </div>-->
<!--                  </td>-->
<!--                  <td>-->
<!--                    <button class="btn_previous">-->
<!--                      Next-->
<!--                      <img src="@/assets/arrow-right.svg" alt="Arrow" width="20">-->
<!--                    </button>-->
<!--                  </td>-->
                </tr>
              </tfoot>
            </table>
          </div>
          <div v-if="this.internal_loader" class="internal_loader loader w-100 position-absolute">
            <svg height="0" width="0">
              <defs>
                <filter color-interpolation-filters="sRGB" height="200%" y="-50%" width="200%" x="-50%" id="goo">
                  <feGaussianBlur result="blur" stdDeviation="8" in="SourceGraphic"></feGaussianBlur>
                  <feColorMatrix result="cm" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" mode="matrix" in="blur"></feColorMatrix>
                </filter>
              </defs>
            </svg>

            <svg height="180" width="320" viewBox="0 0 320 180">
              <g filter="url(#goo)">
                <circle cy="90" cx="160" r="24" fill="#101841" class="circle"></circle>
                <circle cy="90" cx="160" r="24" fill="#101841" class="circle right"></circle>
              </g>
            </svg>
          </div>
        </div>

      </div>
  </div>

  <div class="modal" tabindex="-1" id="appointment_cancel_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cancel Appointment</h5>
          <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to cancel this appointment?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">No, Go Back</button>
          <button type="button" class="btn btn-cancel-yes" @click="cancelAppointment(this.active_appointment)">Yes, Cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="appointment_error_modal">
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
  <button class="d-none" id="error_modal" data-bs-toggle="modal" data-bs-target="#appointment_error_modal"></button>
</template>

<script>
import {cancelAppointment,updateAppointmentStatus,generateReport,getAllAppointmentPaginate} from "@/api/appointment";
import router from "@/router";
export default {
  name: "AppointmentList",
  data(){
      return {
        appointments : null,
        internal_loader : true,
        status : 'ALL',
        notifications : null,
        active_appointment : null,
        error : "",
        // For Pagination
        perPage: 10,
        page: 1,
        total: 0
      }
  },
  watch: {
    perPage: 'fetchData',
    page: 'fetchData'
  },
  methods :{
    async fetchAppointments() {
      this.internal_loader = true;
      this.appointments = await getAllAppointmentPaginate(this.status,this.perPage,this.page);
      this.internal_loader = false;
    },
    async printReport(appointmentId) {
      let reportData = await generateReport(appointmentId);
      if(!reportData.fileURL){
        this.error = reportData.status.message.details;
      }
      if(reportData.fileURL){
        window.open(reportData.fileURL , '_blank');
      }
    },
    async functionCall(me,appointmentId){
      if(event.target.classList.contains('btn_start') || event.target.classList.contains('btn_resume')){
        let appointment_status = await updateAppointmentStatus(appointmentId);
        if(appointment_status.status.message.code == 'SUCCESS') {
          router.push({name: 'appointment', params: {id: appointmentId}});
        }else{
          this.error = appointment_status.status.message.details;
          document.getElementById('error_modal').click();
        }
      }
    },
    async cancelAppointment(appointmentId){
      let appointment_status = await cancelAppointment(appointmentId);
      if(appointment_status.status.message.code == 'SUCCESS'){
        document.getElementById('btn-close').click();
        this.fetchAppointments()
      }
      else{
        console.log(appointment_status);
      }
    },
    sendData(item) {
      this.active_appointment = item;
    },
    appointmentStatus(){
      if(event.target.classList.contains('ALL')){
        this.status = 'ALL';
      }
      else if(event.target.classList.contains('COMPLETE')){
        this.status = "COMPLETE"
      }
      else if(event.target.classList.contains('UNSCHEDULED')){
        this.status = "UNSCHEDULED"
      }
      else if(event.target.classList.contains('CANCELLED')){
        this.status = "CANCELLED"
      }
      this.fetchAppointments();
    }
  },
  mounted() {
    this.fetchAppointments()
  }
}
</script>

<style scoped>
.internal_loader{
  top: 30%;
  left: 0;
}
.loader{
  margin-top: 150px;
}
.circle {
  animation: move571 4s linear infinite;
}

.circle.right {
  animation-direction: reverse;
}

@keyframes move571 {
  25% {
    transform: translateX(-32px);
  }

  75% {
    transform: translateX(32px);
  }
}
  .list_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 100px;
  }
  .list_header a{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 236px;
    height: 48px;
    border-radius: 8px;
    color: #FFF;
    background: #784978;
  }
  button.nav-link{
    padding: 10px 16px;
    border-right: 1px solid #C9CCCF;
    font-family: 'SF Pro Display';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #202223;
  }
  button.nav-link.active{
    background: #E9E2F3;
    color: #202223;
  }

  table > thead tr th{
    padding-left: 20px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
  }
  table > thead tr{
    background: #F9FAFB;
    border: 1px solid #EAECF0;
    height: 44px;
  }
  table > tbody tr{
    border: 1px solid #EAECF0;
  }
  table > tbody tr td{
    padding: 20px 0px 20px 20px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #101828;
  }
  table > tbody tr{
    min-height: 70px;
  }
  table > tbody tr td.light{
    color: #667085;
  }
  .status_inprogress,
  .status_new,
  .status_waiting,
  .status_completed,
  .status_canceled{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    border-radius: 16px;
  }
  .status_inprogress{
    position: relative;
    background: #FFF6ED;
    color: #C4320A;
    padding: 5px 12px 5px 20px;
  }
  .status_completed{
    position: relative;
    background: #ECFDF3;
    color: #027A48;
    padding: 5px 12px;
  }
  .status_canceled{
    position: relative;
    background: #FEF3F2;
    color: #B42318;
    padding: 5px 12px;
  }
  .status_new{
    position: relative;
    background: #EFF8FF;
    color: #175CD3;
    padding: 5px 12px;
  }
  .status_waiting{
    position: relative;
    background: #F8F9FC;
    color: #363F72;
    padding: 5px 12px;
  }
  .status_inprogress:before{
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left: 5px;
    top: 10px;
    background: #FB6514;
    border-radius: 50%;
  }

  .print_icon{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #4264DF;
  }
  .btn_resume,
  .btn_start,
  .btn_cancel,
  .btn_next,
  .btn_previous{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    border-radius: 8px;
  }
  .btn_resume{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 83px;
    height: 36px;
    border: 1px solid #C4320A;
    color: #C4320A;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    background: #FFF;
  }
  .btn_start{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 62px;
    height: 36px;
    background: rgba(255, 102, 0, 0.7);
    border: 1px solid rgba(255, 102, 0, 0.7);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    color: #FFF;
  }

  .btn_cancel{
    color: #F54E46;
    border: none;
    background: transparent;
  }

  .btn_next,
  .btn_previous{
    color: #344054;
    border: 1px solid #D0D5DD;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    background: transparent;
    padding: 3px 10px;
  }
  .btn_print{
    background: transparent;
    border: none;
  }

  #appointment_error_modal .modal-footer,
  #appointment_cancel_modal .modal-footer{
    justify-content: center;
  }

  #appointment_error_modal .modal-title,
  #appointment_cancel_modal .modal-title{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #202223;
  }

  #appointment_error_modal p,
  #appointment_cancel_modal p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }

  #appointment_error_modal .btn-cancel,
  #appointment_cancel_modal .btn-cancel{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #6D7175;
    width: 120px;
    height: 40px;
    border: 1px solid #BABEC3;
    border-radius: 4px;

  }
  #appointment_error_modal .btn-cancel-yes,
  #appointment_cancel_modal .btn-cancel-yes{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #FFF;
    width: 120px;
    height: 40px;
    background: #F54E46;
    border-radius: 4px;
  }

</style>