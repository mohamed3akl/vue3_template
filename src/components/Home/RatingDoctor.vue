<template>
  <div class="rating mt-4">
    <v-card elevation="0" class="heading">
      <v-card-title class="d-flex justify-space-between align-center py-3">
        <h5 class="text-black">
          {{ $vuetify.locale.t("$vuetify.patients_rating") }}
          <span
            class="mr-2"
            v-if="ratingDoctor"
          >({{ ratingDoctor.rating_statistics.total_rating_count }})</span>
        </h5>
        <span>{{ $vuetify.locale.t("$vuetify.show_all") }}</span>
      </v-card-title>
    </v-card>
    <v-container class="py-0">
      <v-row class="pa-4 py-0" style="box-shadow:none">
        <v-col cols="12" class="text-center py-0" style="transform: translateY(25%);">
          <v-card elevation="0" class="bg-transparent" v-if="ratingDoctor">
            <v-card-title class="green-text">{{ratingDoctor.rating_statistics.total_rating}}</v-card-title>
            <v-card-text>
              <div class="text-center wrapper">
                <v-rating
                  :model-value="ratingDoctor.rating_statistics.total_rating"
                  half-increments
                  color="#F1C639"
                  readonly
                  size="medium"
                  density="compact"
                  class="my-4 bigRating"
                ></v-rating>
                <pre style="color:#9A9EA6;font-size:14px">{{ $vuetify.locale.t("$vuetify.based_reviews") + " " + "50" +" "+$vuetify.locale.t("$vuetify.based_reviews_rating") }}</pre>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <ul v-if="ratingDoctor" class="mt-1">
            <li
              class="mb-4"
              v-for="(rate,i) in ratingDoctor.rating_statistics.rating_ratio"
              :key="rate.id"
            >
              <div class="d-flex justify-space-between mb-2">
                <div class="icon">
                  <v-icon color="#F1C639" style="font-size:16px">mdi-star</v-icon>
                  <span style="font-size: 14px;">{{ i }}</span>
                </div>
                <span style="color:#444545;">{{rate}}%</span>
              </div>
              <v-progress-linear :model-value="rate" height="11" rounded="lg" color="#E570B0"></v-progress-linear>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["ratingDoctor"]
};
</script>

<style lang="scss" scoped>
.rating {
  border: 1px solid var(--light-stroke, #dfdfe0);
  border-radius: 0.83333rem;
  .v-card-title {
    font-size: 34px;
  }

  .green-text {
    font-size: 2.22222rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .bigRating {
    transform: scale(1.3);
  }
  .v-progress-linear__determinate {
    border-radius: 6px;
  }
  .v-progress-linear__background {
    border-radius: 0.83333rem;
    background: #b8b8b8 !important;
  }
  .v-card.heading {
    border-radius: 0.83333rem 0.83333rem 0 0;
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
}
</style>
