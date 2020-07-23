<template>
  <div class="realtimeAlarm">
    <div class="realtimeAlarm_header"></div>
    <div class="realtimeAlarm_content">
      <div class="ul-panel scroll-height">
        <my-scroll>
          <ul>
            <li v-for="(item, index) in tableDataList" class="ul-body" :key="index">
              <span>
                <i>{{ item.street }}</i>
              </span>
              <span>{{ item.createtime.substring(11) }}</span>
              <span :title="item.address">{{ item.address }}</span>
              <span :title="item.subtype">{{ item.subtype }}</span>
              <span v-if="item.status == '未处理'" style="color:#ff5959">
                {{
                item.status
                }}
              </span>
              <span v-else>{{ item.status }}</span>
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
    },
    userId() {
      return this.$store.state.userId;
    }
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
      this.axios.post('/bigscreen/getList', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode,
        top: 1000
      })).then(function (response){
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          console.log('getList', response);
          _this.tableDataList = response.data.result;
        }
      }.bind(this))
        .catch(function (error){
          console.log(error)
        }.bind(this));
    }
  }
};
</script>

<style scoped lang="scss">
  @import "realtimeAlarm";
</style>
