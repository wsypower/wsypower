<template>
  <div class="panel">
    <div class="header"></div>
    <div class="card-item">
      <card-item
        v-for="(item, index) in sourceList"
        :data="item"
        class="item"
        :key="index"
      ></card-item>
    </div>
  </div>
</template>

<script>
import CardItem from "./item.vue";
export default {
  name: "quota",
  components: {
    CardItem
  },
  data() {
    return {
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      sourceList: []
    };
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer;
  },
  mounted() {
    this.cycleTime();
  },

  watch: {
    optionCode: function() {
      this.cycleTime();
    }
  },

  methods: {
    cycleTime() {
      clearInterval(this.interval);
      this.acquire();
      this.interval = setInterval(() => {
        this.acquire();
      }, this.timer);
    },
    acquire() {
      let _this = this;
      this.axios
        .get(
          "/bigscreen/getIndicators?placecode="
          + this.optionCode
          + "&userId=" + this.userId
          + "&_t=" + new Date().getTime()
        )
        .then(
          function(response) {
            if (response.data.code !== 0) {
              console.log(response);
            } else {
              console.log('getIndicators',response);
              this.sourceList = [
                { title: "当月告警", num: response.data.result[0].monthAlarmCount },
                { title: "当日告警", num: response.data.result[0].dayAlarmCount },
                { title: "当月上报", num: response.data.result[0].monthQXCount },
                { title: "当日上报", num: response.data.result[0].dayQXCount }
              ];
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped lang="scss">
  @import "quota";
</style>
