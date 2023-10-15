<template>
  <div id="PageContent" class="main">
    <v-container>
      <v-row>
        <v-col lg="3" id="WEB_MENU_CONTAINER">
          <user-menu />
        </v-col>
        <v-col lg="9">
          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {  },
  mounted() {
    this.$store.commit("SET_LOADING", { name: "ui", value: false });

    // console.log(this.AuthedUser);
  },
  computed: {
    ...mapGetters(["AuthedUser"])
  }
};
</script>
