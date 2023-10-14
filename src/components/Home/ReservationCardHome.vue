<template>
  <div class="reservation-card">
    <v-card class elevation="0">
      <v-card-title class="d-flex justify-space-between align-center mb-5 py-3">
        <h5 class="text-black">
          {{ $vuetify.locale.t("$vuetify." + title) }}
          <span class="mr-2">({{ count ? count : "0" }})</span>
        </h5>
        <router-link
          :to="{ name: 'MyGenaticReservations', query: { tab: status } }"
        >
          <span>{{ $vuetify.locale.t("$vuetify.show_all") }}</span>
        </router-link>
      </v-card-title>
      <v-card-text>
        <!-- patient  -->
        <v-row
          v-if="userType == 'patient'"
          :style="{ 'margin-bottom': dataInfo ? '-20px' : '' }"
        >
          <v-col
            cols="12"
            v-if="
              status == 'coming' ||
              status == 'wating_confirmations' ||
              (status == 'today' && dataInfo.length >= 1)
            "
            v-for="(n, i) in dataInfo"
            :key="i"
            class="consult-two pa-4 mb-5"
          >
            <!-- coming or today -->
            <a
              @click="
                $router.push({
                  name: 'MyReservationDetails',
                  params: { id: n.id },
                })
              "
            >
              <ul v-if="status == 'coming' || status == 'today'">
                <li class="d-flex my-3 justify-space-between align-center">
                  <h6 class="text-black font-wight-bold">
                    {{ $vuetify.locale.t("$vuetify.reservation") }}
                    <span class="mr-5">{{ n.id }}</span>
                  </h6>
                  <span class="coming py-2 px-5" v-if="status == 'coming'">{{
                    $vuetify.locale.t("$vuetify.coming")
                  }}</span>
                  <ReservationCardTimer
                    v-if="status == 'today'"
                    class="py-2 px-5"
                    :reservation="n"
                  />
                </li>
                <li class="d-flex my-3 align-center">
                  <h6>{{ $vuetify.locale.t("$vuetify.service") }}</h6>
                  <span class="mr-4">{{ n.service }}</span>
                </li>
                <li class="d-flex my-3 align-center" style="gap: 12px">
                  <h6>
                    {{ $vuetify.locale.t("$vuetify.consultant_physician") }}
                  </h6>
                  <img
                    :src="
                      n.doctor.picture
                        ? n.doctor.picture
                        : '@/assets/img/Ellipse2.png'
                    "
                    alt
                    width="20"
                    height="20"
                    style="border-radius: 50%"
                  />
                  <span>{{ n.doctor.name }}</span>
                </li>
              </ul>
            </a>
            <ul>
              <li class="d-flex my-3 justify-space-between align-center">
                <div class="icon d-flex align-center" style="gap: 65px">
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-clock-outline</v-icon
                    >
                    <span>{{ n.booking_date }}</span>
                  </div>
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-calendar-month-outline</v-icon
                    >
                    <span>{{ n.booking_time }}</span>
                  </div>
                </div>
                <div>
                  <img
                    src="@/assets/img/icons/svg/times.svg"
                    v-if="status == 'coming'"
                    alt
                    @click="cancel(n.id)"
                  />
                  <img
                    src="@/assets/img/icons/svg/edit.svg"
                    v-if="status == 'coming'"
                    class="mr-3"
                    alt
                    @click="edit(n.id, n.booking_date)"
                  />
                </div>
              </li>
            </ul>

            <!-- waiting -->
            <a
              @click="
                $router.push({
                  name: 'MyReservationDetails',
                  params: { id: n.id },
                })
              "
            >
              <ul
                class="consult-two pa-4"
                v-if="status == 'wating_confirmations'"
              >
                <li class="d-flex my-3 justify-space-between align-center">
                  <h6 class="text-black font-wight-bold">
                    {{ $vuetify.locale.t("$vuetify.examination") }}
                    <span class="mr-5">{{ n.id }}</span>
                  </h6>
                  <span class="coming py-2 px-5">{{
                    $vuetify.locale.t("$vuetify.waiting_analysis_sample")
                  }}</span>
                </li>
                <li class="d-flex my-3 align-center">
                  <h6>{{ $vuetify.locale.t("$vuetify.type") }}</h6>
                  <span class="mr-4">{{ n.services }}</span>
                </li>
                <li class="d-flex my-3 align-center" style="gap: 12px">
                  <h6>
                    {{ $vuetify.locale.t("$vuetify.examination_duration") }}
                  </h6>
                  <span>{{ n.services }}</span>
                </li>
              </ul>
            </a>
            <ul v-if="status == 'wating_confirmations'">
              <li class="d-flex my-3 justify-space-between align-center">
                <div class="icon d-flex align-center" style="gap: 65px">
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-clock-outline</v-icon
                    >
                    <span>{{ n.booking_date }}</span>
                  </div>
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-calendar-month-outline</v-icon
                    >
                    <span>{{ n.booking_time }}</span>
                  </div>
                </div>
                <div>
                  <img
                    src="@/assets/img/icons/svg/times.svg"
                    alt
                    @click="cancel(n.id)"
                  />
                </div>
              </li>
            </ul>
          </v-col>

          <!-- tips -->
          <v-col cols="12" v-if="status == 'tips'">
            <ul v-if="status == 'tips'">
              <li
                v-for="n in 3"
                :key="n"
                class="consult-two pa-4 mb-5 d-flex"
                style="gap: 12px"
              >
                <img
                  src="@/assets/img/Rectangle2.png"
                  alt
                  width="82"
                  height="76"
                  style="border-radius: 10px"
                />
                <div class="info">
                  <h3 class="text-black mb-4">
                    {{ $vuetify.locale.t("$vuetify.tips") }}
                  </h3>
                  <p>{{ $vuetify.locale.t("$vuetify.loream") }}</p>
                </div>
              </li>
            </ul>
          </v-col>

          <!-- if no exist data -->
          <v-col class="text-center" v-if="dataInfo">
            <div v-if="dataInfo.length <= 0">
              <img src="@/assets/img/available_time.png" width="120" alt />
              <p class="font-weight-bold" style="color: darkgrey">
                {{
                  $vuetify.locale.t("$vuetify.not_found") +
                  " " +
                  $vuetify.locale.t("$vuetify." + title)
                }}
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- doctor -->
        <v-row v-if="userType == 'doctor'">
          <v-col
            cols="12"
            v-if="
              status == 'coming' ||
              status == 'wating_confirmations' ||
              (status == 'today' && dataInfo.length >= 1)
            "
            v-for="(n, i) in dataInfo"
            :key="i"
            class="consult-two pa-4 mb-5"
          >
            <!-- coming or today -->
            <a
              @click="
                $router.push({
                  name: 'MyReservationDetails',
                  params: { id: n.id },
                })
              "
            >
              <ul v-if="status == 'coming' || status == 'today'">
                <li class="d-flex my-3 justify-space-between align-center">
                  <h6 class="text-black font-wight-bold">
                    {{ $vuetify.locale.t("$vuetify.reservation") }}
                    <span class="mr-5">{{ n.id }}</span>
                  </h6>
                  <span class="coming py-2 px-5" v-if="status == 'coming'">{{
                    $vuetify.locale.t("$vuetify.coming")
                  }}</span>
                  <ReservationCardTimer
                    v-if="status == 'today'"
                    class="py-2 px-5"
                    :reservation="n"
                  />
                </li>
                <li class="d-flex my-3 align-center">
                  <h6>{{ $vuetify.locale.t("$vuetify.service") }}</h6>
                  <span class="mr-4">{{ n.service }}</span>
                </li>
                <li class="d-flex my-3 align-center" style="gap: 12px">
                  <h6>{{ $vuetify.locale.t("$vuetify.patient") }}</h6>
                  <img
                    :src="
                      n.patient.picture
                        ? n.patient.picture
                        : '@/assets/img/Ellipse2.png'
                    "
                    alt
                    width="25"
                    height="20"
                    style="border-radius: 50%"
                  />
                  <span>{{ n.patient.name }}</span>
                </li>
              </ul>
            </a>

            <ul>
              <li class="d-flex my-3 justify-space-between align-center">
                <div class="icon d-flex align-center" style="gap: 65px">
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-clock-outline</v-icon
                    >
                    <span>{{ n.booking_date }}</span>
                  </div>
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-calendar-month-outline</v-icon
                    >
                    <span>{{ n.booking_time }}</span>
                  </div>
                </div>
                <div>
                  <img
                    src="@/assets/img/icons/svg/times.svg"
                    v-if="status == 'coming'"
                    alt
                    @click="reject(n.id)"
                  />
                </div>
              </li>
            </ul>

            <!-- waiting -->
            <a
              @click="
                $router.push({
                  name: 'MyReservationDetails',
                  params: { id: n.id },
                })
              "
            >
              <ul v-if="status == 'wating_confirmations'">
                <li class="d-flex my-3 justify-space-between align-center">
                  <h6 class="text-black font-wight-bold">
                    {{ $vuetify.locale.t("$vuetify.reservation") }}
                    <span class="mr-5">{{ n.id }}</span>
                  </h6>
                  <span class="coming py-2 px-5" style="background: #f1c639">{{
                    $vuetify.locale.t("$vuetify.wating_confirmations")
                  }}</span>
                </li>
                <li class="d-flex my-3 align-center">
                  <h6>{{ $vuetify.locale.t("$vuetify.service") }}</h6>
                  <span class="mr-4">{{ n.service }}</span>
                </li>
                <li class="d-flex my-3 align-center mb-4" style="gap: 12px">
                  <h6>{{ $vuetify.locale.t("$vuetify.patient") }}</h6>
                  <img src="@/assets/img/Ellipse2.png" alt width="25" />
                  <span>{{ n.patient.name }}</span>
                </li>
              </ul>
            </a>
            <ul v-if="status == 'wating_confirmations'">
              <li class="d-flex my-3 justify-space-between align-center">
                <div class="icon d-flex align-center" style="gap: 65px">
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-clock-outline</v-icon
                    >
                    <span>{{ n.booking_date }}</span>
                  </div>
                  <div>
                    <v-icon color="#A6A8AB" class="ml-3"
                      >mdi-calendar-month-outline</v-icon
                    >
                    <span>{{ n.booking_time }}</span>
                  </div>
                </div>
                <div>
                  <img
                    src="@/assets/img/icons/svg/times.svg"
                    alt
                    @click="cancel(n.id)"
                  />
                  <img
                    src="@/assets/img/accept.png"
                    class="mr-3"
                    alt
                    @click="accept(n.id)"
                  />
                </div>
              </li>
            </ul>
          </v-col>
          <!-- if no exist data -->
          <v-col class="text-center" v-if="dataInfo">
            <div v-if="dataInfo.length <= 0">
              <img src="@/assets/img/available_time.png" width="120" alt />
              <p class="font-weight-bold" style="color: darkgrey">
                {{
                  $vuetify.locale.t("$vuetify.not_found") +
                  $vuetify.locale.t("$vuetify." + title)
                }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Start cancel dialog -->
    <v-dialog v-model="cancelReservationsDialog" persistent width="50%">
      <v-card>
        <cancel-reservation
          :bookingId="reservationId"
          @close="cancelReservationsDialog = false"
          @change-date="
            cancelReservationsDialog = false;
            successCancelReservationsDialog = true;
          "
        ></cancel-reservation>
      </v-card>
    </v-dialog>
    <!-- End cancel dialog -->

    <!-- Start edit dialog -->
    <v-dialog v-model="editReservationsDialog" persistent width="50%">
      <v-card>
        <edit-reservation-calendar
          :bookingDate="reservationDate"
          :bookingId="reservationId"
          @close="editReservationsDialog = false"
          @change-date="
            editReservationsDialog = false;
            successEditReservationsDialog = true;
          "
        ></edit-reservation-calendar>
      </v-card>
    </v-dialog>
    <!-- End edit dialog -->

    <!-- Start Accept dialog -->

    <v-dialog
      v-model="acceptReservationsDialog"
      width="50%"
      class="eventFromDialog"
    >
      <v-card>
        <accept-reservation
          :reservationId="reservationId"
          @cancel="acceptReservationsDialog = false"
          @Accept-success="acceptReservationsDialog = false"
        ></accept-reservation>
      </v-card>
    </v-dialog>
    <!-- End accept dialog -->

    <!-- Start reject dialog -->

    <v-dialog
      v-model="rejectReservationsDialog"
      width="50%"
      class="eventFromDialog"
    >
      <v-card>
        <reject-reservation
          :reservationId="reservationId"
          @cancel="rejectReservationsDialog = false"
          @Reject-success="rejectReservationsDialog = false"
        ></reject-reservation>
      </v-card>
    </v-dialog>
    <!-- End reject dialog -->
    <!-- </v-container> -->
  </div>
</template>

<script>
import EditReservationCalendar from "@/components/Reservation/EditReservationCalendar.vue";
import CancelReservation from "@/components/Reservation/CancelReservation.vue";
import ReservationCardTimer from "@/components/Reservation/ReservationCardTimer.vue";
import AcceptReservation from "@/components/Reservation/AcceptReservation.vue";
import RejectReservation from "../Reservation/RejectReservation.vue";
export default {
  components: {
    ReservationCardTimer,
    CancelReservation,
    EditReservationCalendar,
    AcceptReservation,
    RejectReservation,
  },
  props: ["title", "status", "userType", "dataInfo", "count"],
  data() {
    return {
      cancelReservationsDialog: false,
      editReservationsDialog: false,
      acceptReservationsDialog: false,
      reservationId: "",
      reservationDate: "",
      rejectReservation: false,
      rejectReservationsDialog: false,
      // dataInfo:[]
    };
  },
  methods: {
    cancel(id) {
      this.cancelReservationsDialog = true;
      this.reservationId = id;
    },
    reject(id) {
      console.log(id);
      this.rejectReservationsDialog = true;
      this.reservationId = id;
    },
    edit(id, date) {
      this.editReservationsDialog = true;
      this.reservationId = id;
      this.reservationDate = date;
    },
    accept(id) {
      this.acceptReservationsDialog = true;
      this.reservationId = id;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.reservation-card {
  a {
    cursor: pointer;
  }
  .v-card {
    border: 1px solid var(--light-stroke, #dfdfe0);
    border-radius: 0.83333rem;
    .v-card-title {
      background: #fca7c870 !important;
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
      h6 {
        font-size: 16px;
        color: #444545;
        font-weight: 400;
      }
      span {
        color: #b9499b;
        font-size: 16px;
      }
      .icon {
        span {
          color: #444545;
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
  .info {
    h3 {
      font-size: 14px;
      line-height: 17px;
    }
    p {
      font-size: 11px;
      font-weight: 300;
      color: #9a9ea6;
      line-height: normal;
    }
  }
  span.coming {
    color: #fff !important;
    background: #8cc541;
    border-radius: 20px;
  }
  .consult-two {
    border-radius: 0.83333rem;
    border: 1px solid var(--light-stroke, #dfdfe0);
    background: var(--card-back-5, rgba(252, 167, 200, 0.05));
    &:last-child{
      margin-bottom: 0 !important;
    }
  }
}
</style>
