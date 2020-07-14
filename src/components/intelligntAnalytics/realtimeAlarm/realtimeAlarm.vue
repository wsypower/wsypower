<template>
  <div class="realtimeAlarm">
    <div class="realtimeAlarm_header"></div>
    <div class="realtimeAlarm_content">
      <div class="ul-panel scroll-height">
        <my-scroll>
          <ul>
            <li v-for="(item, index) in tableDataList" class="ul-body" :key="index">
              <span>
                <i>{{ item.streetName }}</i>
              </span>
              <span>{{ item.time }}</span>
              <span>{{ item.address }}</span>
              <span>{{ item.type }}</span>
              <span v-if="item.statusName == '未处理'" style="color:#ff5959">
                {{
                item.statusName
                }}
              </span>
              <span v-else>{{ item.statusName }}</span>
            </li>
          </ul>
        </my-scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "realtimeAlarm",
  data() {
    return {
      type: 4,
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      tableDataList: []
    };
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer;
  },
  mounted() {
    this.cycleTime();
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    }
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
          "/bigscreen/getRealTimeAlarmDataList?placecode=" +
            placecode +
            "&_t=" +
            new Date().getTime()
        )
        .then(
          function(response) {
            if (response.data.code !== "0") {
              console.log(response);
            } else {
              _this.tableDataList = response.data.result;
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
  @import "realtimeAlarm";
</style>
<style lang="scss">
.realtimeAlarm {
  .scroll-height {
    .happy-scroll-container {
      height: 200px !important;
    }
  }
}
</style>
