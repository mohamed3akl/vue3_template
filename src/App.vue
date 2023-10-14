<template>
  <div :dir="this.$vuetify.locale.current == 'ar' ? 'rtl' : 'ltr'">
    <v-alert type="error" v-if="errorPublic">{{ errorPublic }}</v-alert>
    <v-alert type="error" v-if="!Array.isArray(getErrorsList)">
      <ul>
        <li v-for="(item, index) in getErrorsList" :key="index">{{ item }}</li>
      </ul>
    </v-alert>
    <v-alert type="success" v-if="successCreateAccount">{{
      successCreateAccount
    }}</v-alert>
    <!-- loader -->
    <div class="text-center ui-preloader" v-if="loadingUI">
      <v-progress-circular
        :size="90"
        :width="8"
        color="#5B286A"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-layout class="flex-column">
      <main-header v-if="includedRoutes" />
      <mobile-header v-if="includedRoutes" />

      <router-view />


      <main-footer v-if="includedRoutes" />
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainHeader from "./components/MainHeader.vue";
import MobileHeader from "./components/MobileHeader.vue";
import MainFooter from "./components/Footer.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
    MobileHeader,
  },
  data() {
    return {
      settings: "",
      includedRoutesNames: [
        "Home",
        "Profile",
        "Payment",
        //Doctor
        // "DoctorCompleteProfile",
        "OpeningTimes",
        "ProfileRatings",
        "PatientRecord",
        "PatientDetails",
        "HomeDoctor",
        //Patient
        // "PatientCompleteProfile",
        "Address",
        "AddAddress",
        "EditAddress",
        "Booking",
        "GeneticService",
        "GeneticServiceCalendar",
        "GeneticServiceQuestions",
        "GeneticServiceAddress",
        "GeneticServiceDoctor",
        "GeneticServiceSummary",
        "ShowProfile",
        "EditProfile",
        "EditProfilePassword",
        "MyGenaticReservations",
        "MyReservationChat",
        "MyReservationDetails",
        "MyGenaticExamination",
        "MyExaminationDetails",
        "PatientReceipt",
        "DoctorProfileForPatient",
        "MyRecommendation",
        "MyRecommendationDetails",
        "HelpCenter",
        "Notification",
        "NotificationSettings",
        "SuggestedPlaces",
        "Settings",
        "Rules",
        "Condition",
        "GlobalMedicalRecordsDetails",
        "CallsRecords",
        "GeneticServicePayment",
        "About",
      ],
      adminIncludedRoutesNames: [
        "AdminDashboard",
        "AdminFAQs",
        "AdminTypes",
        "AdminPlacesSample",
        "AdminSettings",
        "AdminTests",
        "AdminTestsDetails",
        "AdminBooking",
        "AdminBookingDetails",
        "AdminBookingDetailsFinished",
        "AdminDoctorsDetailsRequest",
        "AdminPatients",
        "AdminPatientsDetails",
        "AdminDoctors",
        "AdminDoctorsDetailsRequest",
        "AdminDoctorsDetailsAccept",
        "AdminChangePassword",
        "AdminPayments",
        "AdminViewExaminationDetails",
        "AdminViewPatientDetails",
        "AdminViewReservationChat",
        "AdminReservation",
        "AdminDoctorsDetails",
        "AdminShowProfile",
        "AdminEditProfile",
        "AdminEditProfilePassword",
        "MedicalRecords",
        "MedicalRecordsDetails",
        "AdminNotification",
        "AdminContactsList",
        "SystemUsers",
        "SystemUserDetails",
        "SystemUserCreate",
        "SystemUserUpdate",
      ],
    };
  },
  mounted() {
    if(this.AuthedUser.id){
      this.$store.dispatch("fetchUserProfile");
      
    }
    this.$http.get(`/settings`).then((res) => {
      this.settings = res.data.data;
      this.$store.commit("GET_ADMIN_SETTINGS",res.data.data);
    });
    
    this.$store.commit("SET_ERRORS", { name: "public", value: false });
    this.$store.commit("SET_ERRORS_LIST", []);
    this.$store.commit("SET_SUCCESS", { name: "createContact", value: false });

    
  },
  computed: {
    includedRoutes() {
      return this.includedRoutesNames.includes(this.$route.name);
    },
    adminIncludedRoutes() {
      return this.adminIncludedRoutesNames.includes(this.$route.name);
    },
    ...mapGetters([
      "loadingUI",
      "errorPublic",
      "successCreateAccount",
      "getErrorsList",
      "AuthedUser",
      "getAdminSettings",
    ]),
  },
  methods: {},
};
</script>
