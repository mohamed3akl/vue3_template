<template>
  <div id="PageContent" class="main">
    <v-container>
      <v-row>
        <v-col lg="3" id="WEB_MENU_CONTAINER">
          <user-menu />
        </v-col>
        <v-col lg="9">
          <patient-landing v-if="AuthedUser.user_type == 0"></patient-landing>
          <doctor-landing v-if="AuthedUser.user_type == 1"></doctor-landing>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PatientLanding from "@/components/Home/PatientLanding.vue";
import DoctorLanding from "@/components/Home/DoctorLanding.vue";

export default {
  name: "Home",
  components: { PatientLanding , DoctorLanding },
  mounted() {
    this.$store.commit("SET_LOADING", { name: "ui", value: false });

    // console.log(this.AuthedUser);
  },
  computed: {
    ...mapGetters(["AuthedUser"])
  }
};
</script>
