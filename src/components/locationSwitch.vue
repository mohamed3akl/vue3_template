<template>
  <div class="lang_switch">
    <div class="icon me-2">
      <img src="@/assets/img/icons/location.png">
    </div>
    <div class="body">
      <label>    {{ $vuetify.locale.t('$vuetify.location') }}</label>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              variant="text"
              v-bind="props"
            >
              السعودية, الرياض
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="ms-2">
                <path d="M14.9333 7.81653H9.74164H5.06664C4.26664 7.81653 3.86664 8.78319 4.43331 9.34986L8.74997 13.6665C9.44164 14.3582 10.5666 14.3582 11.2583 13.6665L12.9 12.0249L15.575 9.34986C16.1333 8.78319 15.7333 7.81653 14.9333 7.81653Z" fill="#8C288C"/>
              </svg>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title> السعودية, الرياض</v-list-item-title>
              <v-list-item-title> السعودية, جدة</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
  export default {
    data () {
      return {
        
      }
    },
    mounted(){
      
    },
    methods:{
    
    },
    computed: {
      ...mapGetters([''])
    },
  }
</script>
<style lang="scss" scoped>

</style>
