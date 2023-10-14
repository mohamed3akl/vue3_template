<template>
  <div class="reservation">
    
    <v-card class="border" elevation="0">
      <v-card-title class="d-flex consult-two align-center">
        <h5 class="text-black font-weight-bold">{{ $vuetify.locale.t(`$vuetify.${title}`) }}</h5>
        <span class="mr-3">({{ total }})</span>
      </v-card-title>
      <v-card-text>

        <!-- reservation -->
        <ul v-if="rating && status == 'reservation'">
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.wating_doctor_confirmations`)}}</h6>
                <span class="mr-1">({{ rating.coming.count }})</span>
              </div>
              <span>{{rating.coming.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#F1C639" :model-value="rating.coming.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.coming`)}}</h6>
                <span class="mr-1">({{ rating.coming.count }})</span>
              </div>
              <span>{{rating.coming.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#8CC541" :model-value="rating.coming.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.canceled`)}}</h6>
                <span class="mr-1">({{ rating.canceld.count }})</span>
              </div>
              <span>{{rating.canceld.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#6D6E70" :model-value="rating.canceld.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.finished`)}}</h6>
                <span class="mr-1">({{ rating.finshed.count }})</span>
              </div>
              <span>{{rating.finshed.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#2CD3E1" :model-value="rating.finshed.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.rejected`)}}</h6>
                <span class="mr-1">({{ rating.rejected.count }})</span>
              </div>
              <span>{{rating.rejected.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#E42021" :model-value="rating.rejected.ratio" ></v-progress-linear>
          </li>
        </ul>

        <!-- check -->
        <ul v-if="rating && status == 'check'" >
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.questionnaire_filled_out`)}}</h6>
                <span class="mr-1">({{ rating.new.count }})</span>
              </div>
              <span>{{rating.new.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#E570B0" :model-value="rating.new.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.waiting_receive_sample`)}}</h6>
                <span class="mr-1">({{ rating.canceld.count }})</span>
              </div>
              <span>{{rating.canceld.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#F1C639" :model-value="rating.canceld.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.waiting_analysis_sample`)}}</h6>
                <span class="mr-1">({{ rating.result_appeard.count }})</span>
              </div>
              <span>{{rating.result_appeard.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#8CC541" :model-value="rating.result_appeard.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.result_appeared`)}}</h6>
                <span class="mr-1">({{ rating.wating_analysis.count }})</span>
              </div>
              <span>{{rating.wating_analysis.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#2CD3E1" :model-value="rating.wating_analysis.ratio" ></v-progress-linear>
          </li>
          <li>
            <div class="d-flex justify-space-between my-3">
              <div class="icon d-flex">
                <h6>{{$vuetify.locale.t(`$vuetify.canceled`)}}</h6>
                <span class="mr-1">({{ rating.wating_receive.count }})</span>
              </div>
              <span>{{rating.wating_receive.ratio }}%</span>
            </div>
            <v-progress-linear height="11" rounded="lg" color="#6D6E70" :model-value="rating.wating_receive.ratio" ></v-progress-linear>
          </li>
        </ul>
      </v-card-text>
    </v-card>
       
  </div>
</template>



<script>
export default {
  props: ["title","rating","total","ratingName","status"]
};
</script>

<style lang="scss" scoped>
.reservation {
  .v-card-title {
    h5 {
      font-size: 16px;
    }
    span {
      color: #9a9ea6;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .v-card-text {
    span,
    h6 {
      color: #9a9ea6 !important;
      font-size: 12px;
    }
  }
  .consult-two {
    border-radius: 12px 12px 0 0 !important;
    border: 1px solid var(--light-stroke, #dfdfe0);
    background: #fca7c870 !important;
  }
  .border {
    border-radius: 15px !important;
  }
  .v-progress-linear__background {
    background: #32323a !important;
    border-radius: 15px !important;
  }
  .v-progress-linear__determinate {
    border-radius: 15px !important;
  }
}
</style>
