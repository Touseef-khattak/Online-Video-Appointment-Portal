<template>
  <div class="modal" tabindex="-1" id="error_modal" v-show="value">
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
          <button type="button" class="btn btn-cancel" data-bs-dismiss="modal" @click.prevent="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'errorModal',
  data() {
    return{
      value: false,
    }
  },
  methods: {
    close() {
      this.value = false;
    },
    show() {
      this.value = true;
    }
  }
};
</script>


<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
#error_modal .modal-footer{
  justify-content: center;
}

#error_modal .modal-title{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #202223;
}

#error_modal p{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

#error_modal .btn-cancel{
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
#error_modal .btn-cancel-yes{
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