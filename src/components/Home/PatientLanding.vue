<template>
    <div>
      <div class="heading d-flex align-center" style="gap: 12px;">
        <h2 class="font-weight-normal text-black">
          {{ $vuetify.locale.t("$vuetify.good_morning") }}
          <span
            class="font-weight-bold"
          >{{ AuthedUser.name }}</span>
        </h2>
        <img src="@/assets/img/Suffix.png" width="25" alt />
      </div>
      <v-row class="mt-2">
        <v-col cols="12" lg="8">
            <patient-sammary></patient-sammary>
        </v-col>
        <v-col cols="12" lg="4">
            <medical-records></medical-records>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <!-- genitic reservation -->
        <v-col cols="12" lg="4">
          <Reservation
            title="my_genetic_reservations"
            :rating="ratingConsult.data"
            :total="ratingConsult.total_count"
            status="reservation"
          />
        </v-col>

        <!-- genetic Examination -->
        <v-col cols="12" lg="4">
          <Reservation
            title="my_genetic_examination"
            :rating="ratingCheck.data"
            :total="ratingCheck.total_count"
            status="check"
          />
        </v-col>

        <!-- calender -->
        <v-col cols="12" lg="4">
          <div class="calenderDiv">
            <FullCalendar ref="fullCalendarApi" :options="calendarOptions" />
          </div>
        </v-col>

        <!-- my reservation coming-->
        <v-col cols="12" lg="7">
          <reservation-card-home
            userType="patient"
            title="coming_reservation"
            status="coming"
            :dataInfo="coming"
            :count="countComing"
          />
        </v-col>

        <!-- my reservation today -->
        <v-col cols="12" lg="5">
          <reservation-card-home
            userType="patient"
            title="today_reservation"
            status="today"
            :dataInfo="today"
            :count="countDay"
          />
        </v-col>

        <!-- my-Examination -->
        <v-col cols="12" lg="7">
          <reservation-card-home
            userType="patient"
            title="wait_reservation"
            status="wating_confirmations"
            :dataInfo="waiting"
            :count="countWaiting"
          />
        </v-col>
        <!-- tips of the day -->
        <v-col cols="12" lg="5">
          <reservation-card-home userType="patient" title="tips_of_day" status="tips" />
        </v-col>
      </v-row>
    </div>

</template>

<script>
import Reservation from "@/components/Home/Reservation.vue";
import ReservationCardHome from "@/components/Home/ReservationCardHome.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters } from "vuex";

import PatientSammary from  "@/components/Reservation/PatientSammary.vue";
import MedicalRecords from  "@/components/Home/MedicalRecords.vue";


export default {
  components: { Reservation, FullCalendar, ReservationCardHome, PatientSammary, MedicalRecords },
  data() {
    return {
      plugins: [dayGridPlugin, interactionPlugin],
      today: [],
      coming: [],
      countDay: 0,
      countComing: 0,
      waiting: [],
      countWaiting: 0,
      ratingConsult: "",
      ratingCheck: "",
    };
  },
  mounted() {
    this.todayReservation();
    this.comingReservation();
    this.consultStatistics();
    this.checkStatistics();
    this.WaitingResult();
    this.$store.commit("SET_LOADING", { name: "ui", value: false });
  },
  computed: {
    ...mapGetters(["AuthedUser"]),
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        initialDate: this.bookingDate,
        dateClick: this.handleDateClick,
        height: 320,
        headerToolbar: {
          right: "title",
          left: "prev,next"
        },
        firstDay: 6,
        locale: this.$store.state.lang,
        direction: this.$store.state.lang == "ar" ? "rtl" : "ltr"
      };
    }
  },
  methods: {
    todayReservation() {
      this.$http.get("/patient/dashboard/booking?filter=today").then(res => {
        this.today = res.data.data.booking;
        console.log(this.today)
        this.countDay = res.data.data.count;
      });
    },
    comingReservation() {
      this.$http.get("/patient/dashboard/booking?filter=coming").then(res => {
        this.coming = res.data.data.booking;

        this.countComing = res.data.data.count;
      });
    },
    consultStatistics() {
      this.$http.get("/patient/dashboard/consult-statistics").then(res => {
        this.ratingConsult = res.data.data;
      });
    },
    WaitingResult() {
      this.$http
        .get("/patient/dashboard/check?filter=wating_result")
        .then(res => {
          this.waiting = res.data.data.booking;
          this.countWaiting = res.data.data.count;
        });
    },
    checkStatistics() {
      this.$http.get("/patient/dashboard/check-statistics").then(res => {
        this.ratingCheck = res.data.data;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
  .heading {
    h2 {
      font-size: 24px;
      font-weight: 400;
      span {
        color: #e570b0 !important;
      }
    }
  }
  .border {
    border-radius: 15px;
  }
  .calenderDiv{
    border-radius: 0.88889rem;
    background: var(--white, #FFF);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.20);
    padding: 1.19rem 0.56rem;

  }

</style>
