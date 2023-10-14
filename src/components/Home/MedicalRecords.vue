<template>
  <div class="patientStatistics">
    <div class="header">
      <h3>{{$vuetify.locale.t('$vuetify.medical_record_updates')}}
      </h3>
    </div>
    <v-row>
      <v-col class="medical_record">
          <div class="record">
            <img src="@/assets/img/icons/svg/patient/entrance_line.svg" class="me-3">
            <div>
              <p>{{$vuetify.locale.t('$vuetify.time')}}: 06:33</p>
              <p>{{$vuetify.locale.t('$vuetify.date')}}: 15/04/2023</p>
              <p>{{$vuetify.locale.t('$vuetify.record')}}: نتائج المختبر</p>
            </div>
          </div>
          <div class="record">
            <img src="@/assets/img/icons/svg/patient/entrance_line.svg" class="me-3">
            <div>
              <p>{{$vuetify.locale.t('$vuetify.time')}}: 06:33</p>
              <p>{{$vuetify.locale.t('$vuetify.date')}}: 15/04/2023</p>
              <p>{{$vuetify.locale.t('$vuetify.record')}}: نتائج المختبر</p>
            </div>
          </div>
          <div class="record">
            <img src="@/assets/img/icons/svg/patient/entrance_line.svg" class="me-3">
            <div>
              <p>{{$vuetify.locale.t('$vuetify.time')}}: 06:33</p>
              <p>{{$vuetify.locale.t('$vuetify.date')}}: 15/04/2023</p>
              <p>{{$vuetify.locale.t('$vuetify.record')}}: نتائج المختبر</p>
            </div>
          </div>
          <div class="record">
            <img src="@/assets/img/icons/svg/patient/entrance_line.svg" class="me-3">
            <div>
              <p>{{$vuetify.locale.t('$vuetify.time')}}: 06:33</p>
              <p>{{$vuetify.locale.t('$vuetify.date')}}: 15/04/2023</p>
              <p>{{$vuetify.locale.t('$vuetify.record')}}: نتائج المختبر</p>
            </div>
          </div>
          <div class="record">
            <img src="@/assets/img/icons/svg/patient/entrance_line.svg" class="me-3">
            <div>
              <p>{{$vuetify.locale.t('$vuetify.time')}}: 06:33</p>
              <p>{{$vuetify.locale.t('$vuetify.date')}}: 15/04/2023</p>
              <p>{{$vuetify.locale.t('$vuetify.record')}}: نتائج المختبر</p>
            </div>
          </div>
      </v-col>
    </v-row>
  </div>
    
</template>
<script>
export default {
  name: "PatientSammary",
  data() {
    return {
      
    };
  },
  props: ["patientid"],
  mounted() {
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
  .patientStatistics{
    border-radius: 0.83333rem;
    border: 2px solid #F6F3F4;
    background: #FFFBFC;
    // padding: 2.39rem;
    margin-bottom: 1.22rem;
    .header{
      border-radius: 0.83333rem 0.83333rem 0rem 0rem;
      border: 0px solid var(--Light-stroke, #DFDFE0);
      background: #FEEAF2;
      padding: 1rem 1.6rem;
      h3{
        display: flex;
        justify-content: space-between;
        color: var(--Black, #000);
        font-size: 0.88889rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        a{
          color: var(--Black, #000);
        }
      }
    }
    .body{
      padding: 2.39rem;
    }
    .item{
      display: flex;
      flex-direction: column;
      border-radius: 1.11111rem;
      border: 2px solid #F6F3F4;
      background: #FFFBFC;
      padding:1.17rem;
      margin: 0;
      align-items: center;
      text-align: center;
      height: 135px;
      justify-content: center;
      

    }
    .record{
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #efefef;
      &:last-child{
        border-bottom:0;
      }
      p{
        color: #737272;
        font-size: 0.8rem;
        font-style: normal;
        font-weight: 300;
      }
    }
  }
</style>
