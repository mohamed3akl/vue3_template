<template>
  <div class="home">

      <div class="heading d-flex align-center mt-3 mb-8" style="gap: 12px;">
        <h2 class="font-weight-normal text-black">
          {{ $vuetify.locale.t("$vuetify.good_morning") }}
          <span
            class="font-weight-bold"
          >{{ AuthedUser.name }}</span>
        </h2>
        <img src="@/assets/img/Suffix.png" width="25" alt />
      </div>
      <v-row>
        <v-col cols="12" lg="4">
          <div class="card card_one py-14 px-0 d-flex justify-space-around align-center">
            <div class="text-center">
              <span class="font-weight-bold">{{ counts.total_count_booking }}</span>
              <p class="mt-4">{{ $vuetify.locale.t("$vuetify.total_genetic_reservation") }}</p>
            </div>
            <div class="icon">
              <img src="@/assets/img/Calendar.png" alt />
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="4">
          <div class="card card_two py-14 px-0 d-flex justify-space-around align-center">
            <div class="text-center">
              <span class="font-weight-bold">{{ counts.total_count_patient }}</span>
              <p class="mt-4">{{ $vuetify.locale.t("$vuetify.total_patient") }}</p>
            </div>
            <div class="icon">
              <img src="@/assets/img/User.png" alt />
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="4">
          <div class="card card_three py-14 px-0 d-flex justify-space-around align-center">
            <div class="text-center">
              <span class="font-weight-bold">{{ counts.booking_count_today }}</span>
              <p class="mt-4">{{ $vuetify.locale.t("$vuetify.total_reservation_today") }}</p>
            </div>
            <div class="icon">
              <img src="@/assets/img/Calendar.png" alt />
            </div>
          </div>
        </v-col>

        <!-- genetic_reservations -->
        <v-col cols="12" lg="8">
          <reservation
            title="genetic_reservations"
            status="reservation"
            :rating="ratingConsult.data"
            :total="ratingConsult.total_count"
          />
        </v-col>

        <!-- calender -->
        <v-col cols="12" lg="4">
          <div class="calenderDiv">
            <FullCalendar ref="fullCalendarApi" :options="calendarOptions" />
          </div>
        </v-col>

        <!-- waiting_reservation -->
        <v-col cols="12" lg="7">
          <reservation-card-home
            userType="doctor"
            title="waiting_reservation"
            status="wating_confirmations"
            :dataInfo="waiting"
            :count="countWaiting"
          />
        </v-col>

        <!-- today -->
        <v-col cols="12" lg="5" class="px-0">
          <reservation-card-home
            userType="doctor"
            title="today_reservation"
            status="today"
            :dataInfo="today"
            :count="countToday"
          />
        </v-col>

        <!-- coming_reservation -->
        <v-col cols="12" lg="7">
          <reservation-card-home
            userType="doctor"
            title="coming_reservation"
            status="coming"
            :dataInfo="coming"
            :count="countComing"
            u
          />
        </v-col>

        <!-- coming_reservation -->
        <v-col cols="12" lg="5">
          <RatingDoctor :ratingDoctor="ratingDoctor" />
        </v-col>
      </v-row>
  
  </div>
</template>

<script>
import Reservation from "@/components/Home/Reservation.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReservationCardHome from "@/components/Home/ReservationCardHome.vue";
import RatingDoctor from "@/components/Home/RatingDoctor.vue";
import { mapGetters } from "vuex";
export default {
  components: { Reservation, FullCalendar, ReservationCardHome, RatingDoctor },
  
  data() {
    return {
      ratingConsult: "",
      ratingDoctor: "",
      counts: "",
      waiting: "",
      countWaiting: 0,
      today: "",
      countToday: 0,
      coming: "",
      countComing: 0
    };
  },
  mounted() {
    this.consultStatistics();
    this.rating();
    this.countStatics();
    this.todayReservation();
    this.comingReservation();
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
        height: 450,
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
      this.$http.get("/doctor/dashboard/booking?filter=today").then(res => {
        this.today = res.data.data.booking;
        this.countToday = res.data.data.count;
      });
    },
    comingReservation() {
      this.$http.get("/doctor/dashboard/booking?filter=coming").then(res => {
        this.coming = res.data.data.booking;
        this.countComing = res.data.data.count;
      });
    },
    WaitingResult() {
      this.$http
        .get("/doctor/dashboard/booking?filter=new")
        .then(res => {
          this.waiting = res.data.data.booking;
          this.countWaiting = res.data.data.count;
        });
    },
    consultStatistics() {
      this.$http.get("/doctor/dashboard/consult-statistics").then(res => {
        this.ratingConsult = res.data.data;
      });
    },
    rating() {
      this.$http.get("/doctor/dashboard/rating").then(res => {
        this.ratingDoctor = res.data.data;
      });
    },
    countStatics() {
      this.$http("/doctor/dashboard/count-statistics").then(res => {
        this.counts = res.data.data;
        console.log(this.counts);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
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
  .card {
    border-radius: 12px;
    border: 1px solid var(--light-stroke, #dfdfe0);
    color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05);
    height: 96px;
    span {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    .icon {
      background: #eeeeeea3;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .card_one {
    background: rgba(140, 197, 65, 0.9);
  }
  .card_two {
    background: rgba(255, 184, 76, 0.9);
  }
  .card_three {
    background: rgba(229, 112, 176, 0.9);
  }
}
@media (max-width: 991px) {
  .home {
    .v-col {
      padding: 0 !important;
    }
  }
}
</style>
