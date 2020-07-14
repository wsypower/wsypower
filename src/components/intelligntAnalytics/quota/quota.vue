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
    }
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer;
  },
  mounted() {
    this.cycleTime(this.optionCode);
  },

  watch: {
    optionCode: function(val) {
      this.cycleTime(val);
    }
  },

  methods: {
    cycleTime(placecode) {
      clearInterval(this.interval);
      this.acquire(placecode);
      this.interval = setInterval(() => {
        // console.log('执行一次')
        this.acquire(placecode);
      }, this.timer);
    },
    acquire(placecode) {
      let _this = this;
      this.axios
        .get(
          "/bigscreen/getQuotaDataList?placecode=" +
            placecode +
            "&_t=" +
            new Date().getTime()
        )
        .then(
          function(response) {
            if (response.data.code !== "0") {
              console.log(response);
            } else {
              console.log(response);
              this.sourceList = [
                { title: "当月告警", num: response.data.result.warnMonthNum },
                { title: "当日告警", num: response.data.result.warnDayNum },
                { title: "当月上报", num: response.data.result.reportMonthNum },
                { title: "当日上报", num: response.data.result.reportDayNum }
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
