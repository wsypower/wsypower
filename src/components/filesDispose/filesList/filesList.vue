<template>
  <div class="filesList">
    <div class="header">
      <div class="title" flex="cross:center main:center"></div>
    </div>
    <div class="content" flex="main:center">
      <vue-seamless-scroll :data="listData" class="seamless-warp">
        <ul>
          <li v-for="item in listData" :key="item.id">
            <div class="statue" flex="main:center" v-if="item.dealstatus == 0">
              <span>未<br />处<br />理</span>
            </div>
            <div
              class="statue yichuli"
              flex="main:center"
              v-if="item.dealstatus == 1"
            >
              <span>已<br />处<br />理</span>
            </div>
            <div class="item-header" flex="cross:center main:justify">
              <div class="item-title" flex="cross:center">
                案卷{{ item.taskcode }}
              </div>
              <div class="item-timer" flex="cross:center">
                {{ $formatDate(parseInt(item.createtime)) }}
              </div>
            </div>
            <div class="item-content" flex="cross:center main:center">
              <div class="img-box" flex="cross:center main:center">
                <img :src="item.fileServer + item.url" alt="" />
              </div>
            </div>
            <div class="item-footer">
              <div class="fenlei">
                <span>分类:</span>
                <span>{{
                  `【${item.type1name}-${item.type2name}-${item.type3name}】`
                }}</span>
              </div>
              <div class="mishu">
                <span>描述:</span>
                <span>{{ item.eventdesc }}</span>
              </div>
            </div>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "filesList",
  data() {
    return {
      interval: '',
      //定时器时间
      timer: 600000,
      listData: [
        {
          id: '',
          dealstatus: '0',
          taskcode: '20180220AJGL案卷20180220案卷20180220案卷20180220',
          createtime: '07/20  12:30',
          src: '',
          img: '',
          type1name: '【市容环境】',
          type2name: '【市容环境',
          type3name: '【市容环境】',
          eventdesc: '小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类小类',
          fileServer: '',
          url: '',
        },
      ]
    }
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted() {
    this.cycleTime()
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
    optionCode: function () {
      this.cycleTime()
    }
  },
  methods: {
    cycleTime() {
      clearInterval(this.interval)
      this.acquire()
      this.interval = setInterval(() => {
        this.acquire()
      }, this.timer);
    },
    acquire() {
      this.axios.post('/bigscreen/eventDetails', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode,
        top: 10
      })).then(function (response) {
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          this.listData = response.data.result
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    }
  },
}
</script>

<style scoped lang="scss">
@import "filesList";
</style>
